"use client"
import { useEffect, useState } from "react"
import { DatasetGrid } from "@/components/dataset-grid"
import { Button } from "@heroui/react"
import Link from "next/link"
import { getDatasets } from "@/lib/services/datasets"
import SearchBar from "./components/SearchBar"
import { Plus } from "lucide-react"

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

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")


  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const data = await getDatasets()
        setDatasets(data)
      } catch (error) {
        console.error('Error fetching datasets:', error)
        setError('Failed to load datasets')
      } finally {
        setLoading(false)
      }
    }

    fetchDatasets()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-gray-500">Loading datasets...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="mb-4">
        <h1 className="text-3xl font-bold">Datasets</h1>
      </div>

      <div className="flex">
        <div className="flex-1 mr-4 space-y-4">
            <SearchBar
              onSearch={(query) => {
                setSearchQuery(query)
            }}
              />
        </div>
          <div className="flex justify-between items-center mb-8">
            <Link href="/datasets/new">
              <Button className="rounded-full p-4"><Plus /> </Button>
            </Link>
          </div>
          </div>
      
      {datasets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No datasets available</p>
          <Link href="/datasets/new">
            <Button>Create Your First Dataset</Button>
          </Link>
        </div>
      ) : (
        <DatasetGrid datasets={datasets} />
      )}
    </div>
  )
}