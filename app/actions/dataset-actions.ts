"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function createDataset(formData: FormData) {
  try {
    const supabase = createClient()

    // Get form data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    const parametersJson = formData.get("parameters") as string
    const sampleDataJson = formData.get("sampleData") as string
    const fileType = formData.get("fileType") as string

    // Parse JSON data
    const parameters = JSON.parse(parametersJson)
    const sampleData = JSON.parse(sampleDataJson)

    // Get the file
    const file = formData.get("file") as File

    if (!file || !name || !description || !fileType) {
      return { success: false, error: "Missing required fields" }
    }

    // Create a unique file name
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`

    // Upload file to Supabase Storage
    const { data: fileData, error: uploadError } = await supabase.storage.from("datasets").upload(fileName, file, {
      // cacheControl: "3600",
      // upsert: false,
    })

    if (uploadError) {
      console.error("Error uploading file:", uploadError)
      return { success: false, error: "Failed to upload file" }
    }

    // Create dataset record in the database
    const { data: dataset, error: datasetError } = await supabase
      .from("datasets")
      .insert({
        name,
        description,
        file_path: fileName,
        file_type: fileType,
        size: file.size,
        parameters,
        sample_data: sampleData,
        tags,
        created_at: new Date().toISOString(),
      })
      .select()

    if (datasetError) {
      console.error("Error creating dataset:", datasetError)

      // Try to clean up the uploaded file
      await supabase.storage.from("datasets").remove([fileName])

      return { success: false, error: "Failed to create dataset record" }
    }

    // Revalidate the datasets page
    revalidatePath("/datasets")

    return { success: true, datasetId: dataset[0].id }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

