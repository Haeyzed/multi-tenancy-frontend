import type { PaginationParams } from "@/lib/api/central/params"
import type { InvoiceStatus, TenantStatus } from "@/lib/api/central/enums"

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  activities: {
    all: ["activities"] as const,
    list: (params?: PaginationParams) => ["activities", "list", params] as const,
    detail: (id: string | number) => ["activities", "detail", id] as const,
  },
  apiKeys: {
    all: ["api-keys"] as const,
    list: (params?: PaginationParams) => ["api-keys", "list", params] as const,
    detail: (id: string | number) => ["api-keys", "detail", id] as const,
  },
  domains: {
    all: ["domains"] as const,
    list: (params?: PaginationParams) => ["domains", "list", params] as const,
    detail: (id: string | number) => ["domains", "detail", id] as const,
  },
  errorLogs: {
    all: ["error-logs"] as const,
    list: (params?: PaginationParams) => ["error-logs", "list", params] as const,
    detail: (id: string | number) => ["error-logs", "detail", id] as const,
  },
  invoices: {
    all: ["invoices"] as const,
    list: (params?: PaginationParams) => ["invoices", "list", params] as const,
    overdue: (params?: PaginationParams) => ["invoices", "overdue", params] as const,
    detail: (id: string | number) => ["invoices", "detail", id] as const,
  },
  invoiceItems: {
    all: ["invoice-items"] as const,
    list: (params?: PaginationParams) => ["invoice-items", "list", params] as const,
    detail: (id: string | number) => ["invoice-items", "detail", id] as const,
  },
  payments: {
    all: ["payments"] as const,
    list: (params?: PaginationParams) => ["payments", "list", params] as const,
    detail: (id: string | number) => ["payments", "detail", id] as const,
    config: ["payments", "config"] as const,
  },
  paymentMethods: {
    all: ["payment-methods"] as const,
    list: (params?: PaginationParams) => ["payment-methods", "list", params] as const,
    detail: (id: string | number) => ["payment-methods", "detail", id] as const,
  },
  permissions: {
    all: ["permissions"] as const,
    list: (params?: PaginationParams) => ["permissions", "list", params] as const,
    detail: (id: string | number) => ["permissions", "detail", id] as const,
  },
  plans: {
    all: ["plans"] as const,
    list: (params?: PaginationParams) => ["plans", "list", params] as const,
    public: ["plans", "public"] as const,
    detail: (id: string | number) => ["plans", "detail", id] as const,
  },
  planFeatures: {
    all: ["plan-features"] as const,
    list: (params?: PaginationParams) => ["plan-features", "list", params] as const,
    detail: (id: string | number) => ["plan-features", "detail", id] as const,
  },
  announcements: {
    all: ["announcements"] as const,
    list: (params?: PaginationParams) => ["announcements", "list", params] as const,
    detail: (id: string | number) => ["announcements", "detail", id] as const,
  },
  changelog: {
    all: ["changelog"] as const,
    list: (params?: PaginationParams) => ["changelog", "list", params] as const,
    detail: (id: string | number) => ["changelog", "detail", id] as const,
  },
  roles: {
    all: ["roles"] as const,
    list: (params?: PaginationParams) => ["roles", "list", params] as const,
    detail: (id: string | number) => ["roles", "detail", id] as const,
  },
  subscriptions: {
    all: ["subscriptions"] as const,
    list: (params?: PaginationParams) => ["subscriptions", "list", params] as const,
    detail: (id: string | number) => ["subscriptions", "detail", id] as const,
  },
  subscriptionEvents: {
    all: ["subscription-events"] as const,
    list: (params?: PaginationParams) =>
      ["subscription-events", "list", params] as const,
    detail: (id: string | number) => ["subscription-events", "detail", id] as const,
  },
  subscriptionItems: {
    all: ["subscription-items"] as const,
    list: (params?: PaginationParams) => ["subscription-items", "list", params] as const,
    detail: (id: string | number) => ["subscription-items", "detail", id] as const,
  },
  tenants: {
    all: ["tenants"] as const,
    list: (params?: PaginationParams) => ["tenants", "list", params] as const,
    byStatus: (status: TenantStatus, params?: PaginationParams) =>
      ["tenants", "status", status, params] as const,
    expiring: (days: number, params?: PaginationParams) =>
      ["tenants", "expiring", days, params] as const,
    features: (id: string) => ["tenants", "features", id] as const,
    detail: (id: string | number) => ["tenants", "detail", id] as const,
  },
  tenantConfigs: {
    all: ["tenant-configs"] as const,
    list: (params?: PaginationParams) => ["tenant-configs", "list", params] as const,
    detail: (id: string | number) => ["tenant-configs", "detail", id] as const,
  },
  healthChecks: {
    all: ["health-checks"] as const,
    list: (params?: PaginationParams) => ["health-checks", "list", params] as const,
    detail: (id: string | number) => ["health-checks", "detail", id] as const,
  },
  impersonationTokens: {
    all: ["impersonation-tokens"] as const,
    list: (params?: PaginationParams) =>
      ["impersonation-tokens", "list", params] as const,
    detail: (id: string | number) => ["impersonation-tokens", "detail", id] as const,
  },
  metrics: {
    all: ["metrics"] as const,
    list: (params?: PaginationParams) => ["metrics", "list", params] as const,
    detail: (id: string | number) => ["metrics", "detail", id] as const,
  },
  supportMessages: {
    all: ["support-messages"] as const,
    list: (params?: PaginationParams) => ["support-messages", "list", params] as const,
    detail: (id: string | number) => ["support-messages", "detail", id] as const,
  },
  supportTickets: {
    all: ["support-tickets"] as const,
    list: (params?: PaginationParams) => ["support-tickets", "list", params] as const,
    detail: (id: string | number) => ["support-tickets", "detail", id] as const,
  },
  usageRecords: {
    all: ["usage-records"] as const,
    list: (params?: PaginationParams) => ["usage-records", "list", params] as const,
    detail: (id: string | number) => ["usage-records", "detail", id] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params?: PaginationParams) => ["users", "list", params] as const,
    detail: (id: string | number) => ["users", "detail", id] as const,
  },
} as const

export type QueryKeys = typeof queryKeys
