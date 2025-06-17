"use client"

import { Home, BarChart3, Plus, FileText, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileBottomNavProps {
  activeSection: string
  setActiveSection: (section: string) => void
  onCreateReel: () => void
  onOpenFeed: () => void
  theme: string
}

export default function MobileBottomNav({
  activeSection,
  setActiveSection,
  onCreateReel,
  onOpenFeed,
  theme,
}: MobileBottomNavProps) {
  const navItems = [
    { id: "overview", icon: Home, label: "Home" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "create", icon: Plus, label: "Create", action: onCreateReel },
    { id: "content", icon: FileText, label: "Content" },
    { id: "feed", icon: Play, label: "Reels", action: onOpenFeed },
  ]

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t ${
        theme === "dark" ? "bg-slate-900/98 border-slate-800" : "bg-white/98 border-gray-200"
      } backdrop-blur-lg md:hidden safe-area-pb`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeSection === item.id
          const isCreateButton = item.id === "create"
          const isFeedButton = item.id === "feed"

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => {
                if (item.action) {
                  item.action()
                } else {
                  setActiveSection(item.id)
                }
              }}
              className={`flex flex-col items-center justify-center space-y-1 p-2 h-16 w-16 rounded-xl ${
                isCreateButton
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg scale-110"
                  : isFeedButton
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
                    : isActive
                      ? "text-blue-500 bg-blue-500/10"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isCreateButton ? "mb-0" : ""}`} />
              <span className={`text-xs font-medium ${isCreateButton || isFeedButton ? "text-white" : ""}`}>
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
