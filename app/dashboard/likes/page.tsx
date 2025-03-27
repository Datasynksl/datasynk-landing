"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, FileText, BarChart, Calendar, Download, ExternalLink, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Generate dummy data for liked datasets
const generateLikedDatasets = (count: number) => {
  const datasets = []
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

  const descriptions = [
    "Comprehensive economic data from countries worldwide",
    "Temperature and climate metrics from the past decade",
    "Global pandemic statistics and vaccination data",
    "Historical stock market performance for major indices",
    "Population statistics by country, age, and gender",
    "Data on renewable energy adoption and impact",
    "Crop yields and agricultural statistics by region",
    "Healthcare access and outcomes across different countries",
    "Educational attainment and literacy rates globally",
    "Public transportation usage and infrastructure data",
  ]

  const categories = [
    "Economics",
    "Climate",
    "Health",
    "Finance",
    "Demographics",
    "Energy",
    "Agriculture",
    "Healthcare",
    "Education",
    "Transportation",
  ]

  const fileTypes = ["CSV", "JSON", "Excel", "SQL", "XML"]

  for (let i = 0; i < count; i++) {
    const index = i % datasetNames.length
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 60))

    datasets.push({
      id: `dataset-${i}`,
      name: datasetNames[index],
      description: descriptions[index],
      category: categories[index],
      fileType: fileTypes[Math.floor(Math.random() * fileTypes.length)],
      size: Math.floor(Math.random() * 100) + 1,
      dateAdded: date,
      downloads: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000),
      tags: [categories[index], fileTypes[Math.floor(Math.random() * fileTypes.length)], "2023"],
    })
  }

  return datasets
}

const likedDatasets = generateLikedDatasets(12)

export default function LikesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDatasets = likedDatasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Liked Datasets</h1>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search datasets..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredDatasets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No liked datasets found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {searchTerm
                ? `No datasets matching "${searchTerm}" found in your likes`
                : "You haven't liked any datasets yet. Browse datasets and click the heart icon to add them to your likes."}
            </p>
            {searchTerm && (
              <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <Card key={dataset.id} className="overflow-hidden">
              <div className="bg-primary/5 p-4 flex justify-between items-center border-b">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-md mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{dataset.category}</p>
                    <p className="font-medium truncate max-w-[180px]">{dataset.name}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Heart className="h-5 w-5 fill-current" />
                </Button>
              </div>

              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{dataset.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{format(dataset.dateAdded, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{dataset.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{dataset.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {dataset.fileType} • {dataset.size} MB
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {dataset.tags.map((tag, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

