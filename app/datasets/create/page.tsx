"use client"

import Link from "next/link"
import { CreateDatasetForm } from "@/components/create-dataset-form"

const metadata = {
  title: "Create Dataset | DataSynk",
  description: "Upload a new dataset to the DataSynk platform",
}

export default function CreateDatasetPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/datasets" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
          ← Back to Datasets
        </Link>
        <h1 className="text-4xl font-bold mb-4">Create New Dataset</h1>
        <p className="text-lg text-gray-600">
          Upload a dataset file and provide metadata to make it available through the API.
        </p>
      </div>

      <div className="max-w-3xl">
        <CreateDatasetForm />
      </div>
    </div>
  )
}

