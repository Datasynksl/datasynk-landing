import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { getDeviceInfo } from "@/lib/device-info"
import { v4 as uuidv4 } from "uuid"

// Initialize Supabase client
const supabase = createClientComponentClient()

// Interface for device info
interface DeviceInfo {
  device: string
  browser: string
  os: string
}

// Interface for comment data with user info
interface CommentData {
  id: string
  dataset_id: string
  user_id: string
  parent_comment_id: string | null
  content: string
  is_edited: boolean
  is_deleted: boolean
  created_at: string
  userinfo: {
    firstname: string
    lastname: string
    username: string
  }
}

// Interface for dataset counts
interface DatasetCounts {
  view_count: number
  like_count: number
  comment_count: number
  share_count: number
  download_count: number
}

// Get or create a session ID for anonymous users
const getSessionId = (): string => {
  if (typeof window === "undefined") return ""
  let sessionId = localStorage.getItem("dataset_session_id")
  if (!sessionId) {
    sessionId = uuidv4()
    localStorage.setItem("dataset_session_id", sessionId)
  }
  return sessionId
}

// Fetch counts for a dataset directly from tables
export const getDatasetCounts = async (datasetId: string): Promise<DatasetCounts> => {
  try {
    const [
      { count: viewCount },
      { count: likeCount },
      { count: commentCount },
      { count: shareCount },
      { count: downloadCount }
    ] = await Promise.all([
      supabase.from("dataset_views").select("id", { count: "exact" }).eq("dataset_id", datasetId),
      supabase.from("dataset_likes").select("id", { count: "exact" }).eq("dataset_id", datasetId),
      supabase.from("dataset_comments").select("id", { count: "exact" }).eq("dataset_id", datasetId).eq("is_deleted", false),
      supabase.from("dataset_shares").select("id", { count: "exact" }).eq("dataset_id", datasetId),
      supabase.from("dataset_downloads").select("id", { count: "exact" }).eq("dataset_id", datasetId)
    ])

    return {
      view_count: viewCount || 0,
      like_count: likeCount || 0,
      comment_count: commentCount || 0,
      share_count: shareCount || 0,
      download_count: downloadCount || 0
    }
  } catch (error) {
    console.error("Error fetching dataset counts:", error)
    return {
      view_count: 0,
      like_count: 0,
      comment_count: 0,
      share_count: 0,
      download_count: 0
    }
  }
}

// Track dataset view
export const trackDatasetView = async (datasetId: string): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const deviceInfo: DeviceInfo = getDeviceInfo()
    const sessionId = getSessionId()

    let isUnique = true

    if (user?.id) {
      const { data: existingView } = await supabase
        .from("dataset_views")
        .select("id")
        .eq("dataset_id", datasetId)
        .eq("user_id", user.id)
        .gte("viewed_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .limit(1)

      isUnique = !existingView || existingView.length === 0
    } else if (sessionId) {
      const { data: existingView } = await supabase
        .from("dataset_views")
        .select("id")
        .eq("dataset_id", datasetId)
        .eq("session_id", sessionId)
        .gte("viewed_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .limit(1)

      isUnique = !existingView || existingView.length === 0
    }

    const { error } = await supabase.from("dataset_views").insert({
      dataset_id: datasetId,
      user_id: user?.id || null,
      device: deviceInfo.device,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      referrer: typeof document !== "undefined" ? document.referrer : null,
      session_id: sessionId,
      is_unique: isUnique,
    })

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error tracking dataset view:", error)
    return false
  }
}

// Like a dataset
export const likeDataset = async (datasetId: string): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User must be logged in to like a dataset")
    }

    const { data: existingLike, error: checkError } = await supabase
      .from("dataset_likes")
      .select("id")
      .eq("dataset_id", datasetId)
      .eq("user_id", user.id)
      .single()

    if (checkError && checkError.code !== "PGRST116") throw checkError

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from("dataset_likes")
        .delete()
        .eq("id", existingLike.id)

      if (deleteError) throw deleteError
      return false // Like removed
    } else {
      const { error } = await supabase.from("dataset_likes").insert({
        dataset_id: datasetId,
        user_id: user.id,
      })

      if (error) throw error
      return true // Like added
    }
  } catch (error) {
    console.error("Error liking dataset:", error)
    throw error
  }
}

// Check if user has liked a dataset
export const hasUserLikedDataset = async (datasetId: string): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return false

    const { data, error } = await supabase
      .from("dataset_likes")
      .select("id")
      .eq("dataset_id", datasetId)
      .eq("user_id", user.id)
      .single()

    if (error && error.code !== "PGRST116") throw error

    return !!data
  } catch (error) {
    console.error("Error checking if user liked dataset:", error)
    return false
  }
}

