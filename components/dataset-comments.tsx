"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getDatasetComments, addComment } from "@/lib/services/dataset-interaction"
import { format } from "date-fns"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, MessageSquare } from "lucide-react"

interface Comment {
  id: string
  content: string
  created_at: string
  updated_at: string
  is_edited: boolean
  user_id: string
  userinfo: {
    firstname: string
    lastname: string
    username: string
  }
}

export default function DatasetComments({ datasetId }: { datasetId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
    }

    checkAuth()
  }, [supabase.auth])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const commentsData = await getDatasetComments(datasetId)
        setComments(commentsData)
      } catch (error: any) {
        console.error("Error fetching comments:", error)
        toast({
          title: "Error loading comments",
          description: error.message || "Failed to load comments",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (datasetId) {
      fetchComments()
    }
  }, [datasetId, toast])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim()) return

    setSubmitting(true)

    try {
      const comment = await addComment(datasetId, newComment)
      setComments([comment, ...comments])
      setNewComment("")

      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getInitials = (firstname: string, lastname: string) => {
    return `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toUpperCase()
  }

  return (
    <Card className="mt-6 bg-black-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoggedIn ? (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 border-gray-40/15 rounded bg-gray-200/15"
              rows={3}
            />
            <Button type="submit" disabled={submitting || !newComment.trim()} className="bg-gray-200/80 text-black-100 rounded ">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Comment"
              )}
            </Button>
          </form>
        ) : (
          <div className="bg-muted p-4 rounded-md mb-6">
            <p className="text-center">
              Please{" "}
              <a href="/login" className="text-primary hover:underline">
                log in
              </a>{" "}
              to leave a comment.
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No comments yet. Be the first to comment!</div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="bg-slate-300 text-black-200">
                  <AvatarFallback>{getInitials(comment.userinfo.firstname, comment.userinfo.lastname)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-blue-400/50">
                      {comment.userinfo.firstname} {comment.userinfo.lastname}
                    </h4>
                    <span className="text-xs text-gray-400/80">
                      {format(new Date(comment.created_at), "PPP 'at' p")}
                    </span>
                    {comment.is_edited && <span className="text-xs text-muted-foreground">(edited)</span>}
                  </div>
                  <p className="mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

