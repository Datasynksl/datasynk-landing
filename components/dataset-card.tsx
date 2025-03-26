import Link from "next/link"
import { Database, FileJson, FileSpreadsheet, Heart, Star, Eye, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@heroui/react"

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
}

export function DatasetCard({ dataset }: { dataset: Dataset }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "json":
        return <FileJson className="h-5 w-5" />
      case "csv":
        return <FileSpreadsheet className="h-5 w-5" />
      default:
        return <Database className="h-5 w-5" />
    }
  }

  const parameterCount = dataset.parameters ? Object.keys(dataset.parameters).length : 0

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-gray-200 dark:bg-black-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-1">{dataset.name}</CardTitle>
          {getFileIcon(dataset.file_type)}
        </div>
        <CardDescription className="line-clamp-2">{dataset.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{dataset.category}</Badge>
          {dataset.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{dataset.file_type.toUpperCase()}</Badge>
          <Badge variant="outline">{parameterCount} parameters</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{dataset.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{dataset.rating?.toFixed(1) || "0.0"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{dataset.access_count || 0}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Added on {formatDate(dataset.created_at)}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/datasets/${dataset.id}`}
          className="w-full inline-flex items-center justify-center rounded-lg bg-black-100 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-blue-300/10 hover:text-gray-200"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}

