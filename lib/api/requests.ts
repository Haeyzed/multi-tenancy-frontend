/**
 * Create / update request payload types for every writable resource.
 *
 * These mirror the Store* / Update* request bodies in the OpenAPI spec.
 * Update payloads are partial variants of the create payloads.
 */

import type {
  AnnouncementTargetAudience,
  AnnouncementType,
  BillingCycle,
  ChangelogType,
  ErrorLogSeverity,
  EventTriggeredBy,
  FeatureType,
  HealthCheckStatus,
  HealthCheckType,
  InvoiceStatus,
  MessageSenderType,
  PaymentMethodKind,
  PaymentMethodType,
  PaymentProvider,
  PaymentStatus,
  SubscriptionEventType,
  SubscriptionStatus,
  SupportTicketCategory,
  SupportTicketPriority,
  SupportTicketStatus,
  TenantStatus,
  UsageMetric,
  UserRole,
} from "./enums"
import type { JsonRecord } from "./types"

export interface ActivityPayload {
  log_name?: string | null
  description: string
  event?: string | null
  properties?: JsonRecord | null
}

export interface ApiKeyPayload {
  tenant_id: string
  name: string
  permissions?: string[] | null
  expires_at?: string | null
  is_active?: boolean
}

export interface DomainPayload {
  tenant_id: string
  domain: string
  is_primary?: boolean
  is_fallback?: boolean
  verified?: boolean
}

export interface ErrorLogPayload {
  tenant_id?: string | null
  severity: ErrorLogSeverity
  channel: string
  message: string
  context?: JsonRecord | null
  occurred_at?: string | null
  resolved_at?: string | null
}

export interface InvoicePayload {
  tenant_id: string
  subscription_id?: string | null
  invoice_number: string
  status: InvoiceStatus
  amount_due: number
  amount_paid?: number
  currency: string
  billing_period_start: string
  billing_period_end: string
  due_date?: string | null
  notes?: string | null
}

export interface InvoiceItemPayload {
  invoice_id: string
  description: string
  quantity: number
  unit_amount: number
  amount: number
  plan_id?: string | null
  period_start?: string | null
  period_end?: string | null
}

export interface PaymentPayload {
  tenant_id: string
  invoice_id?: string | null
  amount: number
  currency: string
  status: PaymentStatus
  payment_provider: PaymentProvider
  provider_payment_id?: string | null
  payment_method_type?: PaymentMethodType | null
  payment_method_last4?: string | null
}

export interface PaymentMethodPayload {
  tenant_id: string
  provider: PaymentProvider
  provider_method_id: string
  type: PaymentMethodKind
  last4?: string | null
  brand?: string | null
  exp_month?: number | null
  exp_year?: number | null
  is_default?: boolean
}

export interface PermissionPayload {
  name: string
  guard_name?: string
  module?: string | null
}

export interface PlanPayload {
  name: string
  slug?: string
  description?: string | null
  tier: number
  is_active?: boolean
  is_public?: boolean
  price_monthly: number
  price_yearly: number
  currency: string
  trial_days?: number
  sort_order?: number
}

export interface PlanFeaturePayload {
  plan_id: string
  feature_key: string
  feature_value: string
  feature_type: FeatureType
}

export interface AnnouncementPayload {
  title: string
  body: string
  type: AnnouncementType
  target_audience: AnnouncementTargetAudience
  target_plans?: string[] | null
  is_active?: boolean
  starts_at?: string | null
  ends_at?: string | null
}

export interface ChangelogPayload {
  version: string
  title: string
  description: string
  type: ChangelogType
  is_published?: boolean
  published_at?: string | null
}

export interface RolePayload {
  name: string
  guard_name?: string
}

export interface SubscriptionPayload {
  tenant_id: string
  plan_id: string
  status: SubscriptionStatus
  billing_cycle: BillingCycle
  current_period_start: string
  current_period_end: string
  trial_ends_at?: string | null
  payment_provider: PaymentProvider
}

export interface SubscriptionEventPayload {
  subscription_id: string
  event_type: SubscriptionEventType
  from_plan_id?: string | null
  to_plan_id?: string | null
  triggered_by: EventTriggeredBy
  metadata?: JsonRecord | null
}

export interface SubscriptionItemPayload {
  subscription_id: string
  plan_id: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface TenantPayload {
  name: string
  slug?: string
  database?: string
  domain: string
  status?: TenantStatus
  plan_id?: string | null
  billing_cycle: BillingCycle
  owner_email: string
  owner_name: string
}

export interface TenantConfigPayload {
  tenant_id: string
  key: string
  value?: string | null
  encrypted?: boolean
}

export interface TenantHealthCheckPayload {
  tenant_id: string
  check_type: HealthCheckType
  status: HealthCheckStatus
  response_time_ms?: number | null
  message?: string | null
  checked_at?: string | null
}

export interface ImpersonationTokenPayload {
  tenant_id: string
  admin_id: number
  expires_at: string
}

export interface TenantMetricPayload {
  tenant_id: string
  metric_date: string
  total_orders?: number
  total_revenue?: string
  total_products?: number
  total_customers?: number
  storage_used_mb?: number
  bandwidth_used_mb?: number
  api_calls?: number
}

export interface SupportMessagePayload {
  ticket_id: number
  sender_type: MessageSenderType
  sender_id?: number | null
  body: string
  is_internal?: boolean
}

export interface SupportTicketPayload {
  tenant_id: string
  category: SupportTicketCategory
  priority: SupportTicketPriority
  status?: SupportTicketStatus
  subject: string
  body: string
  assigned_to?: number | null
}

export interface UsageRecordPayload {
  tenant_id: string
  subscription_id?: string | null
  metric: UsageMetric
  quantity: string
  recorded_at?: string | null
}

export interface UserPayload {
  name: string
  email: string
  password?: string
  role: UserRole
  is_active?: boolean
}

export interface ChangePlanPayload {
  plan_id: string
}

export interface OnboardTenantPayload {
  name: string
  slug?: string
  database?: string
  domain: string
  plan_id: string
  billing_cycle: BillingCycle
  owner_email: string
  owner_name: string
  payment_provider?: PaymentProvider
}
