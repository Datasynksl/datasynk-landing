import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Dark theme

interface SampleDataProps {
  dataset: any;
  datasetId: string;
}

export default function SampleData({ dataset, datasetId }: SampleDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prepare the content to display
  const sampleDataContent =
    dataset.sample_data
      ? typeof dataset.sample_data === "object"
        ? JSON.stringify(dataset.sample_data, null, 2)
        : dataset.sample_data
      : "No sample data available";

  // Determine language for syntax highlighting
  const language = dataset.sample_data && typeof dataset.sample_data === "object" ? "json" : "text";

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Sample Data</h3>
      <Card className="bg-black-200">
        <CardContent className="pt-6">
          <div className="flex items-center mb-2">
            <Code className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Preview</span>
          </div>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
            <SyntaxHighlighter
              language={language}
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
              {sampleDataContent}
            </SyntaxHighlighter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}