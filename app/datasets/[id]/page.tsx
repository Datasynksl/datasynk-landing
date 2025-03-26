import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@heroui/react"
import { Heart, Star, Eye, Share2, Download } from "lucide-react"
import { getDataset } from "@/lib/services/datasets"
import { DatasetClient } from "@/components/dataset-client"

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

export default async function DatasetPage({ params }: { params: { id: string } }) {
  const dataset = await getDataset(params.id)

  return <DatasetClient dataset={dataset} />
}