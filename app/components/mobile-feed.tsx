"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Volume2, VolumeX, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MobileFeedProps {
  posts: any[]
  themeClasses: any
  onBack: () => void
}

export default function MobileFeed({ posts, themeClasses, onBack }: MobileFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [videoStates, setVideoStates] = useState<{ [key: number]: { isPlaying: boolean; isMuted: boolean } }>({})
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({})
  const [saves, setSaves] = useState<{ [key: number]: boolean }>({})
  const [comments, setComments] = useState<{ [key: number]: string }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})

  const publishedPosts = posts.filter((post) => post.status === "published")

  useEffect(() => {
    // Initialize video states
    const initialStates: { [key: number]: { isPlaying: boolean; isMuted: boolean } } = {}
    publishedPosts.forEach((_, index) => {
      initialStates[index] = { isPlaying: index === 0, isMuted: false }
    })
    setVideoStates(initialStates)
  }, [publishedPosts])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const scrollTop = container.scrollTop
      const itemHeight = container.clientHeight
      const newIndex = Math.round(scrollTop / itemHeight)

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < publishedPosts.length) {
        setCurrentIndex(newIndex)

        // Pause all videos except the current one
        Object.keys(videoRefs.current).forEach((key) => {
          const index = Number.parseInt(key)
          const video = videoRefs.current[index]
          if (video) {
            if (index === newIndex) {
              video.play()
              setVideoStates((prev) => ({
                ...prev,
                [index]: { ...prev[index], isPlaying: true },
              }))
            } else {
              video.pause()
              setVideoStates((prev) => ({
                ...prev,
                [index]: { ...prev[index], isPlaying: false },
              }))
            }
          }
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [currentIndex, publishedPosts.length])

  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    const currentState = videoStates[index]
    const newIsPlaying = !currentState?.isPlaying

    if (newIsPlaying) {
      video.play()
    } else {
      video.pause()
    }

    setVideoStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isPlaying: newIsPlaying },
    }))
  }

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    const currentState = videoStates[index]
    const newIsMuted = !currentState?.isMuted

    video.muted = newIsMuted

    setVideoStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isMuted: newIsMuted },
    }))
  }

  const toggleLike = (index: number) => {
    setLikes((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const toggleSave = (index: number) => {
    setSaves((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const handleComment = (index: number) => {
    const comment = comments[index]
    if (comment?.trim()) {
      console.log(`Comment on post ${index}:`, comment)
      setComments((prev) => ({ ...prev, [index]: "" }))
    }
  }

  if (publishedPosts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-lg mb-4">No published videos yet</p>
          <Button onClick={onBack} variant="outline" className="text-white border-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white bg-black/30 hover:bg-black/50 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-white font-semibold text-lg">Reels</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Scrollable Feed */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollBehavior: "smooth",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {publishedPosts.map((post, index) => (
          <div key={post.id} className="relative h-screen w-full snap-start flex items-center justify-center">
            {/* Video */}
            <div className="relative w-full max-w-md mx-auto h-full">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={post.videoPreview}
                className="w-full h-full object-cover"
                loop
                muted={videoStates[index]?.isMuted}
                playsInline
                onClick={() => togglePlayPause(index)}
              />

              {/* Play/Pause Overlay */}
              {!videoStates[index]?.isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => togglePlayPause(index)}
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full"
                  >
                    <Play className="w-12 h-12" />
                  </Button>
                </div>
              )}

              {/* Right Side Actions */}
              <div className="absolute right-3 bottom-24 flex flex-col space-y-4">
                {/* Profile */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
                    Z
                  </div>
                </div>

                {/* Like */}
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(index)}
                    className="text-white hover:bg-black/20 p-2 rounded-full bg-black/10 backdrop-blur-sm"
                  >
                    <Heart className={`w-7 h-7 ${likes[index] ? "text-red-500 fill-red-500" : "text-white"}`} />
                  </Button>
                  <span className="text-white text-xs mt-1 font-medium">
                    {(post.likes + (likes[index] ? 1 : 0)).toLocaleString()}
                  </span>
                </div>

                {/* Comment */}
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-black/20 p-2 rounded-full bg-black/10 backdrop-blur-sm"
                  >
                    <MessageCircle className="w-7 h-7" />
                  </Button>
                  <span className="text-white text-xs mt-1 font-medium">{post.comments}</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-black/20 p-2 rounded-full bg-black/10 backdrop-blur-sm"
                  >
                    <Send className="w-7 h-7" />
                  </Button>
                  <span className="text-white text-xs mt-1 font-medium">{post.shares}</span>
                </div>

                {/* Save */}
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSave(index)}
                    className="text-white hover:bg-black/20 p-2 rounded-full bg-black/10 backdrop-blur-sm"
                  >
                    <Bookmark className={`w-7 h-7 ${saves[index] ? "fill-white" : ""}`} />
                  </Button>
                </div>

                {/* More */}
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-black/20 p-2 rounded-full bg-black/10 backdrop-blur-sm"
                  >
                    <MoreHorizontal className="w-7 h-7" />
                  </Button>
                </div>

                {/* Volume */}
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleMute(index)}
                    className="text-white hover:bg-black/20 p-2 rounded-full bg-black/10 backdrop-blur-sm"
                  >
                    {videoStates[index]?.isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </Button>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-20 text-white">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    Z
                  </div>
                  <span className="font-semibold">zaidnhussien</span>
                  <Button variant="outline" size="sm" className="text-xs h-6 px-3 text-white border-white">
                    Follow
                  </Button>
                </div>

                {/* Caption */}
                <div className="mb-2">
                  <p className="text-sm leading-relaxed">
                    {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
                  </p>
                </div>

                {/* Hashtags */}
                {post.hashtags && post.hashtags.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-blue-300">
                      {post.hashtags.slice(0, 3).map((tag: string) => `#${tag} `)}
                      {post.hashtags.length > 3 && "..."}
                    </p>
                  </div>
                )}

                {/* Music */}
                {post.musicTrack && (
                  <div className="flex items-center mb-3">
                    <span className="text-xs">🎵 {post.musicTrack}</span>
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    placeholder="Add a comment..."
                    value={comments[index] || ""}
                    onChange={(e) => setComments((prev) => ({ ...prev, [index]: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && handleComment(index)}
                    className="flex-1 bg-transparent border-0 text-white placeholder-gray-400 focus-visible:ring-0 text-sm"
                  />
                  {comments[index]?.trim() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleComment(index)}
                      className="text-blue-400 font-semibold p-0"
                    >
                      Post
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute top-20 right-4 flex flex-col space-y-1">
                {publishedPosts.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-6 rounded-full ${
                      i === index ? "bg-white" : "bg-white/30"
                    } transition-all duration-300`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
