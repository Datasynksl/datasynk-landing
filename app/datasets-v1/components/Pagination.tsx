import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center gap-2">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`} className="px-3 py-1 border rounded">
          Previous
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`px-3 py-1 border rounded ${
            page === currentPage ? "bg-gray-200" : ""
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`} className="px-3 py-1 border rounded">
          Next
        </Link>
      )}
    </div>
  )
}