import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get dataset metadata
    const { data: dataset, error: metadataError } = await supabase.from("datasets").select("*").eq("id", id).single()

    if (metadataError) {
      console.error("Error fetching dataset metadata:", metadataError)
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 })
    }

    // Increment access count
    await supabase
      .from("datasets")
      .update({ access_count: (dataset.access_count || 0) + 1 })
      .eq("id", id)

    // Get file URL if dataset has a file
    let fileUrl = null
    if (dataset.file_path) {
      const { data: urlData, error: urlError } = await supabase.storage
        .from("datasets")
        .createSignedUrl(dataset.file_path, 60) // 60 seconds expiry

      if (!urlError) {
        fileUrl = urlData.signedUrl
      }
    }

    // Get sample data (first few rows)
    let sampleData = null
    if (dataset.sample_data) {
      sampleData = dataset.sample_data
    }

    return NextResponse.json({
      ...dataset,
      file_url: fileUrl,
      sample_data: sampleData,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

