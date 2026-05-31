"use client"

import { parseAsInteger, useQueryState } from "nuqs"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { PaginationMeta } from "@/lib/api/central/types"

interface TablePaginationProps {
  meta: PaginationMeta
}

export function TablePagination({ meta }: TablePaginationProps) {
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1)
  const visiblePages = pages.filter(
    (p) =>
      p === 1 ||
      p === meta.last_page ||
      Math.abs(p - meta.current_page) <= 1,
  )

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing page {meta.current_page} of {meta.last_page} ({meta.total} total)
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (meta.current_page > 1) void setPage(meta.current_page - 1)
              }}
              className={
                meta.current_page <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {visiblePages.map((page, index) => {
            const prev = visiblePages[index - 1]
            const showEllipsis = prev != null && page - prev > 1
            return (
              <span key={page} className="flex items-center gap-1">
                {showEllipsis ? (
                  <PaginationItem>
                    <span className="px-2 text-muted-foreground">…</span>
                  </PaginationItem>
                ) : null}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={page === meta.current_page}
                    onClick={(e) => {
                      e.preventDefault()
                      void setPage(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </span>
            )
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (meta.current_page < meta.last_page) {
                  void setPage(meta.current_page + 1)
                }
              }}
              className={
                meta.current_page >= meta.last_page
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export function usePaginationParams() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1))
  const [perPage] = useQueryState("per_page", parseAsInteger.withDefault(15))
  return { page, per_page: perPage }
}
