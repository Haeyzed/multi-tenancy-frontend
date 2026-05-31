import { z } from "zod"

import {
  ANNOUNCEMENT_TARGET_AUDIENCES,
  ANNOUNCEMENT_TYPES,
  BILLING_CYCLES,
  CHANGELOG_TYPES,
  ERROR_LOG_SEVERITIES,
  EVENT_TRIGGERED_BY,
  FEATURE_TYPES,
  HEALTH_CHECK_STATUSES,
  HEALTH_CHECK_TYPES,
  INVOICE_STATUSES,
  MESSAGE_SENDER_TYPES,
  PAYMENT_METHOD_KINDS,
  PAYMENT_METHOD_TYPES,
  PAYMENT_PROVIDERS,
  PAYMENT_STATUSES,
  SUBSCRIPTION_EVENT_TYPES,
  SUBSCRIPTION_STATUSES,
  SUPPORT_TICKET_CATEGORIES,
  SUPPORT_TICKET_PRIORITIES,
  SUPPORT_TICKET_STATUSES,
  TENANT_STATUSES,
  USAGE_METRICS,
  USER_ROLES,
} from "@/lib/api/central/enums"

export const tenantSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  domain: z.string().min(1),
  status: z.enum(TENANT_STATUSES).optional(),
  plan_id: z.string().nullable().optional(),
  billing_cycle: z.enum(BILLING_CYCLES),
  owner_email: z.string().email(),
  owner_name: z.string().min(1),
})

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  role: z.enum(USER_ROLES),
  is_active: z.boolean().optional(),
})

export const planSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  tier: z.coerce.number().int().min(0),
  is_active: z.boolean().optional(),
  is_public: z.boolean().optional(),
  price_monthly: z.coerce.number().min(0),
  price_yearly: z.coerce.number().min(0),
  currency: z.string().min(3).max(3),
  trial_days: z.coerce.number().int().min(0).optional(),
  sort_order: z.coerce.number().int().optional(),
})

export const domainSchema = z.object({
  tenant_id: z.string().min(1),
  domain: z.string().min(1),
  is_primary: z.boolean().optional(),
  is_fallback: z.boolean().optional(),
  verified: z.boolean().optional(),
})

export const subscriptionSchema = z.object({
  tenant_id: z.string().min(1),
  plan_id: z.string().min(1),
  status: z.enum(SUBSCRIPTION_STATUSES),
  billing_cycle: z.enum(BILLING_CYCLES),
  current_period_start: z.string().min(1),
  current_period_end: z.string().min(1),
  trial_ends_at: z.string().nullable().optional(),
  payment_provider: z.enum(PAYMENT_PROVIDERS),
})

export const invoiceSchema = z.object({
  tenant_id: z.string().min(1),
  subscription_id: z.string().nullable().optional(),
  invoice_number: z.string().min(1),
  status: z.enum(INVOICE_STATUSES),
  amount_due: z.coerce.number().min(0),
  amount_paid: z.coerce.number().min(0).optional(),
  currency: z.string().min(3).max(3),
  billing_period_start: z.string().min(1),
  billing_period_end: z.string().min(1),
  due_date: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
})

export const paymentSchema = z.object({
  tenant_id: z.string().min(1),
  invoice_id: z.string().nullable().optional(),
  amount: z.coerce.number().min(0),
  currency: z.string().min(3).max(3),
  status: z.enum(PAYMENT_STATUSES),
  payment_provider: z.enum(PAYMENT_PROVIDERS),
  provider_payment_id: z.string().nullable().optional(),
  payment_method_type: z.enum(PAYMENT_METHOD_TYPES).nullable().optional(),
  payment_method_last4: z.string().nullable().optional(),
})

export const roleSchema = z.object({
  name: z.string().min(1),
  guard_name: z.string().optional(),
})

export const permissionSchema = z.object({
  name: z.string().min(1),
  guard_name: z.string().optional(),
  module: z.string().nullable().optional(),
})

export const apiKeySchema = z.object({
  tenant_id: z.string().min(1),
  name: z.string().min(1),
  permissions: z.array(z.string()).nullable().optional(),
  expires_at: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
})

export const announcementSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  type: z.enum(ANNOUNCEMENT_TYPES),
  target_audience: z.enum(ANNOUNCEMENT_TARGET_AUDIENCES),
  target_plans: z.array(z.string()).nullable().optional(),
  is_active: z.boolean().optional(),
  starts_at: z.string().nullable().optional(),
  ends_at: z.string().nullable().optional(),
})

export const changelogSchema = z.object({
  version: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(CHANGELOG_TYPES),
  is_published: z.boolean().optional(),
  published_at: z.string().nullable().optional(),
})

