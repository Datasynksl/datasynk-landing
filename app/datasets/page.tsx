"use client"

import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Button } from "@heroui/react"
import { Plus } from "lucide-react"
import { DatasetCard } from "@/components/dataset-card"

const metadata = {
  title: "Datasets | DataSynk",
  description: "Browse and access our open datasets",
}

export default async function DatasetsPage() {
  const supabase = createClient()

  const { data: datasets, error } = await supabase
    .from("datasets")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching datasets:", error)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Open Datasets</h1>
          <p className="text-lg text-gray-600">
            Browse our collection of open datasets and integrate them into your applications using our RESTful API.
          </p>
        </div>

        <Button asChild>
          <Link href="/datasets/create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Dataset
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets && datasets.length > 0 ? (
          datasets.map((dataset) => <DatasetCard key={dataset.id} dataset={dataset} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No datasets available</p>
            <Button asChild>
              <Link href="/datasets/create">Create Your First Dataset</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

