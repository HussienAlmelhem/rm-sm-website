"use client"

import { Home, BarChart3, FileText, Calendar, Users, MessageSquare, Settings, Hash, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  setActiveSection: (section: string) => void
  onOpenFeed: () => void
  themeClasses: any
  theme: string
}

export default function MobileSidebar({
  isOpen,
  onClose,
  activeSection,
  setActiveSection,
  onOpenFeed,
  themeClasses,
  theme,
}: MobileSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "content", label: "Content", icon: FileText },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "audience", label: "Audience", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleMenuClick = (itemId: string) => {
    setActiveSection(itemId)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className={`w-80 p-0 ${theme === "dark" ? "bg-slate-900/95 border-slate-800" : "bg-white/95 border-gray-200"} backdrop-blur-lg`}
      >
        <div className="p-6" style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)" }}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl">SocialHub</span>
              <p className="text-xs text-muted-foreground">Social Media Dashboard</p>
            </div>
          </div>

          {/* Reels Feed Button */}
          <Button
            onClick={() => {
              onOpenFeed()
              onClose()
            }}
            className="w-full mb-6 h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg rounded-xl font-medium"
          >
            <Play className="w-5 h-5 mr-3" />
            Watch Reels
          </Button>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start h-12 rounded-xl font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/15 to-purple-600/15 text-blue-500 border border-blue-500/20"
                      : "hover:bg-gray-100/50"
                  }`}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
              Z
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Zaid N Hussein</p>
              <p className={`text-xs ${themeClasses.text.secondary} truncate`}>zaid@example.com</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
