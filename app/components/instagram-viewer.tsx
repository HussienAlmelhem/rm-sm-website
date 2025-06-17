"use client"

import { useState, useRef, useEffect } from "react"
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface InstagramViewerProps {
  isOpen: boolean
  onClose: () => void
  post: any
  allPosts: any[]
  themeClasses: any
}

export default function InstagramViewer({ isOpen, onClose, post, allPosts, themeClasses }: InstagramViewerProps) {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sample comments data
  const [comments] = useState([
    {
      id: 1,
      username: "sarah_marketing",
      text: "This is amazing! 🔥",
      time: "2h",
      likes: 12,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      username: "digital_creator",
      text: "Love the editing style! What software do you use?",
      time: "1h",
      likes: 8,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      username: "content_king",
      text: "Incredible content as always 👏",
      time: "45m",
      likes: 15,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  useEffect(() => {
    if (post && allPosts.length > 0) {
      const index = allPosts.findIndex((p) => p.id === post.id)
      setCurrentPostIndex(index >= 0 ? index : 0)
    }
  }, [post, allPosts])

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play()
    } else if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [isPlaying, currentPostIndex])

  const currentPost = allPosts[currentPostIndex]

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const goToPrevious = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1)
      setIsPlaying(true)
    }
  }

  const goToNext = () => {
    if (currentPostIndex < allPosts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1)
      setIsPlaying(true)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Here you would typically add the comment to your state/database
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  if (!currentPost) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black border-0 overflow-hidden">
        <div className="flex h-[95vh]">
          {/* Left Side - Video */}
          <div className="flex-1 relative bg-black flex items-center justify-center">
            {/* Navigation Arrows */}
            {currentPostIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}

            {currentPostIndex < allPosts.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            )}

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Video Player */}
            <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: "9/16" }}>
              {currentPost.videoPreview ? (
                <video
                  ref={videoRef}
                  src={currentPost.videoPreview}
                  className="w-full h-full object-cover rounded-lg"
                  loop
                  muted={isMuted}
                  autoPlay={isPlaying}
                  onClick={togglePlayPause}
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                  <Play className="w-16 h-16 text-gray-400" />
                </div>
              )}

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlayPause}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
              </div>

              {/* Mute Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              {/* Post Counter */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                {currentPostIndex + 1} / {allPosts.length}
              </div>
            </div>
          </div>

          {/* Right Side - Instagram UI */}
          <div className="w-96 bg-white border-l flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  Z
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">zaidnhussien</p>
                  <p className="text-xs text-gray-500">{new Date(currentPost.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </div>

            {/* Actions */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" onClick={handleLike} className="p-0">
                    <Heart className={`w-6 h-6 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-700"}`} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="p-0">
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-0">
                    <Send className="w-6 h-6 text-gray-700" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSave} className="p-0">
                  <Bookmark className={`w-6 h-6 ${isSaved ? "text-gray-900 fill-gray-900" : "text-gray-700"}`} />
                </Button>
              </div>

              <p className="font-semibold text-sm text-gray-900 mb-1">
                {(currentPost.likes + (isLiked ? 1 : 0)).toLocaleString()} likes
              </p>

              {/* Caption */}
              <div className="text-sm text-gray-900 mb-2">
                <span className="font-semibold">zaidnhussien</span> <span>{currentPost.content}</span>
              </div>

              {/* Hashtags */}
              {currentPost.hashtags && currentPost.hashtags.length > 0 && (
                <div className="text-sm text-blue-600 mb-2">
                  {currentPost.hashtags.map((tag: string) => (
                    <span key={tag} className="mr-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {new Date(currentPost.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Comments Section */}
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <img
                        src={comment.avatar || "/placeholder.svg?height=32&width=32"}
                        alt={comment.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-900">{comment.username}</span>{" "}
                          <span className="text-gray-900">{comment.text}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>{comment.time}</span>
                          <span>{comment.likes} likes</span>
                          <button className="font-semibold">Reply</button>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0">
                        <Heart className="w-3 h-3 text-gray-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Add Comment */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    Z
                  </div>
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                    className="flex-1 border-0 focus-visible:ring-0 text-sm"
                  />
                  {newComment.trim() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAddComment}
                      className="text-blue-500 font-semibold"
                    >
                      Post
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
