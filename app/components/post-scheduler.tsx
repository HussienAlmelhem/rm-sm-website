"use client"

import { Calendar, Clock, ImageIcon, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function PostScheduler() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Post</CardTitle>
          <CardDescription>Create and schedule your social media content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" placeholder="What's on your mind?" className="min-h-[100px]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Image
            </Button>
            <Button variant="outline" size="sm">
              <Video className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </div>

          <Button className="w-full">Schedule Post</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
          <CardDescription>Upcoming scheduled content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                content: "Excited to share our new product launch! 🚀",
                platform: "Instagram",
                date: "Dec 20, 2024",
                time: "2:00 PM",
              },
              {
                content: "Behind the scenes of our creative process...",
                platform: "Twitter",
                date: "Dec 21, 2024",
                time: "10:00 AM",
              },
              {
                content: "Industry insights and trends for 2025",
                platform: "LinkedIn",
                date: "Dec 22, 2024",
                time: "9:00 AM",
              },
            ].map((post, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <p className="text-sm">{post.content}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{post.platform}</Badge>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <Clock className="w-3 h-3" />
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
