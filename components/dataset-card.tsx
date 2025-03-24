import Link from "next/link"
import { Database, FileJson, FileSpreadsheet } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Dataset {
  id: string
  name: string
  description: string
  file_type: string
  parameters: any
  created_at: string
  access_count: number
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{dataset.name}</CardTitle>
          {getFileIcon(dataset.file_type)}
        </div>
        <CardDescription>{dataset.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{dataset.file_type.toUpperCase()}</Badge>
          <Badge variant="outline">{parameterCount} parameters</Badge>
        </div>
        <p className="text-sm text-gray-500">Added on {formatDate(dataset.created_at)}</p>
        <p className="text-sm text-gray-500">{dataset.access_count || 0} API requests</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/datasets/${dataset.id}`}
          className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}

