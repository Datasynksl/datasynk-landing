"use client"

import React, { useState } from "react"
import CategoryFilter from "./components/CategoryFilter"
import SearchBar from "./components/SearchBar"

export const metadata = {
  title: "Datasets | DataSynk",
  description: "Browse and access our open datasets",
}

// Hardcoded categories (you might want to fetch these from Supabase too)
const categories = ["All", "Science", "Technology", "Health", "Finance"] // Adjust based on your data

export default function DatasetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-screen bg-black-100 rounded-lg overflow-hidden">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category)
        }}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 md:p-6 space-y-4">
          <h1 className="text-2xl font-bold">Datasets</h1>
          <SearchBar
            onSearch={(query) => {
              setSearchQuery(query)
            }}
          />
        </div>
        {/* Pass category and search query to children (page.tsx) */}
        {React.cloneElement(children as React.ReactElement, {
          selectedCategory,
          searchQuery,
        })}
      </main>
    </div>
  )
}