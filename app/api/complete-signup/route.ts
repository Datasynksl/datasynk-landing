import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const authInstance = await auth()
  const { userId } = authInstance

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data, error } = await supabase.from("UserInfo").insert([
      {
        user_id: userId,
        username: userId, // You might want to generate a unique username here
      },
    ])

    if (error) throw error

    return NextResponse.redirect("/dashboard")
  } catch (error) {
    console.error("Error completing signup:", error)
    return NextResponse.json({ error: "Failed to complete signup" }, { status: 500 })
  }
}

