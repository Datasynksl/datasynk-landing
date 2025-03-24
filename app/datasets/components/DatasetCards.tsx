"use client"

import type { Dataset } from "../../api/data/datasets"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react"

type DatasetCardProps = {
  dataset: Dataset
}

export default function DatasetCard({ dataset }: DatasetCardProps) {
  const Icon = dataset.icon

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 group h-full"
      style={{ 
        backgroundColor: `${dataset.color}10`,
        borderColor: `${dataset.color}30`
      }}
    >
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: `${dataset.color}20` }}
          >
            <Icon
            //   className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
            //   style={{ color: dataset.color }}
            />
          </div>
          <h3 className="font-semibold text-sm">{dataset.name}</h3>
        </div>
      </CardHeader>
      
      <CardBody>
        <p className="text-xs text-gray-500 line-clamp-3">
          {dataset.description.length > 150
            ? `${dataset.description.substring(0, 150)}...`
            : dataset.description}
        </p>
      </CardBody>
      
      <CardFooter>
        <span 
          className="text-xs px-2 py-1 rounded-full" 
          style={{ 
            backgroundColor: `${dataset.color}20`, 
            color: dataset.color 
          }}
        >
          {dataset.category}
        </span>
      </CardFooter>
    </Card>
  )
}
