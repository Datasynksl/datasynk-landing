import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { user_id, share_method, recipient_email } = await request.json()

    // Insert a record in the dataset_shares table
    const { data, error } = await supabase
      .from("dataset_shares")
      .insert({
        dataset_id: id,
        user_id: user_id || null,
        share_method: share_method || "link",
        recipient_email: recipient_email || null,
        shared_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error recording share:", error)
      return NextResponse.json({ error: "Failed to record share" }, { status: 500 })
    }

    // Get updated share count
    const { data: dataset, error: countError } = await supabase
      .from("datasets")
      .select("share_count")
      .eq("id", id)
      .single()

    if (countError) {
      console.error("Error fetching share count:", countError)
      return NextResponse.json({ error: "Failed to fetch share count" }, { status: 500 })
    }

    return NextResponse.json({ share_count: dataset.share_count || 0 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