// Add a comment to a dataset
export const addComment = async (
  datasetId: string,
  content: string,
  parentCommentId?: string
): Promise<CommentData> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User must be logged in to comment")
    }

    const { data: commentData, error } = await supabase
      .from("dataset_comments")
      .insert({
        dataset_id: datasetId,
        user_id: user.id,
        parent_comment_id: parentCommentId || null,
        content: content,
        is_edited: false,
        is_deleted: false,
      })
      .select()
      .single()

    if (error) throw error

    const { data: userInfo, error: userError } = await supabase
      .from("userinfo")
      .select("firstname, lastname, username")
      .eq("user_id", user.id)
      .single()

    if (userError) throw userError

    return {
      ...commentData,
      userinfo: userInfo || { firstname: "Unknown", lastname: "User", username: "unknown" },
    } as CommentData
  } catch (error) {
    console.error("Error adding comment:", error)
    throw error
  }
}

// Get comments for a dataset
export const getDatasetComments = async (datasetId: string): Promise<CommentData[]> => {
  try {
    const { data: comments, error } = await supabase
      .from("dataset_comments")
      .select("*")
      .eq("dataset_id", datasetId)
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })

    if (error) throw error

    if (!comments || comments.length === 0) return []

    const userIds = Array.from(new Set(comments.map((comment) => comment.user_id)))
    const { data: userInfos, error: userError } = await supabase
      .from("userinfo")
      .select("user_id, firstname, lastname, username")
      .in("user_id", userIds)

    if (userError) throw userError

    const commentsWithUserInfo = comments.map((comment) => {
      const userInfo = userInfos?.find((info) => info.user_id === comment.user_id)
      return {
        ...comment,
        userinfo: userInfo || { firstname: "Unknown", lastname: "User", username: "unknown" },
      }
    }) as CommentData[]

    return commentsWithUserInfo
  } catch (error) {
    console.error("Error getting dataset comments:", error)
    throw error
  }
}

// Track dataset download
export const trackDatasetDownload = async (
  datasetId: string,
  downloadType = "full",
  fileFormat = "csv"
): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const deviceInfo: DeviceInfo = getDeviceInfo()

    const { error } = await supabase.from("dataset_downloads").insert({
      dataset_id: datasetId,
      user_id: user?.id || null,
      device: deviceInfo.device,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      download_type: downloadType,
      file_format: fileFormat,
    })

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error tracking dataset download:", error)
    return false
  }
}

// Share a dataset
export const shareDataset = async (
  datasetId: string,
  shareMethod: string,
  recipientEmail?: string
): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from("dataset_shares").insert({
      dataset_id: datasetId,
      user_id: user?.id || null,
      share_method: shareMethod,
      recipient_email: recipientEmail || null,
    })

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error sharing dataset:", error)
    return false
  }
}

// Rate a dataset
export const rateDataset = async (
  datasetId: string,
  rating: number,
  reviewText?: string
): Promise<boolean> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User must be logged in to rate a dataset")
    }

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5")
    }

    const { data: existingRating, error: checkError } = await supabase
      .from("dataset_ratings")
      .select("id")
      .eq("dataset_id", datasetId)
      .eq("user_id", user.id)
      .single()

    if (checkError && checkError.code !== "PGRST116") throw checkError

    if (existingRating) {
      const { error } = await supabase
        .from("dataset_ratings")
        .update({
          rating,
          review_text: reviewText || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingRating.id)

      if (error) throw error
    } else {
      const { error } = await supabase.from("dataset_ratings").insert({
        dataset_id: datasetId,
        user_id: user.id,
        rating,
        review_text: reviewText || null,
      })

      if (error) throw error
    }

    return true
  } catch (error) {
    console.error("Error rating dataset:", error)
    return false
  }
}

// Get user's rating for a dataset
export const getUserDatasetRating = async (datasetId: string): Promise<number | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data, error } = await supabase
      .from("dataset_ratings")
      .select("rating")
      .eq("dataset_id", datasetId)
      .eq("user_id", user.id)
      .single()

    if (error && error.code !== "PGRST116") throw error

    return data ? data.rating : null
  } catch (error) {
    console.error("Error getting user dataset rating:", error)
    return null
  }
}

export default {
  getDatasetCounts,
  trackDatasetView,
  likeDataset,
  hasUserLikedDataset,
  addComment,
  getDatasetComments,
  trackDatasetDownload,
  shareDataset,
  rateDataset,
  getUserDatasetRating,
}