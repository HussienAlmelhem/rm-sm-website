"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Palette, Monitor, Sun, Moon, Eye, User, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Theme, CustomColors } from "../hooks/useTheme"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  theme: string
  setTheme: (theme: Theme) => void
  customColors: CustomColors
  setCustomColors: (colors: CustomColors) => void
  highContrast: boolean
  setHighContrast: (enabled: boolean) => void
  themeClasses: any
}

const colorPresets = [
  { name: "Default", colors: { facebook: "#1877F2", twitter: "#1DA1F2", instagram: "#E4405F", youtube: "#FF0000" } },
  { name: "Vibrant", colors: { facebook: "#4267B2", twitter: "#00ACEE", instagram: "#C13584", youtube: "#FF6B6B" } },
  { name: "Pastel", colors: { facebook: "#87CEEB", twitter: "#98D8E8", instagram: "#F7B2BD", youtube: "#FFB3BA" } },
  { name: "Neon", colors: { facebook: "#00FFFF", twitter: "#00FF00", instagram: "#FF00FF", youtube: "#FFFF00" } },
]

export default function SettingsPanel({
  isOpen,
  onClose,
  theme,
  setTheme,
  customColors,
  setCustomColors,
  highContrast,
  setHighContrast,
  themeClasses,
}: SettingsPanelProps) {
  const [profileData, setProfileData] = useState({
    name: "Zaid N Hussein",
    username: "zaidnhussien",
    email: "zaid@example.com",
    bio: "Digital Marketing Expert | Content Creator | 15+ Years Experience",
    website: "https://zaidnhussien.com",
    location: "Dubai, UAE",
    avatar: "/placeholder.svg?height=100&width=100",
    coverImage: "/placeholder.svg?height=200&width=600",
  })

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const handleColorChange = (platform: keyof CustomColors, color: string) => {
    setCustomColors({
      ...customColors,
      [platform]: color,
    })
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData({ ...profileData, avatar: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData({ ...profileData, coverImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className={`w-full sm:w-[500px] ${themeClasses.background} border-l`}>
        <SheetHeader>
          <SheetTitle className={themeClasses.text.primary}>Settings</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            {/* Profile Header */}
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription className={themeClasses.text.secondary}>
                  Manage your profile details and images
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Image */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Cover Image</Label>
                  <div className="relative">
                    <div
                      className="w-full h-32 bg-cover bg-center rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                      style={{ backgroundImage: `url(${profileData.coverImage})` }}
                      onClick={() => coverInputRef.current?.click()}
                    >
                      {!profileData.coverImage.includes("placeholder") ? (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">Upload cover image</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Avatar */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Profile Picture</Label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={profileData.avatar || "/placeholder.svg"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <Button
                        size="sm"
                        onClick={() => avatarInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" onClick={() => avatarInputRef.current?.click()} className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Change Avatar
                      </Button>
                    </div>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <Separator />

                {/* Profile Fields */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleProfileUpdate("name", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => handleProfileUpdate("username", e.target.value)}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleProfileUpdate("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleProfileUpdate("location", e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Save Profile Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Settings */}
          <TabsContent value="theme" className="space-y-6 mt-6">
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Monitor className="w-5 h-5" />
                  Theme
                </CardTitle>
                <CardDescription className={themeClasses.text.secondary}>Choose your preferred theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="flex items-center gap-2"
                  >
                    <Monitor className="w-4 h-4" />
                    Auto
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5" />
                  Accessibility
                </CardTitle>
                <CardDescription className={themeClasses.text.secondary}>
                  Enhance readability and contrast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="text-sm font-medium">
                    High Contrast Mode
                  </Label>
                  <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Color Settings */}
          <TabsContent value="colors" className="space-y-6 mt-6">
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="w-5 h-5" />
                  Platform Colors
                </CardTitle>
                <CardDescription className={themeClasses.text.secondary}>
                  Customize platform accent colors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Color Presets */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Presets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomColors(preset.colors)}
                        className="justify-start"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {Object.values(preset.colors).map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-xs">{preset.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Individual Color Pickers */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Custom Colors</Label>
                  {Object.entries(customColors).map(([platform, color]) => (
                    <div key={platform} className="flex items-center justify-between">
                      <Label className="text-sm capitalize">{platform}</Label>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border" style={{ backgroundColor: color }} />
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => handleColorChange(platform as keyof CustomColors, e.target.value)}
                          className="w-8 h-8 rounded border-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={() => {
                setTheme("system")
                setCustomColors({
                  facebook: "#1877F2",
                  twitter: "#1DA1F2",
                  instagram: "#E4405F",
                  youtube: "#FF0000",
                })
                setHighContrast(false)
              }}
              className="w-full"
            >
              Reset to Defaults
            </Button>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
