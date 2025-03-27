"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Heart, MessageSquare, Clock, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dummy data for activities
const generateActivities = (count: number, type: string) => {
  const activities = []
  const datasetNames = [
    "Global Economic Indicators",
    "Climate Change Data 2023",
    "COVID-19 Statistics",
    "Stock Market Trends",
    "Population Demographics",
    "Renewable Energy Statistics",
    "Agricultural Production Data",
    "Healthcare Metrics by Country",
    "Education Statistics 2023",
    "Transportation Data",
  ]

  const timeframes = [
    "2 hours ago",
    "5 hours ago",
    "Yesterday",
    "2 days ago",
    "3 days ago",
    "Last week",
    "2 weeks ago",
    "Last month",
  ]

  for (let i = 0; i < count; i++) {
    const dataset = datasetNames[Math.floor(Math.random() * datasetNames.length)]
    const time = timeframes[Math.floor(Math.random() * timeframes.length)]

    activities.push({
      id: `activity-${type}-${i}`,
      type: type,
      dataset: dataset,
      time: time,
      datasetId: `dataset-${Math.floor(Math.random() * 1000)}`,
      description:
        type === "comment"
          ? `"This dataset provides valuable insights for my research project. Thank you for sharing!"`
          : undefined,
    })
  }

  return activities
}

const allActivities = [
  ...generateActivities(8, "view"),
  ...generateActivities(5, "like"),
  ...generateActivities(3, "comment"),
].sort(() => Math.random() - 0.5)

export default function ActivitiesPage() {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredActivities = filter ? allActivities.filter((activity) => activity.type === filter) : allActivities

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recent Activities</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {filter ? `Filter: ${filter}` : "Filter"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter(null)}>All Activities</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("view")}>Views</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("like")}>Likes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("comment")}>Comments</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Activities</CardTitle>
          <CardDescription>Track your recent interactions with datasets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No activities found</p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-6 border-b last:border-0 last:pb-0">
                  <div className="p-2 rounded-full bg-primary/10">
                    {activity.type === "view" && <Eye className="h-4 w-4 text-primary" />}
                    {activity.type === "like" && <Heart className="h-4 w-4 text-primary" />}
                    {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <p className="font-medium">{activity.dataset}</p>
                      <div className="text-sm text-muted-foreground flex items-center mt-1 sm:mt-0">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {activity.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      You {activity.type === "view" ? "viewed" : activity.type === "like" ? "liked" : "commented on"}{" "}
                      this dataset
                    </p>

                    {activity.description && (
                      <div className="bg-muted p-3 rounded-md text-sm mt-2">{activity.description}</div>
                    )}

                    <div className="mt-3">
                      <Button variant="link" className="h-auto p-0 text-sm">
                        View Dataset
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

