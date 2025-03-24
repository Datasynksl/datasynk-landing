"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SampleProps {
  data: any
  fileType: string
  datasetId: string
}

export function DatasetSample({ data, fileType, datasetId }: SampleProps) {
  const [viewType, setViewType] = useState<"table" | "json">("table")

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No sample data available</p>
        <Button variant="outline" className="mt-4" asChild>
          <a href={`/api/datasets/${datasetId}/data`} target="_blank" rel="noopener noreferrer">
            View Full Dataset
          </a>
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Sample Data</h2>
        <div className="flex gap-2">
          <Button variant={viewType === "table" ? "default" : "outline"} size="sm" onClick={() => setViewType("table")}>
            Table View
          </Button>
          <Button variant={viewType === "json" ? "default" : "outline"} size="sm" onClick={() => setViewType("json")}>
            JSON View
          </Button>
        </div>
      </div>

      {viewType === "table" && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row: any, index: number) => (
                <TableRow key={index}>
                  {tableHeaders.map((header) => (
                    <TableCell key={`${index}-${header}`}>
                      {typeof row[header] === "object" ? JSON.stringify(row[header]) : String(row[header])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {viewType === "json" && (
        <Card>
          <CardContent className="p-4">
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 text-right">
        <Button asChild>
          <a href={`/api/datasets/${datasetId}/data`} target="_blank" rel="noopener noreferrer">
            View Full Dataset
          </a>
        </Button>
      </div>
    </div>
  )
}

