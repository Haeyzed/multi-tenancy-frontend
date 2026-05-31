import type { ColumnDef } from "@tanstack/react-table"

import { StatusBadge } from "@/components/shared/status-badge"
import { formatCurrency, formatDate, formatDateTime, truncate } from "@/lib/format"
import type {
  ActivityResource,
  ApiKeyResource,
  DomainResource,
  ErrorLogResource,
  InvoiceItemResource,
  InvoiceResource,
  PaymentMethodResource,
  PaymentResource,
  PermissionResource,
  PlanFeatureResource,
  PlanResource,
  PlatformAnnouncementResource,
  PlatformChangelogResource,
  RoleResource,
  SubscriptionEventResource,
  SubscriptionItemResource,
  SubscriptionResource,
  TenantConfigResource,
  TenantHealthCheckResource,
  TenantImpersonationTokenResource,
  TenantMetricResource,
  TenantResource,
  TenantSupportMessageResource,
  TenantSupportTicketResource,
  UsageRecordResource,
  UserResource,
} from "@/lib/api/central/types"

export const tenantColumns: ColumnDef<TenantResource>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "slug", header: "Slug" },
  { accessorKey: "domain", header: "Domain" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  { accessorKey: "owner_email", header: "Owner" },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
]

export const userColumns: ColumnDef<UserResource>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <StatusBadge status={row.original.role} />,
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
  },
  {
    accessorKey: "last_login_at",
    header: "Last login",
    cell: ({ row }) => formatDateTime(row.original.last_login_at),
  },
]

export const planColumns: ColumnDef<PlanResource>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "slug", header: "Slug" },
  { accessorKey: "tier", header: "Tier" },
  {
    accessorKey: "price_monthly",
    header: "Monthly",
    cell: ({ row }) => formatCurrency(row.original.price_monthly, row.original.currency),
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
  },
  {
    accessorKey: "is_public",
    header: "Public",
    cell: ({ row }) => (row.original.is_public ? "Yes" : "No"),
  },
]

export const subscriptionColumns: ColumnDef<SubscriptionResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  { accessorKey: "plan_id", header: "Plan" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  { accessorKey: "billing_cycle", header: "Cycle" },
  {
    accessorKey: "current_period_end",
    header: "Period end",
    cell: ({ row }) => formatDate(row.original.current_period_end),
  },
]

export const invoiceColumns: ColumnDef<InvoiceResource>[] = [
  { accessorKey: "invoice_number", header: "Number" },
  { accessorKey: "tenant_id", header: "Tenant" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "amount_due",
    header: "Due",
    cell: ({ row }) => formatCurrency(row.original.amount_due, row.original.currency),
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    cell: ({ row }) => formatDate(row.original.due_date),
  },
]

export const paymentColumns: ColumnDef<PaymentResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.original.amount, row.original.currency),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  { accessorKey: "payment_provider", header: "Provider" },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => formatDateTime(row.original.created_at),
  },
]

export const domainColumns: ColumnDef<DomainResource>[] = [
  { accessorKey: "domain", header: "Domain" },
  { accessorKey: "tenant_id", header: "Tenant" },
  {
    accessorKey: "is_primary",
    header: "Primary",
    cell: ({ row }) => (row.original.is_primary ? "Yes" : "No"),
  },
  {
    accessorKey: "verified",
    header: "Verified",
    cell: ({ row }) => <StatusBadge status={row.original.verified ? "verified" : "pending"} />,
  },
]

export const roleColumns: ColumnDef<RoleResource>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "guard_name", header: "Guard" },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
]

export const permissionColumns: ColumnDef<PermissionResource>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "module", header: "Module" },
  { accessorKey: "guard_name", header: "Guard" },
]

export const apiKeyColumns: ColumnDef<ApiKeyResource>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "tenant_id", header: "Tenant" },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
  },
  {
    accessorKey: "last_used_at",
    header: "Last used",
    cell: ({ row }) => formatDateTime(row.original.last_used_at),
  },
  {
    accessorKey: "expires_at",
    header: "Expires",
    cell: ({ row }) => formatDate(row.original.expires_at),
  },
]

export const supportTicketColumns: ColumnDef<TenantSupportTicketResource>[] = [
  { accessorKey: "subject", header: "Subject" },
  { accessorKey: "tenant_id", header: "Tenant" },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <StatusBadge status={row.original.priority} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
]

export const errorLogColumns: ColumnDef<ErrorLogResource>[] = [
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => <StatusBadge status={row.original.severity} />,
  },
  { accessorKey: "channel", header: "Channel" },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => truncate(row.original.message, 64),
  },
  {
    accessorKey: "occurred_at",
    header: "Occurred",
    cell: ({ row }) => formatDateTime(row.original.occurred_at),
  },
]

