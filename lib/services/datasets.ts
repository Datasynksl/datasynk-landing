import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

export const getDataset = async (id: string) => {
  try {
    // Fetch the dataset
    const { data, error } = await supabase.from("datasets").select("*").eq("id", id).single()

    if (error) throw error
    if (!data) throw new Error("Dataset not found")

    // Update all metrics to ensure they're accurate
    await supabase.rpc("update_all_dataset_metrics", { dataset_id: id })

    // Fetch the dataset again with updated metrics
    const { data: refreshedData, error: refreshError } = await supabase
      .from("datasets")
      .select("*")
      .eq("id", id)
      .single()

    if (refreshError) throw refreshError
    if (!refreshedData) throw new Error("Dataset not found after refresh")

    // Ensure all count fields have default values
    return {
      ...refreshedData,
      view_count: refreshedData.view_count || 0,
      like_count: refreshedData.like_count || 0,
      comment_count: refreshedData.comment_count || 0,
      download_count: refreshedData.download_count || 0,
      share_count: refreshedData.share_count || 0,
    }
  } catch (error) {
    console.error("Error fetching dataset:", error)
    throw error
  }
}

export const getDatasets = async () => {
  try {
    const { data, error } = await supabase.from("datasets").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error fetching datasets:", error)
    throw error
  }
}

