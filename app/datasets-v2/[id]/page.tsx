"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import DatasetHeader from "../components/DatasetHeader"
import DatasetInfo from "../components/DatasetInfo"
import SampleData from "../components/SampleData"
import DatasetParameters from "../components/DatasetParameters"
import DatasetComments from "@/components/dataset-comments"
import { getDataset } from "@/lib/services/datasets"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

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
  like_count: number
  download_count: number
  share_count: number
  comment_count: number
  avg_rating: number
  category: string
  sector: string
}

export default function DatasetPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const [dataset, setDataset] = useState<Dataset | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  const refreshDataset = async () => {
    try {
      setRefreshing(true)
      const data = await getDataset(params.id)
      setDataset(data)
    } catch (error) {
      console.error("Error refreshing dataset:", error)
    } finally {
      setRefreshing(false)
    }
  }

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black-200">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading dataset...</span>
      </div>
    )

  if (!dataset) return <div className="flex justify-center items-center h-screen bg-gray-200">Dataset not found</div>

  return (
    <div className="bg-black-200 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="shadow-lg mb-6 bg-black-100 rounded-lg">
          <DatasetHeader dataset={dataset} refreshDataset={refreshDataset} refreshing={refreshing} />
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DatasetInfo dataset={dataset} />
              <SampleData dataset={dataset} datasetId={params.id} />
            </div>
            <DatasetParameters parameters={dataset.parameters} />
          </div>
        </div>
        <DatasetComments datasetId={dataset.id} />
      </div>
    </div>
  )
}