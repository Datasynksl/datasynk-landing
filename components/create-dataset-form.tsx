"use client"

import type React from "react"
import { useState, useRef, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { createDataset } from "@/app/actions/dataset-actions"
import { Button, Card, Input, Textarea } from "@heroui/react"
import { AlertCircle, FileJson, FileSpreadsheet, Upload } from "lucide-react"

export function CreateDatasetForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("preview")

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<"json" | "csv">("json")
  const [filePreview, setFilePreview] = useState<any>(null)
  const [parameters, setParameters] = useState<Record<string, any>>({})
  const [sampleData, setSampleData] = useState<any>(null)

  // Handle file upload
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Determine file type
    const fileType = selectedFile.name.endsWith(".json") ? "json" : "csv"
    setFileType(fileType)

    try {
      // Read file content
      const text = await selectedFile.text()

      if (fileType === "json") {
        const jsonData = JSON.parse(text)

        // Extract sample data
        const sampleData = Array.isArray(jsonData) ? jsonData.slice(0, 5) : jsonData
        setSampleData(sampleData)
        setFilePreview(sampleData)

        // Extract parameters
        const extractedParams: Record<string, any> = {}
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          Object.keys(jsonData[0]).forEach((key) => {
            const value = jsonData[0][key]
            extractedParams[key] = {
              type: typeof value,
              description: `${key} field`,
            }
          })
        } else if (typeof jsonData === "object") {
          Object.keys(jsonData).forEach((key) => {
            const value = jsonData[key]
            extractedParams[key] = {
              type: typeof value,
              description: `${key} field`,
            }
          })
        }
        setParameters(extractedParams)
      } else if (fileType === "csv") {
        // Simple CSV parsing
        const lines = text.split("\n")
        const headers = lines[0].split(",").map((h) => h.trim())

        const parsedData = lines.slice(1, 6).map((line) => {
          const values = line.split(",")
          const row: Record<string, string> = {}

          headers.forEach((header, index) => {
            row[header] = values[index]?.trim() || ""
          })

          return row
        })

        setSampleData(parsedData)
        setFilePreview(parsedData)

        // Extract parameters
        const extractedParams: Record<string, any> = {}
        headers.forEach((header) => {
          extractedParams[header] = {
            type: "string",
            description: `${header} field`,
          }
        })
        setParameters(extractedParams)
      }
    } catch (error) {
      console.error("Error parsing file:", error)
      setError("Failed to parse file. Please ensure it is a valid JSON or CSV file.")
    }
  }

  // Handle parameter description update
  const handleParameterDescriptionChange = (key: string, description: string) => {
    setParameters((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        description,
      },
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !name || !description) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("tags", tags)
      formData.append("file", file)
      formData.append("fileType", fileType)
      formData.append("parameters", JSON.stringify(parameters))
      formData.append("sampleData", JSON.stringify(sampleData))

      const result = await createDataset(formData)

      if (result.success) {
        // Redirect to the dataset page
        router.push(`/datasets/${result.datasetId}`)
      } else {
        setError(result.error || "Failed to create dataset")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Navigate between steps
  const goToNextStep = () => {
    if (currentStep === 1 && (!name || !description || !file)) {
      setError("Please fill in all required fields")
      return
    }

    setError(null)
    setCurrentStep((prev) => prev + 1)
  }

  const goToPreviousStep = () => {
    setError(null)
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Dataset Name *</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter dataset name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter dataset description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. finance, statistics, public"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Dataset File (JSON or CSV) *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              {file ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    {fileType === "json" ? (
                      <FileJson className="h-8 w-8 text-blue-500" />
                    ) : (
                      <FileSpreadsheet className="h-8 w-8 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  <Button
                    type="button"
                    variant="bordered"
                    size="sm"
                    onClick={() => {
                      setFile(null)
                      setFilePreview(null)
                      setParameters({})
                      setSampleData(null)
                    }}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-500">Supports JSON and CSV files</p>
                  <Input id="file" type="file" accept=".json,.csv" onChange={handleFileChange} className="hidden" />
                  <Button
                    type="button"
                    variant="bordered"
                    size="sm"
                    onClick={() => document.getElementById("file")?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={goToNextStep} disabled={!name || !description || !file}>
              Next: Preview & Parameters
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Data Preview & Parameters</h3>

          <div className="space-y-4">
            <div className="flex space-x-2 mb-4">
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === "preview" ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setActiveTab("preview")}
              >
                Data Preview
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === "parameters" ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"}`}
                onClick={() => setActiveTab("parameters")}
              >
                Parameters
              </button>
            </div>

            {activeTab === "preview" && (
              <Card>
                <div className="p-4">
                  {filePreview ? (
                    fileType === "json" ? (
                      <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                        {JSON.stringify(filePreview, null, 2)}
                      </pre>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {Object.keys(filePreview[0] || {}).map((header) => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filePreview.map((row: any, index: number) => (
                              <tr key={index}>
                                {Object.keys(row).map((key) => (
                                  <td key={`${index}-${key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {row[key]}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  ) : (
                    <p className="text-center py-4 text-gray-500">No preview available</p>
                  )}
                </div>
              </Card>
            )}

            {activeTab === "parameters" && (
              <Card>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-4">
                    These parameters were automatically extracted from your dataset. You can edit the descriptions to
                    provide more context.
                  </p>

                  {Object.keys(parameters).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(parameters).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                          <div>
                            <label htmlFor={`param-${key}`} className="block text-sm font-medium text-gray-700">
                              {key}
                            </label>
                            <p className="text-xs text-gray-500">Type: {(value as any).type}</p>
                          </div>
                          <div className="md:col-span-2">
                            <Textarea
                              id={`param-${key}`}
                              value={(value as any).description}
                              onChange={(e) => handleParameterDescriptionChange(key, e.target.value)}
                              placeholder={`Description for ${key}`}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">No parameters detected</p>
                  )}
                </div>
              </Card>
            )}
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="bordered" onClick={goToPreviousStep}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Dataset..." : "Create Dataset"}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}

