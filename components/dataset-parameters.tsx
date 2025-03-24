"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ParameterProps {
  parameters: Record<string, any> | null
}

export function DatasetParameters({ parameters }: ParameterProps) {
  if (!parameters || Object.keys(parameters).length === 0) {
    return <div className="text-gray-500 italic">No parameters defined for this dataset</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parameter</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(parameters).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{key}</TableCell>
            <TableCell>{value.type || "string"}</TableCell>
            <TableCell>{value.description || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