export const errorLogSchema = z.object({
  tenant_id: z.string().nullable().optional(),
  severity: z.enum(ERROR_LOG_SEVERITIES),
  channel: z.string().min(1),
  message: z.string().min(1),
  context: z.record(z.string(), z.unknown()).nullable().optional(),
  occurred_at: z.string().nullable().optional(),
  resolved_at: z.string().nullable().optional(),
})

export const healthCheckSchema = z.object({
  tenant_id: z.string().min(1),
  check_type: z.enum(HEALTH_CHECK_TYPES),
  status: z.enum(HEALTH_CHECK_STATUSES),
  response_time_ms: z.coerce.number().nullable().optional(),
  message: z.string().nullable().optional(),
  checked_at: z.string().nullable().optional(),
})

export const metricSchema = z.object({
  tenant_id: z.string().min(1),
  metric_date: z.string().min(1),
  total_orders: z.coerce.number().optional(),
  total_revenue: z.string().optional(),
  total_products: z.coerce.number().optional(),
  total_customers: z.coerce.number().optional(),
  storage_used_mb: z.coerce.number().optional(),
  bandwidth_used_mb: z.coerce.number().optional(),
  api_calls: z.coerce.number().optional(),
})

export const supportTicketSchema = z.object({
  tenant_id: z.string().min(1),
  category: z.enum(SUPPORT_TICKET_CATEGORIES),
  priority: z.enum(SUPPORT_TICKET_PRIORITIES),
  status: z.enum(SUPPORT_TICKET_STATUSES).optional(),
  subject: z.string().min(1),
  body: z.string().min(1),
  assigned_to: z.coerce.number().nullable().optional(),
})

export const supportMessageSchema = z.object({
  ticket_id: z.coerce.number().int(),
  sender_type: z.enum(MESSAGE_SENDER_TYPES),
  sender_id: z.coerce.number().nullable().optional(),
  body: z.string().min(1),
  is_internal: z.boolean().optional(),
})

export const usageRecordSchema = z.object({
  tenant_id: z.string().min(1),
  subscription_id: z.string().nullable().optional(),
  metric: z.enum(USAGE_METRICS),
  quantity: z.string().min(1),
  recorded_at: z.string().nullable().optional(),
})

export const paymentMethodSchema = z.object({
  tenant_id: z.string().min(1),
  provider: z.enum(PAYMENT_PROVIDERS),
  provider_method_id: z.string().min(1),
  type: z.enum(PAYMENT_METHOD_KINDS),
  last4: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  exp_month: z.coerce.number().nullable().optional(),
  exp_year: z.coerce.number().nullable().optional(),
  is_default: z.boolean().optional(),
})

export const invoiceItemSchema = z.object({
  invoice_id: z.string().min(1),
  description: z.string().min(1),
  quantity: z.coerce.number().min(1),
  unit_amount: z.coerce.number().min(0),
  amount: z.coerce.number().min(0),
  plan_id: z.string().nullable().optional(),
  period_start: z.string().nullable().optional(),
  period_end: z.string().nullable().optional(),
})

export const planFeatureSchema = z.object({
  plan_id: z.string().min(1),
  feature_key: z.string().min(1),
  feature_value: z.string().min(1),
  feature_type: z.enum(FEATURE_TYPES),
})

export const subscriptionItemSchema = z.object({
  subscription_id: z.string().min(1),
  plan_id: z.string().min(1),
  quantity: z.coerce.number().min(1),
  unit_price: z.coerce.number().min(0),
  total_price: z.coerce.number().min(0),
})

export const subscriptionEventSchema = z.object({
  subscription_id: z.string().min(1),
  event_type: z.enum(SUBSCRIPTION_EVENT_TYPES),
  from_plan_id: z.string().nullable().optional(),
  to_plan_id: z.string().nullable().optional(),
  triggered_by: z.enum(EVENT_TRIGGERED_BY),
})

export const tenantConfigSchema = z.object({
  tenant_id: z.string().min(1),
  key: z.string().min(1),
  value: z.string().nullable().optional(),
  encrypted: z.boolean().optional(),
})

export const impersonationTokenSchema = z.object({
  tenant_id: z.string().min(1),
  admin_id: z.coerce.number().int(),
  expires_at: z.string().min(1),
})

export const activitySchema = z.object({
  log_name: z.string().nullable().optional(),
  description: z.string().min(1),
  event: z.string().nullable().optional(),
})

export const onboardSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  domain: z.string().min(1),
  plan_id: z.string().min(1),
  billing_cycle: z.enum(BILLING_CYCLES),
  owner_email: z.string().email(),
  owner_name: z.string().min(1),
  payment_provider: z.enum(PAYMENT_PROVIDERS).optional(),
})
