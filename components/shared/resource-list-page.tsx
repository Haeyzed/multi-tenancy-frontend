"use client"

import type { ReactNode } from "react"
import { parseAsInteger, useQueryState } from "nuqs"
import { toast } from "sonner"

import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import {
  TablePagination,
  usePaginationParams,
} from "@/components/shared/table-pagination"
import { Card, CardContent } from "@/components/ui/card"
import type { ColumnDef } from "@tanstack/react-table"
import type { PaginatedResponse } from "@/lib/api/central/types"
import type { UseQueryResult } from "@tanstack/react-query"

interface ResourceListPageProps<T> {
  title: string
  description?: string
  columns: ColumnDef<T, unknown>[]
  query: UseQueryResult<PaginatedResponse<T>, Error>
  actions?: ReactNode
  emptyMessage?: string
}

export function ResourceListPage<T>({
  title,
  description,
  columns,
  query,
  actions,
  emptyMessage,
}: ResourceListPageProps<T>) {
  const { data, isLoading, isError, error } = query

  if (isError) {
    toast.error(error.message)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <PageHeader title={title} description={description} actions={actions} />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <DataTable
            columns={columns}
            data={data?.data ?? []}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
          {data?.meta ? <TablePagination meta={data.meta} /> : null}
        </CardContent>
      </Card>
    </div>
  )
}

export function useListQueryParams() {
  const { page, per_page } = usePaginationParams()
  return { page, per_page }
}
