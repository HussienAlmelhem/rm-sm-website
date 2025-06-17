"use client"

import { BarChart3, PieChart, Activity, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdvancedMetricsProps {
  themeClasses: any
}

export default function AdvancedMetrics({ themeClasses }: AdvancedMetricsProps) {
  const metrics = [
    {
      category: "Acquisition Metrics",
      icon: BarChart3,
      data: [
        { label: "CAC (Customer Acquisition Cost)", value: "$24.50", trend: "down", change: "-15%" },
        { label: "LTV:CAC Ratio", value: "4.2:1", trend: "up", change: "+8%" },
        { label: "Organic Traffic Share", value: "68%", trend: "up", change: "+12%" },
      ],
    },
    {
      category: "Engagement Analytics",
      icon: Activity,
      data: [
        { label: "Session Duration", value: "4m 32s", trend: "up", change: "+18%" },
        { label: "Pages per Session", value: "3.8", trend: "up", change: "+5%" },
        { label: "Bounce Rate", value: "32%", trend: "down", change: "-8%" },
      ],
    },
    {
      category: "Revenue Attribution",
      icon: DollarSign,
      data: [
        { label: "Social Commerce Revenue", value: "$127K", trend: "up", change: "+45%" },
        { label: "Influenced Pipeline", value: "$890K", trend: "up", change: "+23%" },
        { label: "Attribution Score", value: "0.34", trend: "up", change: "+12%" },
      ],
    },
  ]

  return (
    <Card className={themeClasses.card}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChart className="w-5 h-5 text-purple-500" />
          <span>Advanced Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-sm">{category.category}</span>
                </div>
                <div className="space-y-2 pl-6">
                  {category.data.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center justify-between">
                      <span className={`text-sm ${themeClasses.text.secondary}`}>{metric.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{metric.value}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            metric.trend === "up" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
                          }`}
                        >
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
