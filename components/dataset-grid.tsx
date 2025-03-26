"use client"

import { useState } from "react"
import { DatasetCard } from "./dataset-card"
import { Button } from "@heroui/react"
import { Grid, List, ChevronLeft, ChevronRight } from "lucide-react"

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

interface DatasetGridProps {
  datasets: Dataset[]
  itemsPerPage?: number
}

export function DatasetGrid({ datasets, itemsPerPage = 20 }: DatasetGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(datasets.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDatasets = datasets.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "solid" : "flat"}
            onClick={() => setViewMode("grid")}
            size="sm"
          >
            <Grid className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "solid" : "flat"}
            onClick={() => setViewMode("list")}
            size="sm"
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, datasets.length)} of {datasets.length} datasets
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
        {currentDatasets.map((dataset) => (
          <div key={dataset.id} className={viewMode === "list" ? "w-full" : ""}>
            <DatasetCard dataset={dataset} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="bordered"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="bordered"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 