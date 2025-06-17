"use client"

import { Home, BarChart3, FileText, Calendar, Users, MessageSquare, Settings, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  themeClasses: any
  theme: string
}

export default function Sidebar({ activeSection, setActiveSection, themeClasses, theme }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "content", label: "Content", icon: FileText },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "audience", label: "Audience", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div
      className={`w-64 border-r ${
        theme === "dark" ? "border-slate-800 bg-slate-900/50" : "border-gray-200 bg-white/50"
      } backdrop-blur-sm`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Hash className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">SocialHub</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-500 border-r-2 border-blue-500"
                    : ""
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            Z
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Zaid N Hussein</p>
            <p className={`text-xs ${themeClasses.text.secondary} truncate`}>zaid@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
