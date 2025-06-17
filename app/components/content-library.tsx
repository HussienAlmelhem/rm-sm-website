"use client"

import { useState } from "react"
import { Play, Heart, MessageCircle, Eye, Search, Grid3X3, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InstagramViewer from "./instagram-viewer"

interface ContentLibraryProps {
  posts: any[]
  themeClasses: any
  onCreateReel: () => void
}

export default function ContentLibrary({ posts, themeClasses, onCreateReel }: ContentLibraryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showInstagramViewer, setShowInstagramViewer] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.hashtags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filterStatus === "all" || post.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "scheduled":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "draft":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const handlePostClick = (post: any) => {
    setSelectedPost(post)
    setShowInstagramViewer(true)
  }

  const ReelCard = ({ post, isGrid = true }: { post: any; isGrid?: boolean }) => (
    <Card
      className={`${themeClasses.card} overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer`}
      onClick={() => handlePostClick(post)}
    >
      <div className="relative">
        {/* Reel Preview */}
        <div className={`relative bg-black ${isGrid ? "aspect-[9/16]" : "w-32 h-48"} overflow-hidden`}>
          {post.videoPreview ? (
            <div className="relative w-full h-full group">
              <video
                src={post.videoPreview}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <Play className="w-12 h-12 text-white" />
              </div>

              {/* Status Badge */}
              <Badge className={`absolute top-2 left-2 ${getStatusColor(post.status)}`}>{post.status}</Badge>

              {/* Engagement Stats Overlay */}
              <div className="absolute bottom-2 right-2 flex flex-col space-y-1 text-white text-xs">
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{post.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{post.views}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content Info */}
        {isGrid ? (
          <CardContent className="p-3">
            <div className="space-y-2">
              <p className="text-sm line-clamp-2">{post.content}</p>
              <div className="flex flex-wrap gap-1">
                {post.hashtags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {post.hashtags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.hashtags.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatDate(post.createdAt)}</span>
                <div className="flex items-center space-x-2">
                  {post.platforms.map((platform: string) => (
                    <span key={platform} className="capitalize">
                      {platform === "instagram" && "📱"}
                      {platform === "tiktok" && "🎵"}
                      {platform === "youtube" && "📺"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        ) : (
          <div className="flex-1 p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium line-clamp-1">{post.content.slice(0, 50)}...</h3>
                <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {post.hashtags.slice(0, 5).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatDate(post.createdAt)}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Library</h2>
          <p className={`text-sm ${themeClasses.text.secondary} mt-1`}>
            Manage your reels and content across all platforms
          </p>
        </div>
        <Button
          onClick={onCreateReel}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Reel
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Content ({posts.length})</TabsTrigger>
          <TabsTrigger value="published">
            Published ({posts.filter((p) => p.status === "published").length})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled ({posts.filter((p) => p.status === "scheduled").length})
          </TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({posts.filter((p) => p.status === "draft").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredPosts.length === 0 ? (
            <Card className={`${themeClasses.card} p-12 text-center`}>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No content yet</h3>
                  <p className={`text-sm ${themeClasses.text.secondary} mb-4`}>
                    Create your first reel to get started with content management
                  </p>
                  <Button
                    onClick={onCreateReel}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Reel
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                  : "space-y-4"
              }
            >
              {filteredPosts.map((post) => (
                <div key={post.id} className={viewMode === "list" ? "flex space-x-4" : ""}>
                  <ReelCard post={post} isGrid={viewMode === "grid"} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="published" className="mt-6">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-4"
            }
          >
            {filteredPosts
              .filter((post) => post.status === "published")
              .map((post) => (
                <div key={post.id} className={viewMode === "list" ? "flex space-x-4" : ""}>
                  <ReelCard post={post} isGrid={viewMode === "grid"} />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-4"
            }
          >
            {filteredPosts
              .filter((post) => post.status === "scheduled")
              .map((post) => (
                <div key={post.id} className={viewMode === "list" ? "flex space-x-4" : ""}>
                  <ReelCard post={post} isGrid={viewMode === "grid"} />
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-4"
            }
          >
            {filteredPosts
              .filter((post) => post.status === "draft")
              .map((post) => (
                <div key={post.id} className={viewMode === "list" ? "flex space-x-4" : ""}>
                  <ReelCard post={post} isGrid={viewMode === "grid"} />
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Instagram Viewer Modal */}
      <InstagramViewer
        isOpen={showInstagramViewer}
        onClose={() => setShowInstagramViewer(false)}
        post={selectedPost}
        allPosts={filteredPosts}
        themeClasses={themeClasses}
      />
    </div>
  )
}
