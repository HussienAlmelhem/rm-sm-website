"use client"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChartModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  data: any[]
  themeClasses: any
}

export default function ChartModal({ isOpen, onClose, title, data, themeClasses }: ChartModalProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg border ${themeClasses.card}`}>
          <p className={`font-medium ${themeClasses.text.primary}`}>{`${label}`}</p>
          <p className="text-blue-500">{`Value: ${payload[0].value}`}</p>
          {payload[1] && (
            <p className={`${payload[1].value >= 0 ? "text-green-500" : "text-red-500"}`}>
              {`Growth: ${payload[1].value}%`}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${themeClasses.background}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${themeClasses.text.primary}`}>Analytics: {title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="line" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="line" className="space-y-4">
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className={themeClasses.text.primary}>Trend Analysis</CardTitle>
                <CardDescription className={themeClasses.text.secondary}>
                  Performance over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={themeClasses.text.muted} />
                    <XAxis dataKey="month" stroke={themeClasses.text.secondary} />
                    <YAxis stroke={themeClasses.text.secondary} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                      name="Value"
                    />
                    <Line
                      type="monotone"
                      dataKey="growth"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      name="Growth %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bar" className="space-y-4">
            <Card className={themeClasses.card}>
              <CardHeader>
                <CardTitle className={themeClasses.text.primary}>Monthly Comparison</CardTitle>
                <CardDescription className={themeClasses.text.secondary}>
                  Month-by-month performance breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={themeClasses.text.muted} />
                    <XAxis dataKey="month" stroke={themeClasses.text.secondary} />
                    <YAxis stroke={themeClasses.text.secondary} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="Value" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="growth" fill="#10b981" name="Growth %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={themeClasses.card}>
                <CardHeader>
                  <CardTitle className={themeClasses.text.primary}>Summary Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className={themeClasses.text.secondary}>Average:</span>
                    <span className={themeClasses.text.primary}>
                      {Math.round(data.reduce((acc, item) => acc + item.value, 0) / data.length)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.text.secondary}>Highest:</span>
                    <span className={themeClasses.text.primary}>{Math.max(...data.map((item) => item.value))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.text.secondary}>Lowest:</span>
                    <span className={themeClasses.text.primary}>{Math.min(...data.map((item) => item.value))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.text.secondary}>Total Growth:</span>
                    <span
                      className={`${data.reduce((acc, item) => acc + item.growth, 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {data.reduce((acc, item) => acc + item.growth, 0)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className={themeClasses.card}>
                <CardHeader>
                  <CardTitle className={themeClasses.text.primary}>Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 rounded border border-opacity-20"
                      >
                        <span className={themeClasses.text.secondary}>{item.month}</span>
                        <div className="text-right">
                          <div className={themeClasses.text.primary}>{item.value}</div>
                          <div className={`text-sm ${item.growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {item.growth >= 0 ? "+" : ""}
                            {item.growth}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              // Export functionality could be added here
              console.log("Exporting chart data:", data)
            }}
          >
            Export Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
