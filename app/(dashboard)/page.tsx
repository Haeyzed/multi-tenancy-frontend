"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  useErrorLogs,
  useInvoices,
  useSubscriptions,
  useSupportTickets,
  useTenants,
  useUsers,
} from "@/lib/api/central/hooks"
import { formatCurrency } from "@/lib/format"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

export default function DashboardPage() {
  const tenants = useTenants.useList({ per_page: 5 })
  const subscriptions = useSubscriptions.useList({ per_page: 5 })
  const invoices = useInvoices.useList({ per_page: 5 })
  const tickets = useSupportTickets.useList({ per_page: 5 })
  const users = useUsers.useList({ per_page: 1 })
  const errors = useErrorLogs.useList({ per_page: 5 })

  const stats = [
    {
      label: "Tenants",
      value: tenants.data?.meta.total,
      loading: tenants.isLoading,
    },
    {
      label: "Subscriptions",
      value: subscriptions.data?.meta.total,
      loading: subscriptions.isLoading,
    },
    {
      label: "Invoices",
      value: invoices.data?.meta.total,
      loading: invoices.isLoading,
    },
    {
      label: "Open tickets",
      value: tickets.data?.meta.total,
      loading: tickets.isLoading,
    },
    {
      label: "Admin users",
      value: users.data?.meta.total,
      loading: users.isLoading,
    },
    {
      label: "Error logs",
      value: errors.data?.meta.total,
      loading: errors.isLoading,
    },
  ]

  const chartData = (tenants.data?.data ?? []).map((tenant) => ({
    name: tenant.slug,
    status: tenant.status === "active" ? 1 : 0,
  }))

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Platform overview and key metrics at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stat.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-semibold tracking-tight">{stat.value ?? 0}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent tenants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tenants.isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              tenants.data?.data.map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{tenant.name}</p>
                    <p className="text-sm text-muted-foreground">{tenant.domain}</p>
                  </div>
                  <StatusBadge status={tenant.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices.isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              invoices.data?.data.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{invoice.invoice_number}</p>
                    <p className="text-sm text-muted-foreground">{invoice.tenant_id}</p>
                  </div>
                  <div className="text-end">
                    <StatusBadge status={invoice.status} />
                    <p className="mt-1 text-sm font-medium">
                      {formatCurrency(invoice.amount_due, invoice.currency)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {chartData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Tenant activity snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[240px] w-full"
              config={{ status: { label: "Active", color: "var(--chart-1)" } }}
            >
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="status" fill="var(--color-status)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
