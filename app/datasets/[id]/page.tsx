"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useParams } from "next/navigation"
import { Tabs, Tab, Card, CardBody } from "@heroui/react"
import { DatasetHeader } from "../components/DatasetHeader"
import { DatasetInfo } from "../components/DatasetInfo"
import { DatasetParameters } from "../components/DatasetParameters"
import { SampleData } from "../components/SampleData"
import { RequestModal } from "../components/RequestModal"
import {
  getDatasetCounts,
  trackDatasetView,
  likeDataset,
  hasUserLikedDataset,
  trackDatasetDownload,
  shareDataset,
} from "@/lib/services/dataset-interaction"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function DatasetPage() {
  const params = useParams()
  const id = params.id as string

  const [dataset, setDataset] = useState<any>(null)
  const [counts, setCounts] = useState({
    view_count: 0,
    like_count: 0,
    comment_count: 0,
    share_count: 0,
    download_count: 0,
  })
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sampleData, setSampleData] = useState<any>(null)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  useEffect(() => {
    const fetchDatasetAndCounts = async () => {
      try {
        setLoading(true)

        // Fetch dataset metadata
        const { data, error } = await supabase.from("datasets").select("*").eq("id", id).single()
        if (error) throw new Error("Failed to fetch dataset")

        setDataset(data)

        // Fetch initial counts
        const initialCounts = await getDatasetCounts(id)
        setCounts(initialCounts)

        // Check if user has liked the dataset
        const liked = await hasUserLikedDataset(id)
        setIsLiked(liked)

        // Track the view
        await trackDatasetView(id)

        // Fetch sample data if not available
        if (!data.sample_data) {
          const response = await fetch(`/api/datasets/${id}/data?limit=5`)
          const sample = await response.json()
          setSampleData(sample.data)
        } else {
          setSampleData(data.sample_data)
        }
      } catch (err) {
        console.error("Unexpected error:", err)
        setError("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDatasetAndCounts()

    // Set up real-time subscriptions
    const subscriptions = [
      supabase
        .channel("dataset_views")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "dataset_views", filter: `dataset_id=eq.${id}` }, () => {
          setCounts(prev => ({ ...prev, view_count: prev.view_count + 1 }))
        })
        .subscribe(),
      supabase
        .channel("dataset_likes")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "dataset_likes", filter: `dataset_id=eq.${id}` }, () => {
          setCounts(prev => ({ ...prev, like_count: prev.like_count + 1 }))
        })
        .on("postgres_changes", { event: "DELETE", schema: "public", table: "dataset_likes", filter: `dataset_id=eq.${id}` }, () => {
          setCounts(prev => ({ ...prev, like_count: prev.like_count - 1 }))
        })
        .subscribe(),
      supabase
        .channel("dataset_comments")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "dataset_comments", filter: `dataset_id=eq.${id}` }, () => {
          setCounts(prev => ({ ...prev, comment_count: prev.comment_count + 1 }))
        })
        .on("postgres_changes", { event: "DELETE", schema: "public", table: "dataset_comments", filter: `dataset_id=eq.${id}` }, () => {
          setCounts(prev => ({ ...prev, comment_count: prev.comment_count - 1 }))
        })
        .subscribe(),
      supabase
        .channel("dataset_shares")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "dataset_shares", filter: `dataset_id=eq.${id}` }, () => {
          setCounts(prev => ({ ...prev, share_count: prev.share_count + 1 }))
        })
        .subscribe(),
      supabase
        .channel("dataset_downloads")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "dataset_downloads", filter: `dataset_id=eq.${id}` }, () => {
          setCounts(prev => ({ ...prev, download_count: prev.download_count + 1 }))
        })
        .subscribe()
    ]

    return () => {
      subscriptions.forEach(sub => supabase.removeChannel(sub))
    }
  }, [id])

  const handleLike = async () => {
    try {
      const result = await likeDataset(id)
      setIsLiked(result)
      setCounts(prev => ({
        ...prev,
        like_count: result ? prev.like_count + 1 : prev.like_count - 1
      }))
    } catch (error: any) {
      alert(error.message || "Failed to like dataset. Please try again.")
    }
  }

  const handleShare = async () => {
    try {
      const success = await shareDataset(id, "link")
      if (success) {
        setCounts(prev => ({ ...prev, share_count: prev.share_count + 1 }))
        navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      }
    } catch (error) {
      alert("Failed to share dataset. Please try again.")
    }
  }

  const handleDownload = async () => {
    try {
      const success = await trackDatasetDownload(id, "full", dataset?.file_type?.toLowerCase() || "csv")
      if (success) {
        setCounts(prev => ({ ...prev, download_count: prev.download_count + 1 }))
        const downloadUrl = dataset?.file_path || `/api/datasets/${id}/download`
        const link = document.createElement("a")
        link.href = downloadUrl
        link.setAttribute("download", `${dataset?.name || "dataset"}.${dataset?.file_type?.toLowerCase() || "csv"}`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        alert("Download started!")
      }
    } catch (error) {
      alert("Failed to download dataset. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p>Loading dataset...</p>
        </div>
      </div>
    )
  }

  if (error || !dataset) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-500">{error || "Dataset not found"}</p>
        </div>
      </div>
    )
  }

  const datasetWithCounts = { ...dataset, ...counts }

  return (
    <div className="container mx-auto px-4 py-12">
      <DatasetHeader
        dataset={datasetWithCounts}
        isLiked={isLiked}
        onLike={handleLike}
        onShare={handleShare}
        onDownload={handleDownload}
        onRequestClick={() => setIsRequestModalOpen(true)}
      />

      <div className="flex w-full flex-col">
        <Tabs aria-label="Dataset sections">
          <Tab key="overview" title="Overview">
            <Card>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <DatasetInfo dataset={datasetWithCounts} onShare={handleShare} onLike={handleLike} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Parameters</h2>
                    <DatasetParameters parameters={dataset.parameters} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="sample" title="Sample Data">
            <Card>
              <CardBody>
                <SampleData 
                  data={sampleData || dataset.sample_data} 
                  fileType={dataset.file_type} 
                  datasetId={dataset.id} 
                />
              </CardBody>
            </Card>
          </Tab>

          <Tab key="api" title="API Documentation">
            <Card>
              <CardBody className="bg-black-200/50">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">API Documentation</h2>
                  <p>
                    Use our RESTful API to access this dataset programmatically. The API provides endpoints to retrieve
                    metadata about the dataset and to query the actual data.
                  </p>
                  <div className="bg-black-200 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Endpoint</h3>
                    <code className="block bg-gray-100/50 p-2 rounded">GET /api/datasets/{dataset.id}/data</code>
                    <h3 className="font-semibold mt-4 mb-2">Query Parameters</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li><code>limit</code> - Number of records to return (default: 100)</li>
                      <li><code>offset</code> - Number of records to skip (default: 0)</li>
                      <li><code>format</code> - Response format: json or csv (default: json)</li>
                      <li><code>download</code> - Set to `true` to download the file</li>
                    </ul>
                    <h3 className="font-semibold mt-4 mb-2">Example</h3>
                    <code className="block bg-gray-100 p-2 rounded">
                      curl `{window.location.origin}/api/datasets/{dataset.id}/data?limit=10&offset=0`
                    </code>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        datasetId={dataset.id}
      />
    </div>
  )
}