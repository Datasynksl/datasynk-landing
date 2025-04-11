import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Dark theme

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  datasetId: string;
}

export default function RequestModal({ isOpen, onClose, datasetId }: RequestModalProps) {
  const [requestType, setRequestType] = useState<"GET" | "POST">("GET");
  const [codeLanguage, setCodeLanguage] = useState<"python" | "javascript" | "c" | "go">("python");

  const requestUrl = `http://localhost:3000/api/datasets/${datasetId}`;

  const codeSnippets = {
    python: {
      GET: `import requests\n\nurl = "${requestUrl}"\nheaders = {"Authorization": "Bearer <your_token>"}\nresponse = requests.get(url, headers=headers)\nprint(response.json())`,
      POST: `import requests\n\nurl = "${requestUrl}"\nheaders = {"Authorization": "Bearer <your_token>"}\ndata = {\n    "name": "New Plant",\n    "id": 123,\n    "tag": "type"\n}\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json())`,
    },
    javascript: {
      GET: `fetch("${requestUrl}", {\n  headers: {\n    "Authorization": "Bearer <your_token>"\n  }\n})\n  .then(response => response.json())\n  .then(data => console.log(data));`,
      POST: `fetch("${requestUrl}", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer <your_token>",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    name: "New Plant",\n    id: 123,\n    tag: "type"\n  })\n})\n  .then(response => response.json())\n  .then(data => console.log(data));`,
    },
    c: {
      GET: `#include <curl/curl.h>\n\nCURL *curl = curl_easy_init();\nif(curl) {\n  curl_easy_setopt(curl, CURLOPT_URL, "${requestUrl}");\n  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, "Authorization: Bearer <your_token>");\n  CURLcode res = curl_easy_perform(curl);\n  curl_easy_cleanup(curl);\n}`,
      POST: `#include <curl/curl.h>\n\nCURL *curl = curl_easy_init();\nif(curl) {\n  curl_easy_setopt(curl, CURLOPT_URL, "${requestUrl}");\n  curl_easy_setopt(curl, CURLOPT_POST, 1L);\n  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, "Authorization: Bearer <your_token>");\n  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{\\"name\\":\\"New Plant\\",\\"id\\":123,\\"tag\\":\\"type\\"}");\n  CURLcode res = curl_easy_perform(curl);\n  curl_easy_cleanup(curl);\n}`,
    },
    go: {
      GET: `package main\n\nimport (\n  "net/http"\n  "io/ioutil"\n)\n\nfunc main() {\n  req, _ := http.NewRequest("GET", "${requestUrl}", nil)\n  req.Header.Set("Authorization", "Bearer <your_token>")\n  client := &http.Client{}\n  resp, _ := client.Do(req)\n  body, _ := ioutil.ReadAll(resp.Body)\n  println(string(body))\n}`,
      POST: `package main\n\nimport (\n  "net/http"\n  "strings"\n)\n\nfunc main() {\n  jsonData := strings.NewReader(\`{"name":"New Plant","id":123,"tag":"type"}\`)\n  req, _ := http.NewRequest("POST", "${requestUrl}", jsonData)\n  req.Header.Set("Authorization", "Bearer <your_token>")\n  req.Header.Set("Content-Type", "application/json")\n  client := &http.Client{}\n  resp, _ := client.Do(req)\n  body, _ := ioutil.ReadAll(resp.Body)\n  println(string(body))\n}`,
    },
  };

  // POST request body for the Usage Guide
  const postRequestBody = `{
  "name": "string (required)",
  "id": "integer (required)",
  "tag": "string"
}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="bg-black-100 text-white max-w-2xl">
        <ModalHeader className="border-b border-gray-700">
          <h2 className="text-xl font-bold">API Usage Guide</h2>
        </ModalHeader>
        <ModalBody className="py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Request URL</h3>
              <div className="bg-gray-900 p-2 rounded">
                <code className="text-sm">{requestUrl}</code>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Request Type</h3>
              <div className="flex gap-2">
                <Button
                  variant={requestType === "GET" ? "default" : "outline"}
                  onClick={() => setRequestType("GET")}
                  className="flex-1"
                >
                  GET
                </Button>
                <Button
                  variant={requestType === "POST" ? "default" : "outline"}
                  onClick={() => setRequestType("POST")}
                  className="flex-1"
                >
                  POST
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Usage Guide</h3>
              <div className="bg-gray-900 p-4 rounded text-sm">
                {requestType === "GET" ? (
                  <div>
                    <p>
                      <strong>GET /plants</strong>
                    </p>
                    <p>Returns all plants the user has access to</p>
                    <p className="mt-2">
                      <strong>Authorization:</strong>
                    </p>
                    <p>
                      Bearer authentication header: <code>Bearer &lt;token&gt;</code>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>POST /plants</strong>
                    </p>
                    <p>Creates a new plant in the store</p>
                    <p className="mt-2">
                      <strong>Authorization:</strong>
                    </p>
                    <p>
                      Bearer authentication header: <code>Bearer &lt;token&gt;</code>
                    </p>
                    <p className="mt-2">
                      <strong>Body:</strong>
                    </p>
                    <SyntaxHighlighter
                      language="json"
                      style={dracula}
                      customStyle={{
                        margin: 0,
                        padding: 0,
                        background: "transparent",
                        fontSize: "0.75rem", // Matches text-xs
                      }}
                      wrapLines={true}
                      lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
                    >
                      {postRequestBody}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Code Examples</h3>
              <div className="flex gap-2 mb-4">
                {["python", "javascript", "c", "go"].map((lang) => (
                  <Button
                    key={lang}
                    variant={codeLanguage === lang ? "default" : "outline"}
                    onClick={() => setCodeLanguage(lang as any)}
                    className="flex-1 capitalize"
                  >
                    {lang}
                  </Button>
                ))}
              </div>
              <div className="bg-gray-900 p-4 rounded">
                <SyntaxHighlighter
                  language={codeLanguage}
                  style={dracula}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: "transparent",
                    fontSize: "0.75rem", // Matches text-xs
                  }}
                  wrapLines={true}
                  lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
                >
                  {codeSnippets[codeLanguage][requestType]}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="border-t border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}