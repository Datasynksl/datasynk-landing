"use client"

import React from 'react'
import { Pagination } from "@heroui/react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const DatasetPagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination 
        color="primary"
        page={currentPage}
        total={totalPages}
        onChange={(page) => onPageChange(page)}
        showControls
        isCompact
        className="mx-auto"
      />
      <p className="text-small text-default-500">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}

export default DatasetPagination
