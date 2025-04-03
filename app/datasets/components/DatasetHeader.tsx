import {useEffect} from 'react'

import { CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, Download, Star, Heart, Eye, MessageSquare, Loader2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  trackDatasetView,
  likeDataset,
  hasUserLikedDataset,
  trackDatasetDownload,
  shareDataset,
  rateDataset,
  getUserDatasetRating,
} from "@/lib/services/dataset-interaction"

interface DatasetHeaderProps {
  dataset: any
  refreshDataset: () => Promise<void>
  refreshing: boolean
}

export function DatasetHeader({ dataset, refreshDataset, refreshing }: DatasetHeaderProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [userRating, setUserRating] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const init = async () => {
      await trackDatasetView(dataset.id)
      const liked = await hasUserLikedDataset(dataset.id)
      setIsLiked(liked)
      const rating = await getUserDatasetRating(dataset.id)
      setUserRating(rating)
      setTimeout(refreshDataset, 1000)
    }
    init()
  }, [dataset.id, refreshDataset])

  const handleLike = async () => {
    try {
      const result = await likeDataset(dataset.id)
      setIsLiked(result)
      await refreshDataset()
      toast({
        title: result ? "Dataset liked" : "Dataset unliked",
        description: result ? "This dataset has been added to your likes" : "This dataset has been removed from your likes",
      })
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to like dataset.", variant: "destructive" })
    }
  }

  const handleDownload = async () => {
    try {
      await trackDatasetDownload(dataset.id, "full", dataset.file_type.toLowerCase() || "csv")
      const downloadUrl = dataset.file_path || `/api/datasets/${dataset.id}/download`
      const link = document.createElement("a")
      link.href = downloadUrl
      link.setAttribute("download", `${dataset.name || "dataset"}.${dataset.file_type.toLowerCase() || "csv"}`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(refreshDataset, 1000)
      toast({ title: "Download started", description: "Your download should begin shortly" })
    } catch (error: any) {
      toast({ title: "Download failed", description: error.message || "Failed to download dataset.", variant: "destructive" })
    }
  }

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/datasets/${dataset.id}`
      await navigator.clipboard.writeText(shareUrl)
      await shareDataset(dataset.id, "link")
      setTimeout(refreshDataset, 1000)
      toast({ title: "Link copied", description: "Dataset link copied to clipboard" })
    } catch (error: any) {
      toast({ title: "Share failed", description: error.message || "Failed to share dataset.", variant: "destructive" })
    }
  }

  return (
    <CardHeader>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <CardTitle className="text-2xl font-bold">{dataset.name}</CardTitle>
          <p className="text-muted-foreground mt-2">{dataset.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {dataset.tags?.map((tag: string, index: number) => (
              <Badge key={index} variant="default">{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button variant="default" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-4">
        <div className="flex items-center text-sm">
          <Star className="w-4 h-4 mr-1 text-yellow-500" />
          <span>{dataset.avg_rating ? dataset.avg_rating.toFixed(1) : "No ratings"}</span>
        </div>
        <div className="flex items-center text-sm">
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent" onClick={handleLike}>
            <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-red-500 text-red-500" : "text-red-500"}`} />
            <span>{dataset.like_count || 0} Likes</span>
          </Button>
        </div>
        <div className="flex items-center text-sm">
          <Eye className="w-4 h-4 mr-1 text-blue-500" />
          <span>{dataset.view_count || 0} Views</span>
        </div>
        <div className="flex items-center text-sm">
          <MessageSquare className="w-4 h-4 mr-1 text-green-500" />
          <span>{dataset.comment_count || 0} Comments</span>
        </div>
        {refreshing && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            <span>Refreshing...</span>
          </div>
        )}
      </div>
    </CardHeader>
  )
}