import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"


export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const id = params.id
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 100
    const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0
    const format = searchParams.get("format") || "json"

    // Get dataset metadata
    const { data: dataset, error: metadataError } = await supabase.from("datasets").select("*").eq("id", id).single()

    if (metadataError) {
      console.error("Error fetching dataset metadata:", metadataError)
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 })
    }

    // Get file from storage
    const { data: fileData, error: fileError } = await supabase.storage.from("datasets").download(dataset.file_path)

    if (fileError) {
      console.error("Error downloading dataset file:", fileError)
      return NextResponse.json({ error: "Failed to retrieve dataset" }, { status: 500 })
    }

    // Process file based on type
    let data
    const fileContent = await fileData.text()

    if (dataset.file_type === "json") {
      data = JSON.parse(fileContent)

      // Apply pagination if data is an array
      if (Array.isArray(data)) {
        data = data.slice(offset, offset + limit)
      }
    } else if (dataset.file_type === "csv") {
      // Simple CSV parsing (for production, use a proper CSV parser)
      const lines = fileContent.split("\n")
      const headers = lines[0].split(",")

      data = lines
        .slice(1, offset + limit + 1)
        .slice(offset)
        .map((line) => {
          const values = line.split(",")
          const row: Record<string, string> = {}

          headers.forEach((header, index) => {
            row[header.trim()] = values[index]?.trim() || ""
          })

          return row
        })
    }

    // Return data in requested format
    if (format === "csv" && dataset.file_type === "json") {
      // Convert JSON to CSV
      if (Array.isArray(data) && data.length > 0) {
        const headers = Object.keys(data[0])
        const csvContent = [
          headers.join(","),
          ...data.map((row) => headers.map((header) => row[header]).join(",")),
        ].join("\n")

        return new NextResponse(csvContent, {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="${dataset.name}.csv"`,
          },
        })
      }
    }

    return NextResponse.json({
      data,
      pagination: {
        limit,
        offset,
        // Note: total count might not be accurate for CSV files
        total: Array.isArray(data) ? data.length : 1,
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

