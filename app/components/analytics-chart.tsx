"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const analyticsData = [
  { date: "Jan", followers: 1200, engagement: 85, reach: 2400 },
  { date: "Feb", followers: 1350, engagement: 92, reach: 2800 },
  { date: "Mar", followers: 1580, engagement: 78, reach: 3200 },
  { date: "Apr", followers: 1720, engagement: 95, reach: 3600 },
  { date: "May", followers: 1950, engagement: 88, reach: 4100 },
  { date: "Jun", followers: 2180, engagement: 102, reach: 4500 },
]

export default function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Your social media performance over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            followers: {
              label: "Followers",
              color: "hsl(var(--chart-1))",
            },
            engagement: {
              label: "Engagement Rate",
              color: "hsl(var(--chart-2))",
            },
            reach: {
              label: "Reach",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => console.log("Analytics chart clicked")}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="var(--color-followers)"
                strokeWidth={2}
                dot={{ fill: "var(--color-followers)" }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="var(--color-engagement)"
                strokeWidth={2}
                dot={{ fill: "var(--color-engagement)" }}
              />
              <Line
                type="monotone"
                dataKey="reach"
                stroke="var(--color-reach)"
                strokeWidth={2}
                dot={{ fill: "var(--color-reach)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
