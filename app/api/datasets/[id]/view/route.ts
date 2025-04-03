
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { user_id } = await request.json()

    // Insert a record in the dataset_views table
    const { data, error } = await supabase
      .from("dataset_views")
      .insert({
        dataset_id: id,
        user_id: user_id || null,
        ip_address: request.headers.get("x-forwarded-for") || "unknown",
        device: request.headers.get("user-agent") || "unknown",
        browser: request.headers.get("user-agent") || "unknown",
        os: request.headers.get("user-agent") || "unknown",
        viewed_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error recording view:", error)
      return NextResponse.json({ error: "Failed to record view" }, { status: 500 })
    }

    // Get updated view count
    const { data: dataset, error: countError } = await supabase
      .from("datasets")
      .select("view_count")
      .eq("id", id)
      .single()

    if (countError) {
      console.error("Error fetching view count:", countError)
      return NextResponse.json({ error: "Failed to fetch view count" }, { status: 500 })
    }

    return NextResponse.json({ view_count: dataset.view_count || 0 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

