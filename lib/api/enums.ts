/**
 * Enum value definitions mirrored from the Laravel Central API OpenAPI spec.
 *
 * Each enum is exported both as a readonly tuple (for iterating in selects and
 * filters) and as a derived union type (for strong typing of resources).
 */

export const BILLING_CYCLES = ["monthly", "yearly"] as const
export type BillingCycle = (typeof BILLING_CYCLES)[number]

export const TENANT_STATUSES = [
  "pending",
  "active",
  "suspended",
  "cancelled",
] as const
export type TenantStatus = (typeof TENANT_STATUSES)[number]

export const SUBSCRIPTION_STATUSES = [
  "trialing",
  "active",
  "past_due",
  "cancelled",
  "paused",
  "expired",
] as const
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number]

export const SUBSCRIPTION_EVENT_TYPES = [
  "created",
  "upgraded",
  "downgraded",
  "renewed",
  "cancelled",
  "reactivated",
  "trial_ended",
  "payment_failed",
  "payment_succeeded",
] as const
export type SubscriptionEventType = (typeof SUBSCRIPTION_EVENT_TYPES)[number]

export const EVENT_TRIGGERED_BY = ["user", "system", "admin", "payment"] as const
export type EventTriggeredBy = (typeof EVENT_TRIGGERED_BY)[number]

export const INVOICE_STATUSES = [
  "draft",
  "open",
  "paid",
  "void",
  "uncollectible",
] as const
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number]

export const PAYMENT_STATUSES = [
  "pending",
  "succeeded",
  "failed",
  "refunded",
] as const
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number]

export const PAYMENT_PROVIDERS = [
  "stripe",
  "paddle",
  "paypal",
  "paystack",
  "flutterwave",
] as const
export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number]

export const PAYMENT_METHOD_KINDS = ["card", "bank_account", "wallet"] as const
export type PaymentMethodKind = (typeof PAYMENT_METHOD_KINDS)[number]

export const PAYMENT_METHOD_TYPES = [
  "card",
  "bank_transfer",
  "wallet",
  "crypto",
] as const
export type PaymentMethodType = (typeof PAYMENT_METHOD_TYPES)[number]

export const FEATURE_TYPES = ["boolean", "integer", "string", "decimal"] as const
export type FeatureType = (typeof FEATURE_TYPES)[number]

export const ANNOUNCEMENT_TYPES = [
  "maintenance",
  "feature",
  "alert",
  "info",
] as const
export type AnnouncementType = (typeof ANNOUNCEMENT_TYPES)[number]

export const ANNOUNCEMENT_TARGET_AUDIENCES = [
  "all",
  "plan_specific",
  "admins_only",
] as const
export type AnnouncementTargetAudience =
  (typeof ANNOUNCEMENT_TARGET_AUDIENCES)[number]

export const CHANGELOG_TYPES = [
  "feature",
  "fix",
  "breaking",
  "security",
  "performance",
] as const
export type ChangelogType = (typeof CHANGELOG_TYPES)[number]

export const ERROR_LOG_SEVERITIES = [
  "debug",
  "info",
  "warning",
  "error",
  "critical",
] as const
export type ErrorLogSeverity = (typeof ERROR_LOG_SEVERITIES)[number]

export const HEALTH_CHECK_STATUSES = [
  "healthy",
  "warning",
  "critical",
  "unknown",
] as const
export type HealthCheckStatus = (typeof HEALTH_CHECK_STATUSES)[number]

export const HEALTH_CHECK_TYPES = [
  "db_connectivity",
  "storage",
  "queue",
  "ssl",
  "redis",
  "search",
] as const
export type HealthCheckType = (typeof HEALTH_CHECK_TYPES)[number]

export const MESSAGE_SENDER_TYPES = ["user", "system", "admin"] as const
export type MessageSenderType = (typeof MESSAGE_SENDER_TYPES)[number]

export const SUPPORT_TICKET_CATEGORIES = [
  "billing",
  "technical",
  "general",
  "feature_request",
] as const
export type SupportTicketCategory = (typeof SUPPORT_TICKET_CATEGORIES)[number]

export const SUPPORT_TICKET_PRIORITIES = [
  "low",
  "medium",
  "high",
  "urgent",
] as const
export type SupportTicketPriority = (typeof SUPPORT_TICKET_PRIORITIES)[number]

export const SUPPORT_TICKET_STATUSES = [
  "open",
  "in_progress",
  "waiting_customer",
  "resolved",
  "closed",
] as const
export type SupportTicketStatus = (typeof SUPPORT_TICKET_STATUSES)[number]

export const USAGE_METRICS = [
  "products",
  "orders",
  "storage",
  "bandwidth",
  "staff",
  "transactions",
  "api_calls",
] as const
export type UsageMetric = (typeof USAGE_METRICS)[number]

export const USER_ROLES = [
  "super_admin",
  "support",
  "billing",
  "technical",
] as const
export type UserRole = (typeof USER_ROLES)[number]
