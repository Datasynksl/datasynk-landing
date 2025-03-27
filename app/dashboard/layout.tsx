"use client"

import type React from "react"

import Sidebar from "./components/sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkUserSession } from "@/lib/services/user"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await checkUserSession()
        if (!user) {
          router.push("/login")
          return
        }
        setLoading(false)
      } catch (error) {
        console.error("Error checking auth:", error)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black-100">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
    </div>
  )
}

