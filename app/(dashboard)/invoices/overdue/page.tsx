"use client"

import {
  ResourceListPage,
  useListQueryParams,
} from "@/components/shared/resource-list-page"
import { useOverdueInvoices } from "@/lib/api/central/hooks"
import { invoiceColumns } from "@/lib/columns"

export default function OverdueInvoicesPage() {
  const params = useListQueryParams()
  const query = useOverdueInvoices(params)

  return (
    <ResourceListPage
      title="Overdue invoices"
      description="Invoices past their due date."
      columns={invoiceColumns}
      query={query}
      emptyMessage="No overdue invoices."
    />
  )
}
