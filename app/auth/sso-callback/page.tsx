"use client"

import { useEffect } from "react"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const createSupabaseUser = async (userId: string, email: string, firstname: string, lastname: string) => {
    const { data, error } = await supabase
      .from("UserInfo")
      .insert([
        {
          user_id: userId,
          firstname,
          lastname,
          username: email,
        },
      ])
      .select()

    if (error) {
      console.error("Error inserting user into Supabase:", error)
      throw error
    }

    return data
  }

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const result: any = await handleRedirectCallback({})
        if (result?.createdSessionId) {
          // User signed up, create a record in Supabase
          const { firstName, lastName, emailAddresses } = result.userData
          await createSupabaseUser(result.userData.id, emailAddresses[0].emailAddress, firstName || "", lastName || "")
        }
        router.push("/dashboard")
      } catch (err) {
        console.error("Error handling OAuth callback:", err)
        router.push("/auth/error")
      }
    }

    handleCallback()
  }, [handleRedirectCallback, router]) // Removed createSupabaseUser from dependencies

  return <div>Loading...</div>
}

