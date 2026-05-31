/**
 * Strongly-typed models mirrored from the Laravel Central API OpenAPI spec.
 *
 * Resource interfaces represent API response payloads. Request interfaces
 * represent create/update payloads. Relationships are optional because they
 * are only present when eager loaded by the backend.
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
  
  /* -------------------------------------------------------------------------- */
  /*                              Generic envelopes                             */
  /* -------------------------------------------------------------------------- */
  
  export interface PaginationMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  
  export interface ApiResponse<T> {
    success: boolean
    message: string | null
    data: T
  }
  
  export interface PaginatedResponse<T> {
    success: boolean
    data: T[]
    meta: PaginationMeta
  }
  
  export type Nullable<T> = T | null
  export type JsonRecord = Record<string, unknown>
  
  /* -------------------------------------------------------------------------- */
  /*                                  Resources                                 */
  /* -------------------------------------------------------------------------- */
  
  export interface ActivityResource {
    id: number
    log_name: Nullable<string>
    description: string
    subject_type: Nullable<string>
    subject_id: Nullable<number>
    causer_type: Nullable<string>
    causer_id: Nullable<number>
    event: Nullable<string>
    attribute_changes: Nullable<string | JsonRecord>
    properties: Nullable<JsonRecord>
    created_at: string
    updated_at: string
    subject?: Nullable<{ id: number | string; type: Nullable<string> }>
    causer?: Nullable<{ id: number | string; type: Nullable<string> }>
  }
  
  export interface ApiKeyResource {
    id: number
    tenant_id: string
    name: string
    permissions: Nullable<string[]>
    last_used_at: Nullable<string>
    expires_at: Nullable<string>
    is_active: boolean
    created_at: string
    updated_at: string
    tenant?: TenantResource
  }
  
  export interface DomainResource {
    id: number
    tenant_id: string
    domain: string
    is_primary: boolean
    is_fallback: boolean
    verified: boolean
    created_at: string
    updated_at: string
    tenant?: TenantResource
  }
  
  export interface ErrorLogResource {
    id: number
    tenant_id: Nullable<string>
    severity: ErrorLogSeverity
    channel: string
    message: string
    context: Nullable<JsonRecord | unknown[]>
    occurred_at: string
    resolved_at: Nullable<string>
    created_at: string
    updated_at: string
    tenant?: TenantResource
  }
  
  export interface InvoiceItemResource {
    id: number
    invoice_id: string
    description: string
    quantity: number
    unit_amount: number
    amount: number
    plan_id: Nullable<string>
    period_start: Nullable<string>
    period_end: Nullable<string>
    created_at: string
    updated_at: string
    invoice?: InvoiceResource
    plan?: PlanResource
  }
  
  export interface InvoiceResource {
    id: string
    tenant_id: string
    subscription_id: Nullable<string>
    invoice_number: string
    status: InvoiceStatus
    amount_due: number
    amount_paid: number
    amount_remaining: number
    currency: string
    billing_period_start: string
    billing_period_end: string
    due_date: Nullable<string>
    paid_at: Nullable<string>
    pdf_url: Nullable<string>
    payment_intent_id: Nullable<string>
    line_items: Nullable<unknown[]>
    notes: Nullable<string>
    created_at: string
    updated_at: string
    tenant?: TenantResource
    subscription?: SubscriptionResource
    invoice_items?: InvoiceItemResource[]
    payments?: PaymentResource[]
  }
  
  export interface PaymentResource {
    id: string
    tenant_id: string
    invoice_id: Nullable<string>
    amount: number
    currency: string
    status: PaymentStatus
    payment_provider: PaymentProvider
    provider_payment_id: Nullable<string>
    payment_method_type: Nullable<PaymentMethodType>
    payment_method_last4: Nullable<string>
    failure_message: Nullable<string>
    refunded_amount: number
    created_at: string
    updated_at: string
    tenant?: TenantResource
    invoice?: InvoiceResource
  }
  
  export interface PaymentMethodResource {
    id: number
    tenant_id: string
    provider: PaymentProvider
    provider_method_id: string
    type: PaymentMethodKind
    last4: Nullable<string>
    brand: Nullable<string>
    exp_month: Nullable<number>
    exp_year: Nullable<number>
    is_default: boolean
    billing_details: Nullable<JsonRecord>
    created_at: string
    updated_at: string
    tenant?: TenantResource
  }
  
  export interface PermissionResource {
    id: number
    name: string
    guard_name: string
    module: Nullable<string>
    created_at: string
    updated_at: string
  }
  
  export interface PlanFeatureResource {
    id: number
    plan_id: string
    feature_key: string
    feature_value: string
    feature_type: FeatureType
    created_at: string
    updated_at: string
    plan?: PlanResource
  }
  
  export interface PlanResource {
    id: string
    name: string
    slug: string
    description: Nullable<string>
    tier: number
    is_active: boolean
    is_public: boolean
    price_monthly: number
    price_yearly: number
    currency: string
    trial_days: number
    sort_order: number
    features: Nullable<unknown[] | JsonRecord>
    created_at: string
    updated_at: string
    deleted_at: Nullable<string>
    plan_features?: PlanFeatureResource[]
  }
  
  export interface PlatformAnnouncementResource {
    id: number
    title: string
    body: string
    type: AnnouncementType
    target_audience: AnnouncementTargetAudience
    target_plans: Nullable<string[]>
    is_active: boolean
    starts_at: Nullable<string>
    ends_at: Nullable<string>
    created_at: string
    updated_at: string
  }
  
  export interface PlatformChangelogResource {
    id: number
    version: string
    title: string
    description: string
    type: ChangelogType
    is_published: boolean
    published_at: Nullable<string>
    created_at: string
    updated_at: string
  }
  
  export interface RoleResource {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
  }
  
  export interface SubscriptionEventResource {
    id: number
    subscription_id: string
    event_type: SubscriptionEventType
    from_plan_id: Nullable<string>
    to_plan_id: Nullable<string>
    triggered_by: EventTriggeredBy
    metadata: Nullable<JsonRecord>
    created_at: string
    updated_at: string
    subscription?: SubscriptionResource
    from_plan?: PlanResource
    to_plan?: PlanResource
  }
  
  export interface SubscriptionItemResource {
    id: number
    subscription_id: string
    plan_id: string
    quantity: number
    unit_price: number
    total_price: number
    created_at: string
    updated_at: string
    subscription?: SubscriptionResource
    plan?: PlanResource
  }
  
  export interface SubscriptionResource {
    id: string
    tenant_id: string
    plan_id: string
    status: SubscriptionStatus
    billing_cycle: BillingCycle
    current_period_start: string
    current_period_end: string
    trial_ends_at: Nullable<string>
    cancelled_at: Nullable<string>
    cancellation_reason: Nullable<string>
    payment_provider: PaymentProvider
    payment_provider_id: Nullable<string>
    payment_method_id: Nullable<string>
    latest_invoice_id: Nullable<string>
    created_at: string
    updated_at: string
    tenant?: TenantResource
    plan?: PlanResource
    latest_invoice?: InvoiceResource
    invoices?: InvoiceResource[]
    subscription_items?: SubscriptionItemResource[]
  }
  
  export interface TenantConfigResource {
    id: number
    tenant_id: string
    key: string
    value: Nullable<string>
    encrypted: boolean
    created_at: string
    updated_at: string
    tenant?: TenantResource
  }
  
  export interface TenantHealthCheckResource {
    id: number
    tenant_id: string
    check_type: HealthCheckType
    status: HealthCheckStatus
    response_time_ms: Nullable<number>
    message: Nullable<string>
    checked_at: string
    created_at: string
    updated_at: string
    tenant?: TenantResource
  }
  
  export interface TenantImpersonationTokenResource {
    id: number
    tenant_id: string
    admin_id: number
    expires_at: string
    used_at: Nullable<string>
    created_at: string
    updated_at: string
    tenant?: TenantResource
    administrator?: UserResource
  }
  
  export interface TenantMetricResource {
    id: number
    tenant_id: string
    metric_date: string
    total_orders: number
    total_revenue: string
    total_products: number
    total_customers: number
    storage_used_mb: number
    bandwidth_used_mb: number
    api_calls: number
    created_at: string
    updated_at: string
    tenant?: TenantResource
  }
  
  export interface TenantResource {
    id: string
    name: string
    slug: string
    database: string
    domain: string
    status: TenantStatus
    plan_id: Nullable<string>
    billing_cycle: BillingCycle
    trial_ends_at: Nullable<string>
    subscribed_at: Nullable<string>
    expires_at: Nullable<string>
    owner_email: string
    owner_name: string
    settings: Nullable<JsonRecord>
    meta: Nullable<JsonRecord>
    data: Nullable<JsonRecord>
    created_at: string
    updated_at: string
    deleted_at: Nullable<string>
    plan?: PlanResource
    domains?: DomainResource[]
    configurations?: TenantConfigResource[]
    subscriptions?: SubscriptionResource[]
  }
  
  export interface TenantSupportMessageResource {
    id: number
    ticket_id: number
    sender_type: MessageSenderType
    sender_id: Nullable<number>
    body: string
    is_internal: boolean
    is_read: boolean
    read_at: Nullable<string>
    created_at: string
    updated_at: string
    ticket?: TenantSupportTicketResource
    sender?: UserResource
  }
  
  export interface TenantSupportTicketResource {
    id: number
    tenant_id: string
    category: SupportTicketCategory
    priority: SupportTicketPriority
    status: SupportTicketStatus
    subject: string
    body: string
    assigned_to: Nullable<number>
    resolved_at: Nullable<string>
    created_at: string
    updated_at: string
    tenant?: TenantResource
    assignee?: UserResource
    messages?: TenantSupportMessageResource[]
  }
  
  export interface UsageRecordResource {
    id: number
    tenant_id: string
    subscription_id: Nullable<string>
    metric: UsageMetric
    quantity: string
    recorded_at: string
    created_at: string
    updated_at: string
    tenant?: TenantResource
    subscription?: SubscriptionResource
  }
  
  export interface UserResource {
    id: number
    name: string
    email: string
    email_verified_at: Nullable<string>
    role: UserRole
    last_login_at: Nullable<string>
    is_active: boolean
    created_at: string
    updated_at: string
    deleted_at: Nullable<string>
  }
  
  /* -------------------------------------------------------------------------- */
  /*                               Auth payloads                                */
  /* -------------------------------------------------------------------------- */
  
  export interface LoginRequest {
    email: string
    password: string
  }
  
  export interface LoginResponseData {
    user: UserResource
    token: string
  }
  