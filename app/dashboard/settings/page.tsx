"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Loader2, Copy, Trash2, KeyRound, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: "key_1",
      name: "Default API Key",
      key: "sk_test_51NzQpLKGgvA9Dsfdsf34234234",
      created: "2023-10-15",
      lastUsed: "2023-11-20",
    },
  ])
  const [showPassword, setShowPassword] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateApiKey = async () => {
    setGenerating(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newKey = {
        id: `key_${apiKeys.length + 1}`,
        name: `API Key ${apiKeys.length + 1}`,
        key: `sk_test_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        created: new Date().toISOString().split("T")[0],
        lastUsed: "Never",
      }

      setApiKeys([...apiKeys, newKey])
      setSuccess("API key generated successfully")
    } catch (error) {
      console.error("Error generating API key:", error)
    } finally {
      setGenerating(false)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
    setSuccess("API key deleted successfully")
    setTimeout(() => setSuccess(null), 3000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Password changed successfully")
    } catch (error) {
      console.error("Error changing password:", error)
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="api-keys">
        <TabsList className="mb-6">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for accessing the datasets API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {success && (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Your API Keys</h3>
                  <p className="text-sm text-muted-foreground">Use these keys to authenticate API requests</p>
                </div>
                <Button onClick={generateApiKey} disabled={generating}>
                  {generating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Generate New Key
                    </>
                  )}
                </Button>
              </div>

              <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-5">API Key</div>
                  <div className="col-span-2">Created</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center text-sm"
                  >
                    <div className="col-span-3">{apiKey.name}</div>
                    <div className="col-span-5 font-mono">
                      {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
                    </div>
                    <div className="col-span-2">{apiKey.created}</div>
                    <div className="col-span-2 flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey.key)}
                        title="Copy API key"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            title="Delete API key"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete API Key</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this API key? This action cannot be undone and any
                              applications using this key will no longer be able to access the API.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => deleteApiKey(apiKey.id)}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>

              {copied && <div className="text-sm text-green-600">API key copied to clipboard!</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              {success && (
                <Alert className="bg-green-50 border-green-200 text-green-800 mb-6">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input id="current-password" type={showPassword ? "text" : "password"} required />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input id="new-password" type={showPassword ? "text" : "password"} required />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input id="confirm-password" type={showPassword ? "text" : "password"} required />
                  </div>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Account Preferences</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Export</p>
                    <p className="text-sm text-muted-foreground">Download a copy of your account data</p>
                  </div>
                  <Button variant="outline">Export Data</Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-medium text-destructive mb-4">Danger Zone</h3>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete your account? This action cannot be undone and all your data
                        will be permanently deleted.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="confirm-delete">Type ``DELETE`` to confirm</Label>
                        <Input id="confirm-delete" placeholder="DELETE" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dataset Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when datasets you follow are updated
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Comments</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when someone comments on your datasets
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Likes</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when someone likes your datasets
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-muted-foreground">
                        Receive our monthly newsletter with platform updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-medium mb-4">Notification Frequency</h3>

                <div className="space-y-2">
                  <Label>How often would you like to receive email notifications?</Label>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="frequency" defaultChecked />
                      <span>Immediately</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="frequency" />
                      <span>Daily digest</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="frequency" />
                      <span>Weekly digest</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

