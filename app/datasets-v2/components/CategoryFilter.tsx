"use client"

import React from 'react'
import { Button } from "@heroui/react"

type CategoryFilterProps = {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  return (
    <aside className="w-48 bg-black-200 shadow-md flex flex-col h-screen rounded-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-white">Categories</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="space-y-1 p-4 pt-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "solid" : "ghost"}
              color={selectedCategory === category ? "primary" : "default"}
              onClick={() => onSelectCategory(category)}
              className="whitespace-nowrap w-full justify-start text-sm py-1 px-2 h-auto"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  )
}