export const activityColumns: ColumnDef<ActivityResource>[] = [
  { accessorKey: "description", header: "Description" },
  { accessorKey: "event", header: "Event" },
  { accessorKey: "log_name", header: "Log" },
  {
    accessorKey: "created_at",
    header: "When",
    cell: ({ row }) => formatDateTime(row.original.created_at),
  },
]

export const announcementColumns: ColumnDef<PlatformAnnouncementResource>[] = [
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <StatusBadge status={row.original.type} />,
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
  },
  {
    accessorKey: "starts_at",
    header: "Starts",
    cell: ({ row }) => formatDate(row.original.starts_at),
  },
]

export const changelogColumns: ColumnDef<PlatformChangelogResource>[] = [
  { accessorKey: "version", header: "Version" },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <StatusBadge status={row.original.type} />,
  },
  {
    accessorKey: "is_published",
    header: "Published",
    cell: ({ row }) => (row.original.is_published ? "Yes" : "No"),
  },
]

export const healthCheckColumns: ColumnDef<TenantHealthCheckResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  { accessorKey: "check_type", header: "Check" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "checked_at",
    header: "Checked",
    cell: ({ row }) => formatDateTime(row.original.checked_at),
  },
]

export const metricColumns: ColumnDef<TenantMetricResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  {
    accessorKey: "metric_date",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.metric_date),
  },
  { accessorKey: "total_orders", header: "Orders" },
  { accessorKey: "total_revenue", header: "Revenue" },
  { accessorKey: "api_calls", header: "API calls" },
]

export const usageRecordColumns: ColumnDef<UsageRecordResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  { accessorKey: "metric", header: "Metric" },
  { accessorKey: "quantity", header: "Quantity" },
  {
    accessorKey: "recorded_at",
    header: "Recorded",
    cell: ({ row }) => formatDateTime(row.original.recorded_at),
  },
]

export const paymentMethodColumns: ColumnDef<PaymentMethodResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  { accessorKey: "provider", header: "Provider" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "last4", header: "Last 4" },
  {
    accessorKey: "is_default",
    header: "Default",
    cell: ({ row }) => (row.original.is_default ? "Yes" : "No"),
  },
]

export const invoiceItemColumns: ColumnDef<InvoiceItemResource>[] = [
  { accessorKey: "invoice_id", header: "Invoice" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "quantity", header: "Qty" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
]

export const planFeatureColumns: ColumnDef<PlanFeatureResource>[] = [
  { accessorKey: "plan_id", header: "Plan" },
  { accessorKey: "feature_key", header: "Key" },
  { accessorKey: "feature_value", header: "Value" },
  { accessorKey: "feature_type", header: "Type" },
]

export const subscriptionItemColumns: ColumnDef<SubscriptionItemResource>[] = [
  { accessorKey: "subscription_id", header: "Subscription" },
  { accessorKey: "plan_id", header: "Plan" },
  { accessorKey: "quantity", header: "Qty" },
  {
    accessorKey: "total_price",
    header: "Total",
    cell: ({ row }) => formatCurrency(row.original.total_price),
  },
]

export const subscriptionEventColumns: ColumnDef<SubscriptionEventResource>[] = [
  { accessorKey: "subscription_id", header: "Subscription" },
  {
    accessorKey: "event_type",
    header: "Event",
    cell: ({ row }) => <StatusBadge status={row.original.event_type} />,
  },
  { accessorKey: "triggered_by", header: "Triggered by" },
  {
    accessorKey: "created_at",
    header: "When",
    cell: ({ row }) => formatDateTime(row.original.created_at),
  },
]

export const tenantConfigColumns: ColumnDef<TenantConfigResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  { accessorKey: "key", header: "Key" },
  {
    accessorKey: "encrypted",
    header: "Encrypted",
    cell: ({ row }) => (row.original.encrypted ? "Yes" : "No"),
  },
]

export const supportMessageColumns: ColumnDef<TenantSupportMessageResource>[] = [
  { accessorKey: "ticket_id", header: "Ticket" },
  { accessorKey: "sender_type", header: "Sender" },
  {
    accessorKey: "body",
    header: "Message",
    cell: ({ row }) => truncate(row.original.body, 64),
  },
  {
    accessorKey: "is_read",
    header: "Read",
    cell: ({ row }) => (row.original.is_read ? "Yes" : "No"),
  },
]

export const impersonationTokenColumns: ColumnDef<TenantImpersonationTokenResource>[] = [
  { accessorKey: "tenant_id", header: "Tenant" },
  { accessorKey: "admin_id", header: "Admin" },
  {
    accessorKey: "expires_at",
    header: "Expires",
    cell: ({ row }) => formatDateTime(row.original.expires_at),
  },
  {
    accessorKey: "used_at",
    header: "Used",
    cell: ({ row }) => formatDateTime(row.original.used_at),
  },
]
