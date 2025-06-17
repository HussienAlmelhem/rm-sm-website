"use client"

import { TrendingUp, Users, Target, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ExecutiveInsightsProps {
  themeClasses: any
}

export default function ExecutiveInsights({ themeClasses }: ExecutiveInsightsProps) {
  const insights = [
    {
      title: "Audience Growth Velocity",
      value: "12.5%",
      description: "Month-over-month compound growth rate",
      progress: 85,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Engagement Quality Score",
      value: "8.7/10",
      description: "Based on comment sentiment & interaction depth",
      progress: 87,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Content Performance Index",
      value: "94.2",
      description: "Weighted average of reach, engagement & conversions",
      progress: 94,
      icon: Target,
      color: "text-purple-500",
    },
    {
      title: "Brand Mention Velocity",
      value: "+340%",
      description: "Increase in organic brand mentions",
      progress: 78,
      icon: Zap,
      color: "text-orange-500",
    },
  ]

  return (
    <Card className={themeClasses.card}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span>Strategic Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-4 h-4 ${insight.color}`} />
                    <span className="font-medium text-sm">{insight.title}</span>
                  </div>
                  <span className={`font-bold ${insight.color}`}>{insight.value}</span>
                </div>
                <Progress value={insight.progress} className="h-2" />
                <p className={`text-xs ${themeClasses.text.secondary}`}>{insight.description}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
