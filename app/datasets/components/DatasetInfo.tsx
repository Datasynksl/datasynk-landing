import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

interface DatasetInfoProps {
  dataset: any
}

export default function DatasetInfo({ dataset }: DatasetInfoProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Dataset Information</h3>
      <Card className="bg-black-200">
        <CardContent className="pt-6">
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-400">File Type</dt>
              <dd className="font-medium">{dataset.file_type}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Size</dt>
              <dd className="font-medium">{formatBytes(dataset.size)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Created</dt>
              <dd className="font-medium">{format(new Date(dataset.created_at), "PPP")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Last Updated</dt>
              <dd className="font-medium">{dataset.updated_at ? format(new Date(dataset.updated_at), "PPP") : "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Category</dt>
              <dd className="font-medium">{dataset.category || "Uncategorized"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Sector</dt>
              <dd className="font-medium">{dataset.sector || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Downloads</dt>
              <dd className="font-medium">{dataset.download_count || 0}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}