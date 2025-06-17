"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  X,
  Video,
  Music,
  Hash,
  AtSign,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Filter,
  Type,
  Sticker,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface CreateReelModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateReel: (reelData: any) => void
  themeClasses: any
}

export default function CreateReelModal({ isOpen, onClose, onCreateReel, themeClasses }: CreateReelModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const [reelContent, setReelContent] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [newHashtag, setNewHashtag] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string>("")
  const [schedulePost, setSchedulePost] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [musicTrack, setMusicTrack] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([80])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const platforms = [
    { id: "instagram", name: "Instagram Reels", color: "#E4405F", icon: "📱" },
    { id: "tiktok", name: "TikTok", color: "#000000", icon: "🎵" },
    { id: "youtube", name: "YouTube Shorts", color: "#FF0000", icon: "📺" },
    { id: "facebook", name: "Facebook Reels", color: "#1877F2", icon: "👥" },
  ]

  const suggestedHashtags = [
    "#reels",
    "#viral",
    "#trending",
    "#fyp",
    "#explore",
    "#instagram",
    "#content",
    "#creator",
    "#video",
    "#entertainment",
  ]

  const musicTracks = [
    "Original Audio",
    "Trending Song 1",
    "Trending Song 2",
    "Upbeat Music",
    "Chill Vibes",
    "Electronic Beat",
  ]

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedVideo(file)
      const previewUrl = URL.createObjectURL(file)
      setVideoPreview(previewUrl)
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const addHashtag = (tag: string) => {
    if (tag && !hashtags.includes(tag)) {
      setHashtags([...hashtags, tag])
      setNewHashtag("")
    }
  }

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((h) => h !== tag))
  }

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platformId))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId])
    }
  }

  const handlePublish = () => {
    const reelData = {
      platforms: selectedPlatforms,
      content: reelContent,
      hashtags,
      video: selectedVideo,
      videoPreview,
      musicTrack,
      schedulePost,
      scheduleDate: schedulePost ? scheduleDate : null,
      scheduleTime: schedulePost ? scheduleTime : null,
    }

    onCreateReel(reelData)
    onClose()

    // Reset form
    setSelectedPlatforms(["instagram"])
    setReelContent("")
    setHashtags([])
    setSelectedVideo(null)
    setVideoPreview("")
    setSchedulePost(false)
    setScheduleDate("")
    setScheduleTime("")
    setMusicTrack("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-7xl max-h-[95vh] overflow-hidden ${themeClasses.background}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${themeClasses.text.primary}`}>Create New Reel</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(95vh-120px)]">
          {/* Left Side - Video Upload & Editing */}
          <div className="space-y-6 overflow-y-auto pr-4">
            {/* Video Upload */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Upload Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-dashed border-2 flex flex-col items-center justify-center"
                  >
                    <Video className="w-8 h-8 mb-2" />
                    <span>Upload Reel Video</span>
                    <span className="text-xs text-muted-foreground">9:16 aspect ratio recommended</span>
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />

                  {selectedVideo && (
                    <div className="text-sm text-green-500">✓ Video uploaded: {selectedVideo.name}</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Music & Audio */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Audio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Music Track</Label>
                  <select
                    value={musicTrack}
                    onChange={(e) => setMusicTrack(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="">Select music...</option>
                    {musicTracks.map((track) => (
                      <option key={track} value={track}>
                        {track}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Volume</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="ghost" size="sm" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                    <span className="text-sm w-8">{volume[0]}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Select Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {platforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                      onClick={() => togglePlatform(platform.id)}
                      className="justify-start"
                      style={{
                        backgroundColor: selectedPlatforms.includes(platform.id)
                          ? `${platform.color}20`
                          : "transparent",
                        borderColor: selectedPlatforms.includes(platform.id) ? platform.color : undefined,
                      }}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle - Reel Preview */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Reel Preview</h3>

            {/* Instagram Reel Preview */}
            <div className="relative bg-black rounded-2xl overflow-hidden" style={{ width: "280px", height: "500px" }}>
              {videoPreview ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={videoPreview}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={togglePlayPause}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </Button>
                  </div>

                  {/* Instagram UI Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
                    <div className="text-sm font-medium">Reels</div>
                    <div className="text-sm">📷</div>
                  </div>

                  {/* Right Side Actions */}
                  <div className="absolute right-4 bottom-20 flex flex-col space-y-6 text-white">
                    <div className="flex flex-col items-center">
                      <Heart className="w-7 h-7 mb-1" />
                      <span className="text-xs">1.2K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-7 h-7 mb-1" />
                      <span className="text-xs">89</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Send className="w-7 h-7 mb-1" />
                      <span className="text-xs">Share</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Bookmark className="w-7 h-7 mb-1" />
                    </div>
                    <div className="flex flex-col items-center">
                      <MoreHorizontal className="w-7 h-7 mb-1" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-4 left-4 right-16 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        Z
                      </div>
                      <span className="font-semibold text-sm">zaidnhussien</span>
                      <Button variant="outline" size="sm" className="text-xs h-6 px-2 text-white border-white">
                        Follow
                      </Button>
                    </div>

                    {reelContent && (
                      <div className="text-sm mb-2">
                        {reelContent.slice(0, 100)}
                        {reelContent.length > 100 && "..."}
                      </div>
                    )}

                    {hashtags.length > 0 && (
                      <div className="text-sm text-blue-300">
                        {hashtags.slice(0, 3).map((tag) => `#${tag} `)}
                        {hashtags.length > 3 && "..."}
                      </div>
                    )}

                    {musicTrack && (
                      <div className="flex items-center mt-2 text-xs">
                        <Music className="w-3 h-3 mr-1" />
                        <span>{musicTrack}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Upload a video to see preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Editing Tools */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Type className="w-4 h-4 mr-1" />
                Text
              </Button>
              <Button variant="outline" size="sm">
                <Sticker className="w-4 h-4 mr-1" />
                Stickers
              </Button>
              <Button variant="outline" size="sm">
                <Sparkles className="w-4 h-4 mr-1" />
                Effects
              </Button>
            </div>
          </div>

          {/* Right Side - Content & Settings */}
          <div className="space-y-6 overflow-y-auto pr-4">
            {/* Caption */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Caption</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write a caption for your reel..."
                  value={reelContent}
                  onChange={(e) => setReelContent(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <AtSign className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className={`text-sm ${themeClasses.text.secondary}`}>{reelContent.length}/2200</span>
                </div>
              </CardContent>
            </Card>

            {/* Hashtags */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add hashtag..."
                      value={newHashtag}
                      onChange={(e) => setNewHashtag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addHashtag(newHashtag)}
                    />
                    <Button onClick={() => addHashtag(newHashtag)}>
                      <Hash className="w-4 h-4" />
                    </Button>
                  </div>

                  {hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer">
                          #{tag}
                          <X className="w-3 h-3 ml-1" onClick={() => removeHashtag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium">Trending:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {suggestedHashtags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-500/10"
                          onClick={() => addHashtag(tag.replace("#", ""))}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Publishing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="schedule-reel">Schedule Reel</Label>
                  <Switch id="schedule-reel" checked={schedulePost} onCheckedChange={setSchedulePost} />
                </div>

                {schedulePost && (
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                    <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">Save Draft</Button>
            <Button
              onClick={handlePublish}
              disabled={!selectedVideo}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {schedulePost ? "Schedule Reel" : "Publish Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
