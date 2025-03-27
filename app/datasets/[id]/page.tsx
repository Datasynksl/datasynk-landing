"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge, Button, Code } from "@heroui/react"
import { Share2, Download, Star, Heart, Eye, MessageSquare, Code2 } from "lucide-react"
import { getDataset } from "@/lib/services/datasets"
import { format } from "date-fns"

interface Dataset {
  id: string
  name: string
  description: string
  file_path: string
  file_type: string
  size: number
  parameters: any
  sample_data: any
  tags: string[]
  created_at: string
  updated_at: string
  access_count: number
  view_count: number
  category: string
  sector: string
  rating?: number
  likes?: number
  comments?: number
}

export default function DatasetPage(props: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const params = use(props.params)
  const [dataset, setDataset] = useState<Dataset | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const data = await getDataset(params.id)
        setDataset(data)
      } catch (error) {
        console.error("Error fetching dataset:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDataset()
  }, [params.id])

  if (loading) return <div className="flex justify-center items-center h-screen bg-black-200">Loading...</div>
  if (!dataset) return <div className="flex justify-center items-center h-screen bg-gray-200">Dataset not found</div>

  const apiEndpoint = `/api/datasets/${dataset.id}`

  return (
    <div className=" min-h-auto py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-lg mb-6 bg-black-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">{dataset.name}</CardTitle>
                <p className="text-gray-400 mt-2">{dataset.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {dataset.tags &&
                    dataset.tags.map((tag, index) => (
                      <Badge key={index} variant="solid">
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="flex gap-2 text-gray-400">
                <Button variant="bordered" size="sm" className="rounded hover:bg-gray-200/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="solid" size="sm" className="rounded bg-black-100 hover:bg-gray-200/20">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 text-gray-200/50">
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{dataset.rating || 4.5} Rating</span>
              </div>
              <div className="flex items-center text-sm">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                <span>{dataset.likes || 24} Likes</span>
              </div>
              <div className="flex items-center text-sm">
                <Eye className="w-4 h-4 mr-1 text-blue-500" />
                <span>{dataset.view_count || 0} Views</span>
              </div>
              <div className="flex items-center text-sm">
                <MessageSquare className="w-4 h-4 mr-1 text-green-500" />
                <span>{dataset.comments || 8} Comments</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Dataset Information</h3>
                <Card className="bg-gray-100 dark:bg-black-100">
                  <CardContent className="pt-6">
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">File Type</dt>
                        <dd className="font-medium">{dataset.file_type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Size</dt>
                        <dd className="font-medium">{formatBytes(dataset.size)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Created</dt>
                        <dd className="font-medium">{format(new Date(dataset.created_at), "PPP")}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Last Updated</dt>
                        <dd className="font-medium">
                          {dataset.updated_at ? format(new Date(dataset.updated_at), "PPP") : "N/A"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Category</dt>
                        <dd className="font-medium">{dataset.category || "Uncategorized"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Sector</dt>
                        <dd className="font-medium">{dataset.sector || "N/A"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Access Count</dt>
                        <dd className="font-medium">{dataset.access_count || 0}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Sample Data</h3>
                <Card className="bg-gray-100 dark:bg-black-100">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-2">
                      <Code2 className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Preview</span>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
                      <Code className="text-xs">
                        {dataset.sample_data
                          ? typeof dataset.sample_data === "object"
                            ? JSON.stringify(dataset.sample_data, null, 2)
                            : dataset.sample_data
                          : "No sample data available"}
                      </Code>
                    </div>
                    <div className="mt-4">
                      <Button variant="bordered" size="sm" className="w-full">
                        Make a Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {dataset.parameters && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-4">Parameters</h3>
                <Card className="bg-gray-100 dark:bg-black-100">
                  <CardContent className="pt-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(dataset.parameters).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          {/* <dt className="text-sm text-muted-foreground">{key}</dt> */}
                          <dd className="font-medium">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

