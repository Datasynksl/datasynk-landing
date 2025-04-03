import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
import RequestModal from "./RequestModal"

interface SampleDataProps {
  dataset: any
  datasetId: string
}

export default function SampleData({ dataset, datasetId }: SampleDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Sample Data</h3>
      <Card className="bg-black-200">
        <CardContent className="pt-6">
          <div className="flex items-center mb-2">
            <Code className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Preview</span>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
            <pre className="text-xs">
              {dataset.sample_data
                ? typeof dataset.sample_data === "object"
                  ? JSON.stringify(dataset.sample_data, null, 2)
                  : dataset.sample_data
                : "No sample data available"}
            </pre>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded hover:bg-gray-300/50"
              onClick={() => setIsModalOpen(true)}
            >
              Make a Request
            </Button>
          </div>
        </CardContent>
      </Card>
      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} datasetId={datasetId} />
    </div>
  )
}