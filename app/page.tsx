"use client"

import { useState } from "react"
import {
  Twitter,
  Instagram,
  Youtube,
  TrendingUp,
  TrendingDown,
  Settings,
  Menu,
  Activity,
  Users,
  Eye,
  Target,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useTheme } from "./hooks/useTheme"
import SettingsPanel from "./components/settings-panel"
import ChartModal from "./components/chart-modal"
import ExecutiveInsights from "./components/executive-insights"
import AdvancedMetrics from "./components/advanced-metrics"
import CreateReelModal from "./components/create-reel-modal"
import ContentLibrary from "./components/content-library"
import Sidebar from "./components/sidebar"
import MobileFeed from "./components/mobile-feed"
import MobileSidebar from "./components/mobile-sidebar"
import MobileBottomNav from "./components/mobile-bottom-nav"

export default function SocialMediaDashboard() {
  const [showSettings, setShowSettings] = useState(false)
  const [showCreateReel, setShowCreateReel] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [selectedStat, setSelectedStat] = useState<string | null>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [activeSection, setActiveSection] = useState("overview")
  const [createdPosts, setCreatedPosts] = useState<any[]>([])
  const { theme, setTheme, customColors, setCustomColors, highContrast, setHighContrast } = useTheme()

  const [showMobileFeed, setShowMobileFeed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const executiveMetrics = [
    {
      title: "Total Reach",
      value: "2.4M",
      change: "+18.2%",
      trend: "up",
      period: "vs last month",
      icon: Eye,
      color: "blue",
      benchmark: "Industry avg: 1.8M",
    },
    {
      title: "Engagement Rate",
      value: "4.7%",
      change: "+0.8%",
      trend: "up",
      period: "vs last month",
      icon: Activity,
      color: "green",
      benchmark: "Industry avg: 3.2%",
    },
    {
      title: "Conversion Rate",
      value: "2.1%",
      change: "-0.3%",
      trend: "down",
      period: "vs last month",
      icon: Target,
      color: "orange",
      benchmark: "Industry avg: 1.9%",
    },
    {
      title: "ROI",
      value: "340%",
      change: "+45%",
      trend: "up",
      period: "vs last quarter",
      icon: TrendingUp,
      color: "purple",
      benchmark: "Target: 300%",
    },
  ]

  const platformMetrics = [
    {
      platform: "LinkedIn",
      handle: "@zaidnhussien",
      followers: "45.2K",
      growth: "+12.5%",
      engagement: "6.8%",
      reach: "890K",
      icon: Users,
      color: "#0077B5",
      status: "excellent",
      ctr: "3.2%",
      cpm: "$2.40",
    },
    {
      platform: "Twitter",
      handle: "@zaidnhussien",
      followers: "28.7K",
      growth: "+8.3%",
      engagement: "4.2%",
      reach: "650K",
      icon: Twitter,
      color: "#1DA1F2",
      status: "good",
      ctr: "2.8%",
      cpm: "$1.85",
    },
    {
      platform: "Instagram",
      handle: "@zaidnhussien",
      followers: "67.1K",
      growth: "+15.7%",
      engagement: "5.9%",
      reach: "1.2M",
      icon: Instagram,
      color: "#E4405F",
      status: "excellent",
      ctr: "4.1%",
      cpm: "$3.20",
    },
    {
      platform: "YouTube",
      handle: "@zaidnhussien",
      followers: "12.4K",
      growth: "+22.1%",
      engagement: "7.3%",
      reach: "340K",
      icon: Youtube,
      color: "#FF0000",
      status: "outstanding",
      ctr: "5.7%",
      cpm: "$4.50",
    },
  ]

  const campaignPerformance = [
    { name: "Q4 Brand Awareness", status: "active", budget: "$25K", spent: "$18.2K", roi: "285%", leads: 1240 },
    { name: "Product Launch", status: "completed", budget: "$40K", spent: "$38.5K", roi: "420%", leads: 2180 },
    { name: "Thought Leadership", status: "active", budget: "$15K", spent: "$9.8K", roi: "195%", leads: 680 },
    { name: "Recruitment Drive", status: "paused", budget: "$20K", spent: "$12.3K", roi: "150%", leads: 450 },
  ]

  const handleStatClick = (platform: string, metric: string) => {
    setSelectedStat(`${platform} - ${metric}`)
    const generateAdvancedChartData = () => {
      const days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - i))
        return {
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: Math.floor(Math.random() * 1000) + 500,
          growth: Math.floor(Math.random() * 40) - 20,
          engagement: Math.floor(Math.random() * 10) + 2,
          reach: Math.floor(Math.random() * 5000) + 1000,
        }
      })
      return days
    }
    setChartData(generateAdvancedChartData())
  }

  const handleCreateReel = (reelData: any) => {
    const newReel = {
      id: Date.now(),
      ...reelData,
      createdAt: new Date(),
      status: reelData.schedulePost ? "scheduled" : "published",
      views: Math.floor(Math.random() * 10000) + 1000,
      likes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 100) + 10,
      shares: Math.floor(Math.random() * 50) + 5,
    }
    setCreatedPosts([newReel, ...createdPosts])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-500 bg-green-500/10"
      case "outstanding":
        return "text-purple-500 bg-purple-500/10"
      case "good":
        return "text-blue-500 bg-blue-500/10"
      case "active":
        return "text-green-500 bg-green-500/10"
      case "completed":
        return "text-blue-500 bg-blue-500/10"
      case "paused":
        return "text-orange-500 bg-orange-500/10"
      default:
        return "text-gray-500 bg-gray-500/10"
    }
  }

  const getThemeClasses = () => {
    if (highContrast) {
      return {
        background: "bg-black text-white",
        card: "bg-gray-900 border-white border-2 hover:bg-gray-800",
        text: { primary: "text-white", secondary: "text-gray-300", muted: "text-gray-400" },
      }
    }

    switch (theme) {
      case "dark":
        return {
          background: "bg-slate-950 text-white",
          card: "bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 backdrop-blur-sm",
          text: { primary: "text-white", secondary: "text-slate-400", muted: "text-slate-500" },
        }
      case "light":
        return {
          background: "bg-gray-50 text-gray-900",
          card: "bg-white/80 border-gray-200 hover:bg-white shadow-sm backdrop-blur-sm",
          text: { primary: "text-gray-900", secondary: "text-gray-600", muted: "text-gray-500" },
        }
      default:
        return {
          background: "bg-slate-950 text-white",
          card: "bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 backdrop-blur-sm",
          text: { primary: "text-white", secondary: "text-slate-400", muted: "text-slate-500" },
        }
    }
  }

  const themeClasses = getThemeClasses()

  return (
    <div className={`min-h-screen flex transition-all duration-500 ${themeClasses.background}`}>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        themeClasses={themeClasses}
        theme={theme}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Professional Header */}
        <header
          className={`border-b ${theme === "dark" ? "border-slate-800" : "border-gray-200"} backdrop-blur-md bg-opacity-80`}
        >
          <div className="mobile-header px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-6">
                <div>
                  <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Social Intelligence Hub
                  </h1>
                  <p className={`text-xs md:text-sm ${themeClasses.text.secondary} mt-1 hidden md:block`}>
                    Advanced Analytics & Performance Management
                  </p>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search..." className="pl-10 w-64" />
                  </div>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Data
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 md:space-x-4">
                <Button
                  onClick={() => setShowCreateReel(true)}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium hidden md:flex"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Reel
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Bell className="w-5 h-5" />
                </Button>
                <div className="hidden lg:flex items-center space-x-3">
                  <span className={`text-sm ${themeClasses.text.secondary}`}>Dark Mode</span>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
                  />
                </div>
                <Button variant="outline" size="icon" onClick={() => setShowSettings(true)} className="hidden md:flex">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileSidebarOpen(true)}>
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-3 md:p-6 space-y-4 md:space-y-8 overflow-y-auto pb-20 md:pb-6">
          {activeSection === "overview" && (
            <>
              {/* Executive KPIs */}
              <section>
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-semibold">Executive Dashboard</h2>
                  <div className="flex items-center space-x-2 hidden md:flex">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                  {executiveMetrics.map((metric, index) => {
                    const IconComponent = metric.icon
                    return (
                      <Card
                        key={index}
                        onClick={() => handleStatClick("Executive", metric.title)}
                        className={`${themeClasses.card} cursor-pointer transition-all duration-300 hover:scale-105 border-l-4 border-l-${metric.color}-500 card-mobile`}
                      >
                        <CardHeader className="pb-2 md:pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                              {metric.title}
                            </CardTitle>
                            <IconComponent className={`w-4 h-4 md:w-5 md:h-5 text-${metric.color}-500`} />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 md:space-y-3">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-xl md:text-3xl font-bold">{metric.value}</span>
                              <span
                                className={`text-xs md:text-sm flex items-center ${
                                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                                }`}
                              >
                                {metric.trend === "up" ? (
                                  <TrendingUp className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                ) : (
                                  <TrendingDown className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                )}
                                {metric.change}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">{metric.period}</div>
                            <div className="text-xs text-blue-500 bg-blue-500/10 px-2 py-1 rounded hidden md:block">
                              {metric.benchmark}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>

              {/* Platform Performance */}
              <section>
                <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Platform Performance Analysis</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
                  {platformMetrics.map((platform, index) => {
                    const IconComponent = platform.icon
                    return (
                      <Card
                        key={index}
                        onClick={() => handleStatClick(platform.platform, "overview")}
                        className={`${themeClasses.card} cursor-pointer transition-all duration-300 hover:scale-[1.02] card-mobile`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg" style={{ backgroundColor: `${platform.color}20` }}>
                                <IconComponent className="w-4 h-4 md:w-5 md:h-5" style={{ color: platform.color }} />
                              </div>
                              <div>
                                <CardTitle className="text-base md:text-lg">{platform.platform}</CardTitle>
                                <p className={`text-xs md:text-sm ${themeClasses.text.secondary}`}>{platform.handle}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(platform.status)}>{platform.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs md:text-sm text-muted-foreground">Followers</span>
                                  <span className="text-green-500 text-xs md:text-sm">{platform.growth}</span>
                                </div>
                                <div className="text-lg md:text-2xl font-bold">{platform.followers}</div>
                              </div>
                              <div>
                                <span className="text-xs md:text-sm text-muted-foreground">Engagement Rate</span>
                                <div className="text-base md:text-xl font-semibold">{platform.engagement}</div>
                                <Progress value={Number.parseFloat(platform.engagement)} className="h-2 mt-1" />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <span className="text-xs md:text-sm text-muted-foreground">Monthly Reach</span>
                                <div className="text-lg md:text-2xl font-bold">{platform.reach}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                                <div>
                                  <span className="text-muted-foreground">CTR:</span>
                                  <div className="font-semibold">{platform.ctr}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">CPM:</span>
                                  <div className="font-semibold">{platform.cpm}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>

              {/* Campaign Performance */}
              <section>
                <h2 className="text-xl font-semibold mb-6">Campaign Performance</h2>
                <Card className={themeClasses.card}>
                  <CardHeader>
                    <CardTitle>Active & Recent Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaignPerformance.map((campaign, index) => (
                        <div
                          key={index}
                          onClick={() => handleStatClick("Campaign", campaign.name)}
                          className="flex items-center justify-between p-4 rounded-lg border border-opacity-20 hover:bg-opacity-50 cursor-pointer transition-all"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              {campaign.status === "active" && <CheckCircle className="w-4 h-4 text-green-500" />}
                              {campaign.status === "completed" && <CheckCircle className="w-4 h-4 text-blue-500" />}
                              {campaign.status === "paused" && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                              <span className="font-medium">{campaign.name}</span>
                            </div>
                            <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <div className="text-muted-foreground">Budget</div>
                              <div className="font-semibold">{campaign.budget}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-muted-foreground">Spent</div>
                              <div className="font-semibold">{campaign.spent}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-muted-foreground">ROI</div>
                              <div className="font-semibold text-green-500">{campaign.roi}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-muted-foreground">Leads</div>
                              <div className="font-semibold">{campaign.leads}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Advanced Analytics Components */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ExecutiveInsights themeClasses={themeClasses} />
                <AdvancedMetrics themeClasses={themeClasses} />
              </div>
            </>
          )}

          {activeSection === "content" && (
            <ContentLibrary
              posts={createdPosts}
              themeClasses={themeClasses}
              onCreateReel={() => setShowCreateReel(true)}
            />
          )}
        </div>
      </div>

      {/* Create Reel Modal */}
      <CreateReelModal
        isOpen={showCreateReel}
        onClose={() => setShowCreateReel(false)}
        onCreateReel={handleCreateReel}
        themeClasses={themeClasses}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        theme={theme}
        setTheme={setTheme}
        customColors={customColors}
        setCustomColors={setCustomColors}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        themeClasses={themeClasses}
      />

      {/* Advanced Chart Modal */}
      {selectedStat && (
        <ChartModal
          isOpen={!!selectedStat}
          onClose={() => setSelectedStat(null)}
          title={selectedStat}
          data={chartData}
          themeClasses={themeClasses}
        />
      )}

      {/* Mobile Components */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenFeed={() => setShowMobileFeed(true)}
        themeClasses={themeClasses}
        theme={theme}
      />

      <MobileBottomNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onCreateReel={() => setShowCreateReel(true)}
        onOpenFeed={() => setShowMobileFeed(true)}
        theme={theme}
      />

      {/* Mobile Feed */}
      {showMobileFeed && (
        <MobileFeed posts={createdPosts} themeClasses={themeClasses} onBack={() => setShowMobileFeed(false)} />
      )}
    </div>
  )
}
