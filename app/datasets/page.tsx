import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DatasetGrid from "./components/DatasetGrid"
import Pagination from "./components/Pagination"
import { Dataset } from "@/types/dataset" // Assuming you have a type definition

const ITEMS_PER_PAGE = 30

interface DatasetsPageProps {
  selectedCategory: string
  searchQuery: string
}

// This is a server component by default
export default async function DatasetsPage({
  selectedCategory = "All",
  searchQuery = "",
  searchParams,
}: DatasetsPageProps & { searchParams?: { page?: string } }) {
  const supabase = createClient()

  // Get current page from search params (URL query) or default to 1
  const currentPage = Number(searchParams?.page) || 1
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  // Build the Supabase query
  let query = supabase
    .from("datasets")
    .select("*", { count: "exact" }) // Include count for pagination
    .order("created_at", { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1) // Pagination range

  // Apply category filter
  if (selectedCategory !== "All") {
    query = query.eq("category", selectedCategory)
  }

  // Apply search filter (assuming name and description are searchable fields)
  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
    )
  }

  const { data: datasets, error, count } = await query

  if (error) {
    console.error("Error fetching datasets:", error)
    return <div>Error loading datasets</div>
  }

  const totalDatasets = count || 0
  const totalPages = Math.ceil(totalDatasets / ITEMS_PER_PAGE)

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 md:px-6">
        {datasets && datasets.length > 0 ? (
          <DatasetGrid datasets={datasets as Dataset[]} />
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No datasets available</p>
            <Button asChild>
              <Link href="/datasets/create">Create Your First Dataset</Link>
            </Button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 md:p-6 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            // Pagination will use URL params instead of state
          />
        </div>
      )}
    </div>
  )
}