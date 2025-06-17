"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const engagementData = [
  { platform: "Instagram", likes: 1200, comments: 80, shares: 45 },
  { platform: "Twitter", likes: 800, comments: 120, shares: 90 },
  { platform: "LinkedIn", likes: 600, comments: 40, shares: 25 },
  { platform: "TikTok", likes: 2000, comments: 200, shares: 150 },
]

export default function EngagementChart() {
  return (
    <Card
      onClick={() => console.log("Engagement chart clicked")}
      className="cursor-pointer hover:opacity-80 transition-opacity"
    >
      <CardHeader>
        <CardTitle>Platform Engagement</CardTitle>
        <CardDescription>Engagement metrics across different platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            likes: {
              label: "Likes",
              color: "hsl(var(--chart-1))",
            },
            comments: {
              label: "Comments",
              color: "hsl(var(--chart-2))",
            },
            shares: {
              label: "Shares",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="likes" fill="var(--color-likes)" />
              <Bar dataKey="comments" fill="var(--color-comments)" />
              <Bar dataKey="shares" fill="var(--color-shares)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
