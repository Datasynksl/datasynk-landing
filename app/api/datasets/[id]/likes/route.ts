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

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if the user has already liked this dataset
    const { data: existingLike, error: checkError } = await supabase
      .from("dataset_likes")
      .select("*")
      .eq("dataset_id", id)
      .eq("user_id", user_id)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "no rows returned" error
      console.error("Error checking existing like:", checkError)
      return NextResponse.json({ error: "Failed to check existing like" }, { status: 500 })
    }

    let action = "added"

    if (existingLike) {
      // User has already liked this dataset, so unlike it
      const { error: unlikeError } = await supabase.from("dataset_likes").delete().eq("id", existingLike.id)

      if (unlikeError) {
        console.error("Error unliking dataset:", unlikeError)
        return NextResponse.json({ error: "Failed to unlike dataset" }, { status: 500 })
      }

      action = "removed"
    } else {
      // User hasn't liked this dataset yet, so like it
      const { error: likeError } = await supabase.from("dataset_likes").insert({
        dataset_id: id,
        user_id: user_id,
        liked_at: new Date().toISOString(),
      })

      if (likeError) {
        console.error("Error liking dataset:", likeError)
        return NextResponse.json({ error: "Failed to like dataset" }, { status: 500 })
      }
    }

    // Get updated like count
    const { data: dataset, error: countError } = await supabase
      .from("datasets")
      .select("like_count")
      .eq("id", id)
      .single()

    if (countError) {
      console.error("Error fetching like count:", countError)
      return NextResponse.json({ error: "Failed to fetch like count" }, { status: 500 })
    }

    return NextResponse.json({
      like_count: dataset.like_count || 0,
      action,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

