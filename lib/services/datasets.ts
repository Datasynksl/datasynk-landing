"use server"

import { createClient } from "@/utils/supabase/server"

export async function getDatasets() {
  const supabase = createClient()
  

  const { data: datasets, error } = await supabase
    .from("datasets")
    .select("*")
    .order("created_at", { ascending: false })


  if (error) {
    console.error("Error fetching datasets:", error)
    throw new Error("Failed to fetch datasets")
  }

  return datasets
}

export async function getDataset(id: string) {
  const supabase = createClient()
  
  const { data: dataset, error } = await supabase
    .from("datasets")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching dataset:", error)
    throw new Error("Failed to fetch dataset")
  }

  if (!dataset) {
    throw new Error("Dataset not found")
  }

  return dataset
} 