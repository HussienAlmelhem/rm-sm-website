"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  X,
  ImageIcon,
  Video,
  MapPin,
  Smile,
  Hash,
  AtSign,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  themeClasses: any
}

export default function CreatePostModal({ isOpen, onClose, themeClasses }: CreatePostModalProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const [postContent, setPostContent] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [newHashtag, setNewHashtag] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<File[]>([])
  const [mediaPreview, setMediaPreview] = useState<string[]>([])
  const [schedulePost, setSchedulePost] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [location, setLocation] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const platforms = [
    { id: "instagram", name: "Instagram", color: "#E4405F", icon: "📷" },
    { id: "twitter", name: "Twitter", color: "#1DA1F2", icon: "🐦" },
    { id: "linkedin", name: "LinkedIn", color: "#0077B5", icon: "💼" },
    { id: "youtube", name: "YouTube", color: "#FF0000", icon: "📺" },
  ]

  const suggestedHashtags = [
    "#socialmedia",
    "#marketing",
    "#digitalmarketing",
    "#content",
    "#branding",
    "#business",
    "#entrepreneur",
    "#success",
    "#motivation",
    "#growth",
  ]

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedMedia([...selectedMedia, ...files])

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setMediaPreview([...mediaPreview, ...newPreviews])
  }

  const removeMedia = (index: number) => {
    const newMedia = selectedMedia.filter((_, i) => i !== index)
    const newPreviews = mediaPreview.filter((_, i) => i !== index)
    setSelectedMedia(newMedia)
    setMediaPreview(newPreviews)
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
    // Here you would implement the actual publishing logic
    console.log("Publishing post:", {
      platforms: selectedPlatforms,
      content: postContent,
      hashtags,
      media: selectedMedia,
      schedule: schedulePost ? { date: scheduleDate, time: scheduleTime } : null,
      location,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-6xl max-h-[90vh] overflow-hidden ${themeClasses.background}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${themeClasses.text.primary}`}>Create New Post</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(90vh-120px)]">
          {/* Left Side - Post Creation */}
          <div className="space-y-6 overflow-y-auto pr-4">
            {/* Platform Selection */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Select Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
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

            {/* Media Upload */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Photo
                    </Button>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                      <Video className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="hidden"
                  />

                  {mediaPreview.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {mediaPreview.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeMedia(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Post Content */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Caption</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <AtSign className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className={`text-sm ${themeClasses.text.secondary}`}>{postContent.length}/2200</span>
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
                    <Label className="text-sm font-medium">Suggested:</Label>
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

            {/* Additional Options */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="text-lg">Additional Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <Input placeholder="Add location..." value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="schedule-post">Schedule Post</Label>
                  <Switch id="schedule-post" checked={schedulePost} onCheckedChange={setSchedulePost} />
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

          {/* Right Side - Instagram Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Instagram Preview</h3>
            <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto">
              {/* Instagram Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    Z
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">zaidnhussien</p>
                    {location && <p className="text-xs text-gray-500">{location}</p>}
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </div>

              {/* Instagram Media */}
              {mediaPreview.length > 0 && (
                <div className="aspect-square bg-gray-100">
                  <img
                    src={mediaPreview[0] || "/placeholder.svg"}
                    alt="Post preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Instagram Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-4">
                    <Heart className="w-6 h-6 text-gray-700" />
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Send className="w-6 h-6 text-gray-700" />
                  </div>
                  <Bookmark className="w-6 h-6 text-gray-700" />
                </div>

                <p className="font-semibold text-sm text-gray-900 mb-1">1,234 likes</p>

                {/* Instagram Caption */}
                <div className="text-sm text-gray-900">
                  <span className="font-semibold">zaidnhussien</span>{" "}
                  {postContent && (
                    <span>
                      {postContent}{" "}
                      {hashtags.map((tag) => (
                        <span key={tag} className="text-blue-600">
                          #{tag}{" "}
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
              </div>
            </div>
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {schedulePost ? "Schedule Post" : "Publish Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
