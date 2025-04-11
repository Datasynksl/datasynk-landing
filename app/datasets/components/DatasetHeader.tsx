import { useState } from 'react';
import { Button } from "@heroui/react";
import { Share2, Download, Star, Heart, Eye, MessageSquare } from "lucide-react";
import RequestModal from "./RequestModal";

interface DatasetHeaderProps {
  dataset: any;
  datasetId: string;
}

export default function DatasetHeader({ dataset, datasetId }: DatasetHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{dataset.name}</h1>
            <p className="text-muted-foreground mt-2">{dataset.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="flat"
              className="hover:bg-gray-300/20"
              size="sm"
              onClick={() => {
                // TODO: Implement share functionality
                console.log("Share clicked");
              }}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button
              variant="bordered"
              className="hover:bg-gray-300/20"
              size="sm"
              onClick={() => setIsModalOpen(true)} // Fixed typo: oonClick → onClick
            >
              Make a Request
            </Button>
            <Button
              variant="solid"
              className="bg-gray-300/50 hover:text-black-200"
              size="sm"
              onClick={() => {
                // TODO: Implement download functionality
                console.log("Download clicked");
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 mt-4">
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span>{dataset.avg_rating ? dataset.avg_rating.toFixed(1) : "No ratings"}</span>
          </div>
          <div className="flex items-center text-sm">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            <span>{dataset.like_count} Likes</span>
          </div>
          <div className="flex items-center text-sm">
            <Eye className="w-4 h-4 mr-1 text-blue-500" />
            <span>{dataset.view_count} Views</span>
          </div>
          <div className="flex items-center text-sm">
            <MessageSquare className="w-4 h-4 mr-1 text-green-500" />
            <span>{dataset.comment_count} Comments</span>
          </div>
          <div className="flex items-center text-sm">
            <Share2 className="w-4 h-4 mr-1 text-purple-500" />
            <span>{dataset.share_count} Shares</span>
          </div>
          <div className="flex items-center text-sm">
            <Download className="w-4 h-4 mr-1 text-gray-500" />
            <span>{dataset.download_count} Downloads</span>
          </div>
        </div>
      </div>
      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        datasetId={datasetId}
      />
    </div>
  );
}