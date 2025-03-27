"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { checkUserSession } from "@/lib/services/user"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save } from "lucide-react"

interface UserInfo {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  bio?: string
  location?: string
  website?: string
  [key: string]: any
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<Partial<UserInfo>>({})

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await checkUserSession()
        setUser(userData as UserInfo)
        setFormData({
          firstname: userData?.firstname || "",
          lastname: userData?.lastname || "",
          username: userData?.username || "",
          bio: userData.bio || "",
          location: userData.location || "",
          website: userData.website || "",
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setUser((prev) => (prev ? { ...prev, ...formData } : null))
      setSuccess(true)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setSaving(false)
    }
  }

  const getInitials = () => {
    return `${user?.firstname?.[0] || ""}${user?.lastname?.[0] || ""}`.toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <Tabs defaultValue="edit">
        <TabsList className="mb-6">
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="view">View Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar_url || ""} alt={`${user.firstname} ${user.lastname}`} />
                    <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                {success && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <AlertDescription>Profile updated successfully!</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email} disabled />
                  <p className="text-sm text-muted-foreground">
                    Email cannot be changed. Contact support for assistance.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your public profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar_url || ""} alt={`${user.firstname} ${user.lastname}`} />
                  <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">
                  {user.firstname} {user.lastname}
                </h2>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>

              <div className="space-y-6">
                {formData.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
                    <p>{formData.bio}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  {formData.location && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                      <p>{formData.location}</p>
                    </div>
                  )}
                </div>

                {formData.website && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Website</h3>
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {formData.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

