"use client"

import React, { useState } from "react"
import CategoryFilter from "./components/CategoryFilter"
import SearchBar from "./components/SearchBar"

const metadata = {
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
    <div className="flex h-screen bg-black-100 rounded overflow-hidden">
      {/* <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category)
        }}
      /> */}
      <main className="flex-1 flex flex-col overflow-auto h-full max-h-auto">
        {/* Pass category and search query to children (page.tsx) */}
        {React.cloneElement(children as React.ReactElement, {
          selectedCategory,
          searchQuery,
        })}
      </main>
    </div>
  )
}