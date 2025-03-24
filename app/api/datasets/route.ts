import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10
    const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0
    const search = searchParams.get("search")

    // Build query
    let query = supabase
      .from("datasets")
      .select("id, name, description, created_at, updated_at, parameters, file_type, size, access_count")

    // Add search if provided
    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    // Execute query with pagination
    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)
      // .select("*", { count: "exact" })
      .select("*")


    if (error) {
      console.error("Error fetching datasets:", error)
      return NextResponse.json({ error: "Failed to fetch datasets" }, { status: 500 })
    }

    return NextResponse.json({
      datasets: data,
      pagination: {
        total: count,
        limit,
        offset,
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

