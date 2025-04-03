"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkUserSession, logoutUser } from "@/lib/services/user"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, Avatar } from "@heroui/react"
import { Loader2, LogOut, User, Mail, Calendar } from "lucide-react"
import { format } from "date-fns"
import { Link } from "@heroui/link"

interface UserInfo {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  created_at: string
  updated_at: string
  [key: string]: any
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await checkUserSession()
        if (!userData) {
          // Redirect to login if no user session
          router.push("/login")
          return
        }
        setUser(userData as UserInfo)
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    await logoutUser()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null // This should not happen as we redirect in useEffect
  }

  const getInitials = () => {
    return `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase()
  }

  // Helper function to safely render values
  const renderValue = (value: any): string => {
    if (value === null || value === undefined) {
      return "N/A"
    }

    if (typeof value === "object") {
      return JSON.stringify(value)
    }

    return String(value)
  }

  return (
    <div className="min-h-screen bg-black-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold"> Welcome, {user.firstname}!</h1>
          <Button variant="bordered" onClick={handleLogout}  className=" bg-red/20 border-red-400/30 hover:bg-red-400/50 hover:border-red-400/30">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1  gap-6">
          <Card className="md:col-span-1 bg-black-200 py-8 border border-gray-200/10">
            {/* <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader> */}
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4" src={user.avatar_url || ""} alt={`${user.firstname} ${user.lastname}`} />
                {/* <Avatar></Avatar><AvatarFallback className="text-lg">{getInitials()}</AvatarFallback></Avatar>*/}
              <h2 className="text-xl font-semibold">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-500">@{user.username}</p>

              <div className="flex items-center mt-6 space-y-4">
                {/* <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400/50" />
                  <span>{user.email}</span>
                </div> */}
                {user.created_at && (
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2 " />
                    <span>Joined: {format(new Date(user.created_at), "PPP")}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <Link href="/dashboard/edit-profile" className="w-auto rounded-md bg-gray-400/25 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary border border-gray-200/30 rounded-large">
                  Edit Profile
                </Link>
            </CardFooter>
          </Card>

          <Card className="md:col-span-1  bg-black-200 border border-gray-200/10">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(user).map(([key, value]) => {
                    // Skip displaying certain fields
                    if (["id", "avatar_url", "aud", "role", "user_id", "provider", "providers", "created_at", "updated_at", "confirmed_at", "identities", "email_confirmed_at", "user_metadata", "app_metadata", "recovery_sent_at", "last_sign_in_at", "is_anonymous", "confirmation_sent_at", "",].includes(key)) {
                      return null
                    }

                    // Format dates
                    let displayValue = value
                    if (key.includes("_at") && value) {
                      try {
                        displayValue = format(new Date(value), "PPP")
                      } catch (e) {
                        displayValue = value
                      }
                    }

                    // Format keys for display
                    // const formattedKey = key
                    //   .replace(/_/g, " ")
                    //   .split(" ")
                    //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    //   .join(" ")

                    return (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-gray-400/50">{key}</span>
                        <span className="font-medium">
                          {typeof displayValue === "object" ? JSON.stringify(displayValue) : displayValue || "N/A"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


