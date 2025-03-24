import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DatasetParameters } from "@/components/dataset-parameters"
import { DatasetSample } from "@/components/dataset-sample"
import { DatasetApiDocs } from "@/components/dataset-api-docs"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: dataset } = await supabase.from("datasets").select("name, description").eq("id", params.id).single()

  if (!dataset) {
    return {
      title: "Dataset Not Found",
      description: "The requested dataset could not be found",
    }
  }

  return {
    title: `${dataset.name} | DataSynk Datasets`,
    description: dataset.description,
  }
}

export default async function DatasetPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: dataset, error } = await supabase.from("datasets").select("*").eq("id", params.id).single()

  if (error || !dataset) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("datasets")
    .update({ view_count: (dataset.view_count || 0) + 1 })
    .eq("id", params.id)

  // Get sample data if available
  let sampleData = dataset.sample_data

  if (!sampleData && dataset.file_path) {
    try {
      const { data: fileData } = await supabase.storage.from("datasets").download(dataset.file_path)

      if (fileData) {
        const text = await fileData.text()

        if (dataset.file_type === "json") {
          const jsonData = JSON.parse(text)
          // Get first 5 items if it's an array
          sampleData = Array.isArray(jsonData) ? jsonData.slice(0, 5) : jsonData
        } else if (dataset.file_type === "csv") {
          // Simple CSV parsing
          const lines = text.split("\n").slice(0, 6) // Header + 5 rows
          const headers = lines[0].split(",")

          sampleData = lines.slice(1).map((line) => {
            const values = line.split(",")
            const row: Record<string, string> = {}

            headers.forEach((header, index) => {
              row[header.trim()] = values[index]?.trim() || ""
            })

            return row
          })
        }
      }
    } catch (error) {
      console.error("Error fetching sample data:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <Link href="/datasets" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
              ← Back to Datasets
            </Link>
            <h1 className="text-4xl font-bold">{dataset.name}</h1>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/api/datasets/${dataset.id}/data`} target="_blank">
                Download Data
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-4">{dataset.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline">{dataset.file_type.toUpperCase()}</Badge>
          {dataset.tags &&
            dataset.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sample">Sample Data</TabsTrigger>
          <TabsTrigger value="api">API Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Dataset Information</h2>
              <dl className="grid grid-cols-[120px_1fr] gap-2">
                <dt className="font-medium text-gray-500">Format:</dt>
                <dd>{dataset.file_type.toUpperCase()}</dd>

                <dt className="font-medium text-gray-500">Size:</dt>
                <dd>{dataset.size ? `${(dataset.size / 1024 / 1024).toFixed(2)} MB` : "Unknown"}</dd>

                <dt className="font-medium text-gray-500">Added:</dt>
                <dd>{new Date(dataset.created_at).toLocaleDateString()}</dd>

                <dt className="font-medium text-gray-500">Updated:</dt>
                <dd>{dataset.updated_at ? new Date(dataset.updated_at).toLocaleDateString() : "N/A"}</dd>

                <dt className="font-medium text-gray-500">API Calls:</dt>
                <dd>{dataset.access_count || 0}</dd>
              </dl>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Parameters</h2>
              <DatasetParameters parameters={dataset.parameters} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sample">
          <DatasetSample data={sampleData} fileType={dataset.file_type} datasetId={dataset.id} />
        </TabsContent>

        <TabsContent value="api">
          <DatasetApiDocs
            datasetId={dataset.id}
            datasetName={dataset.name}
            parameters={dataset.parameters}
            fileType={dataset.file_type}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

