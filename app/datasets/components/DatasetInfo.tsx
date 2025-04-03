"use client"

import { ThumbsUp, Share } from "lucide-react"
import { Button } from "@heroui/react"

interface DatasetInfoProps {
  dataset: {
    id: string
    created_at: string
    updated_at?: string
    size?: number
    file_type: string
    access_count?: number
    like_count?: number
    share_count?: number
    download_count?: number
  }
  onLike: () => void
  onShare: (method?: string, email?: string | null) => void
}

export function DatasetInfo({ dataset, onLike, onShare }: DatasetInfoProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown"

    const units = ["B", "KB", "MB", "GB", "TB"]
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Dataset Information</h2>

      <dl className="grid grid-cols-[120px_1fr] gap-2">
        <dt className="font-medium text-gray-500">Format:</dt>
        <dd>{dataset.file_type.toUpperCase()}</dd>

        <dt className="font-medium text-gray-500">Size:</dt>
        <dd>{formatFileSize(dataset.size)}</dd>

        <dt className="font-medium text-gray-500">Added:</dt>
        <dd>{formatDate(dataset.created_at)}</dd>

        <dt className="font-medium text-gray-500">Updated:</dt>
        <dd>{dataset.updated_at ? formatDate(dataset.updated_at) : "N/A"}</dd>

        <dt className="font-medium text-gray-500">API Calls:</dt>
        <dd>{dataset.access_count || 0}</dd>
      </dl>

      <div className="flex flex-wrap gap-2 pt-4">
        <Button variant="bordered" size="sm" onClick={onLike} className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" />
          Like
        </Button>

        <Button variant="bordered" size="sm" onClick={() => onShare()} className="flex items-center gap-1">
          <Share className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}

