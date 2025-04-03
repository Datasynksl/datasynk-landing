"use client"

import { useState } from "react"
import { Button } from "@heroui/react"
import { Download } from "lucide-react"

interface SampleProps {
  data: any
  fileType: string
  datasetId: string
}

export function SampleData({ data, fileType, datasetId }: SampleProps) {
  const [viewType, setViewType] = useState<"table" | "json">("table")

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No sample data available</p>
        <Button
          variant="bordered"
          className="mt-4"
          onClick={() => window.open(`/api/datasets/${datasetId}/data?download=true`, "_blank")}
        >
          View Full Dataset
        </Button>
      </div>
    )
  }

  // Handle different data types
  const isArray = Array.isArray(data)
  const isObject = !isArray && typeof data === "object"

  // For table view, we need array data
  let tableData = data
  let tableHeaders: string[] = []

  if (isArray && data.length > 0) {
    tableHeaders = Object.keys(data[0])
  } else if (isObject) {
    tableData = [data]
    tableHeaders = Object.keys(data)
  }

  const handleDownload = () => {
    // Track the download by making a request to the API
    fetch(`/api/datasets/${datasetId}/data?download=true`, {
      method: "GET",
    })

    // Open the download URL in a new tab
    window.open(`/api/datasets/${datasetId}/data?download=true`, "_blank")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Sample Data</h2>
        <div className="flex gap-2">
          <Button variant={viewType === "table" ? "solid" : "bordered"} size="sm" onClick={() => setViewType("table")}>
            Table View
          </Button>
          <Button variant={viewType === "json" ? "solid" : "bordered"} size="sm" onClick={() => setViewType("json")}>
            JSON View
          </Button>
        </div>
      </div>

      {viewType === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row: any, index: number) => (
                <tr key={index}>
                  {tableHeaders.map((header) => (
                    <td key={`${index}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {typeof row[header] === "object" ? JSON.stringify(row[header]) : String(row[header])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewType === "json" && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div className="mt-4 text-right">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Full Dataset
        </Button>
      </div>
    </div>
  )
}

