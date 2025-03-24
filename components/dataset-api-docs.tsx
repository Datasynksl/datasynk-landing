"use client"
import { Card, Tabs } from "@heroui/react"
import { useState } from "react"

interface ApiDocsProps {
  datasetId: string
  datasetName: string
  parameters: Record<string, any> | null
  fileType: string
}

export function DatasetApiDocs({ datasetId, datasetName, parameters, fileType }: ApiDocsProps) {
  const [activeTab, setActiveTab] = useState("curl")
  const baseUrl = typeof window !== "undefined" ? `${window.location.origin}/api/datasets` : "/api/datasets"

  const endpointUrl = `${baseUrl}/${datasetId}`
  const dataEndpointUrl = `${baseUrl}/${datasetId}/data`

  const getCodeSnippet = (lang: "curl" | "javascript" | "python") => {
    switch (lang) {
      case "curl":
        return `# Get dataset metadata
curl "${endpointUrl}"

# Get dataset data
curl "${dataEndpointUrl}"

# Get dataset data with pagination
curl "${dataEndpointUrl}?limit=10&offset=0"

# Get dataset data in CSV format
curl "${dataEndpointUrl}?format=csv" --output ${datasetName.toLowerCase().replace(/\s+/g, "_")}.csv`

      case "javascript":
        return `// Get dataset metadata
async function getDatasetMetadata() {
  const response = await fetch("${endpointUrl}");
  const data = await response.json();
  console.log(data);
}

// Get dataset data
async function getDatasetData() {
  const response = await fetch("${dataEndpointUrl}");
  const data = await response.json();
  console.log(data);
}

// Get dataset data with pagination
async function getDatasetDataWithPagination(limit = 10, offset = 0) {
  const response = await fetch(
    \`${dataEndpointUrl}?limit=\${limit}&offset=\${offset}\`
  );
  const data = await response.json();
  console.log(data);
}`

      case "python":
        return `import requests

# Get dataset metadata
def get_dataset_metadata():
    response = requests.get("${endpointUrl}")
    data = response.json()
    print(data)

# Get dataset data
def get_dataset_data():
    response = requests.get("${dataEndpointUrl}")
    data = response.json()
    print(data)

# Get dataset data with pagination
def get_dataset_data_with_pagination(limit=10, offset=0):
    response = requests.get(
        f"${dataEndpointUrl}?limit={limit}&offset={offset}"
    )
    data = response.json()
    print(data)

# Download dataset as CSV
def download_dataset_csv():
    response = requests.get("${dataEndpointUrl}?format=csv")
    with open("${datasetName.toLowerCase().replace(/\s+/g, "_")}.csv", "wb") as f:
        f.write(response.content)`

      default:
        return ""
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
        <p className="mb-4">
          Use our RESTful API to access this dataset programmatically. The API provides endpoints to retrieve metadata
          about the dataset and to query the actual data.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Endpoints</h3>

        <Card>
          <div className="p-4">
            <h4 className="font-bold mb-2">GET {endpointUrl}</h4>
            <p className="text-sm text-gray-600 mb-2">
              Returns metadata about the dataset, including its structure and parameters.
            </p>
            <div className="text-sm">
              <strong>Response format:</strong> JSON
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h4 className="font-bold mb-2">GET {dataEndpointUrl}</h4>
            <p className="text-sm text-gray-600 mb-2">Returns the actual dataset data.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Query Parameters:</strong>
                <ul className="list-disc list-inside mt-1 ml-2">
                  <li>
                    <code>limit</code> - Number of records to return (default: 100)
                  </li>
                  <li>
                    <code>offset</code> - Number of records to skip (default: 0)
                  </li>
                  <li>
                    <code>format</code> - Response format: json or csv (default: json)
                  </li>
                </ul>
              </div>
              <div>
                <strong>Response format:</strong> JSON or CSV
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Code Examples</h3>

        <Tabs>
          <div className="flex space-x-2 mb-4">
            <button className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200" onClick={() => setActiveTab("curl")}>
              cURL
            </button>
            <button className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200" onClick={() => setActiveTab("javascript")}>
              JavaScript
            </button>
            <button className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200" onClick={() => setActiveTab("python")}>
              Python
            </button>
          </div>

          {activeTab === "curl" && (
            <Card>
              <div className="p-4">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                  {getCodeSnippet("curl")}
                </pre>
              </div>
            </Card>
          )}

          {activeTab === "javascript" && (
            <Card>
              <div className="p-4">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                  {getCodeSnippet("javascript")}
                </pre>
              </div>
            </Card>
          )}

          {activeTab === "python" && (
            <Card>
              <div className="p-4">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                  {getCodeSnippet("python")}
                </pre>
              </div>
            </Card>
          )}
        </Tabs>
      </div>

      {parameters && Object.keys(parameters).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Dataset Parameters</h3>
          <p>This dataset contains the following parameters that you can use to understand the data structure:</p>

          <Card>
            <div className="p-4">
              <ul className="space-y-2">
                {Object.entries(parameters).map(([key, value]) => (
                  <li key={key} className="text-sm">
                    <strong>{key}</strong>: {(value as any).description || "No description available"}
                    <span className="text-gray-500 ml-1">({(value as any).type || "string"})</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Response Schema</h3>

        <Card>
          <div className="p-4">
            <h4 className="font-bold mb-2">Metadata Response</h4>
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
              {`{
  "id": "${datasetId}",
  "name": "${datasetName}",
  "description": "Dataset description",
  "file_type": "${fileType}",
  "parameters": ${JSON.stringify(parameters || {}, null, 2)},
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z",
  "file_url": "https://example.com/dataset.${fileType}",
  "sample_data": [...]
}`}
            </pre>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h4 className="font-bold mb-2">Data Response</h4>
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
              {`{
  "data": [...],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 1000
  }
}`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  )
}

