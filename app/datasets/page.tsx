"use client"

import { useState, useMemo } from "react"
import { categories, datasets } from "../api/data/datasets"
import CategoryFilter from "./components/CategoryFilter"
import SearchBar from "./components/SearchBar"
import DatasetGrid from "./components/DatasetGrid"
import Pagination from "./components/Pagination"

const ITEMS_PER_PAGE = 30

export default function Dataset(){

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
  
    const filteredDatasets = useMemo(() => {
      return datasets.filter((dataset) => {
        const categoryMatch = selectedCategory === "All" || dataset.category === selectedCategory
        const searchMatch =
          dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.description.toLowerCase().includes(searchQuery.toLowerCase())
        return categoryMatch && searchMatch
      })
    }, [selectedCategory, searchQuery])
  
    const totalPages = Math.ceil(filteredDatasets.length / ITEMS_PER_PAGE)
    const paginatedDatasets = filteredDatasets.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    )



    return (
        <div className="flex h-screen bg-black-100 rounded-lg overflow-hidden">
        <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
            setSelectedCategory(category)
            setCurrentPage(1)
            }}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 md:p-6 space-y-4">
            <h1 className="text-2xl font-bold">Datasets</h1>
            <SearchBar
                onSearch={(query) => {
                setSearchQuery(query)
                setCurrentPage(1)
                }}
            />
            </div>
            <div className="flex-1 overflow-auto px-4 md:px-6">
            <DatasetGrid datasets={paginatedDatasets} />
            </div>
            <div className="p-4 md:p-6 border-t">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </main>
    </div>
    )

}