"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@heroui/react"
import { Heart, Star, Eye, Share2, Download } from "lucide-react"

interface Dataset {
  id: string
  name: string
  description: string
  file_type: string
  parameters: any
  created_at: string
  access_count: number
  likes: number
  rating: number
  category: string
  tags: string[]
  file_url: string
}

interface DatasetClientProps {
  dataset: Dataset
}

export function DatasetClient({ dataset }: DatasetClientProps) {
  // Provide default values for optional properties
  const tags = dataset.tags || []
  const parameters = dataset.parameters || {}
  const likes = dataset.likes || 0
  const rating = dataset.rating || 0
  const access_count = dataset.access_count || 0
  const category = dataset.category || "Uncategorized"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Dataset Preview */}
        <div className="lg:col-span-2">
          <Card className="bg-black-200">
            <CardHeader>
              <CardTitle>{dataset.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{dataset.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{category}</Badge>
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{access_count}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dataset Info */}
        <div className="lg:col-span-1">
          <Card className="bg-black-200">
            <CardHeader>
              <CardTitle>Dataset Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">File Type</h3>
                  <p className="text-gray-600">{dataset.file_type}</p>
                </div>
                <div>
                  <h3 className="font-medium">Parameters</h3>
                  <p className="text-gray-600">{Object.keys(parameters).length}</p>
                </div>
                <div>
                  <h3 className="font-medium">Created</h3>
                  <p className="text-gray-600">
                    {new Date(dataset.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 