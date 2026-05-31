/**
 * Typed HTTP client for every Central API route.
 */

import { api, request } from "@/lib/api/client"
import { createResourceApi, getAction, postAction } from "@/lib/api/central/resource-api"
import type {
  ActivityPayload,
  AnnouncementPayload,
  ApiKeyPayload,
  ChangePlanPayload,
  ChangelogPayload,
  DomainPayload,
  ErrorLogPayload,
  ImpersonationTokenPayload,
  InvoiceItemPayload,
  InvoicePayload,
  OnboardTenantPayload,
  PaymentMethodPayload,
  PaymentPayload,
  PermissionPayload,
  PlanFeaturePayload,
  PlanPayload,
  RolePayload,
  SubscriptionEventPayload,
  SubscriptionItemPayload,
  SubscriptionPayload,
  SupportMessagePayload,
  SupportTicketPayload,
  TenantConfigPayload,
  TenantHealthCheckPayload,
  TenantMetricPayload,
  TenantPayload,
  UsageRecordPayload,
  UserPayload,
} from "@/lib/api/central/requests"
import type {
  ActivityResource,
  ApiKeyResource,
  ApiResponse,
  DomainResource,
  ErrorLogResource,
  InvoiceItemResource,
  InvoiceResource,
  LoginRequest,
  LoginResponseData,
  PaginatedResponse,
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
import type { PaginationParams } from "@/lib/api/central/params"
import type { InvoiceStatus, PaymentProvider, TenantStatus } from "@/lib/api/central/enums"

const CENTRAL = "/central"

/* Auth */
export const authApi = {
  login: (payload: LoginRequest) =>
    request<ApiResponse<LoginResponseData>>({
      url: `${CENTRAL}/auth/login`,
      method: "POST",
      data: payload,
    }),
  logout: () =>
    request<ApiResponse<null>>({ url: `${CENTRAL}/auth/logout`, method: "POST" }),
  me: () =>
    request<ApiResponse<UserResource>>({ url: `${CENTRAL}/auth/me`, method: "GET" }),
}

/* Resources */
export const activitiesApi = createResourceApi<
  ActivityResource,
  ActivityPayload,
  Partial<ActivityPayload>
>(`${CENTRAL}/activities`)

export const apiKeysApi = createResourceApi<ApiKeyResource, ApiKeyPayload, Partial<ApiKeyPayload>>(
  `${CENTRAL}/api-keys`,
)

export const domainsApi = createResourceApi<DomainResource, DomainPayload, Partial<DomainPayload>>(
  `${CENTRAL}/domains`,
)

export const errorLogsApi = createResourceApi<
  ErrorLogResource,
  ErrorLogPayload,
  Partial<ErrorLogPayload>
>(`${CENTRAL}/error-logs`)

export const invoicesApi = createResourceApi<
  InvoiceResource,
  InvoicePayload,
  Partial<InvoicePayload>
>(`${CENTRAL}/invoices`)

export const invoiceItemsApi = createResourceApi<
  InvoiceItemResource,
  InvoiceItemPayload,
  Partial<InvoiceItemPayload>
>(`${CENTRAL}/invoice-items`)

export const paymentsApi = createResourceApi<
  PaymentResource,
  PaymentPayload,
  Partial<PaymentPayload>
>(`${CENTRAL}/payments`)

export const paymentMethodsApi = createResourceApi<
  PaymentMethodResource,
  PaymentMethodPayload,
  Partial<PaymentMethodPayload>
>(`${CENTRAL}/payment-methods`)

export const permissionsApi = createResourceApi<
  PermissionResource,
  PermissionPayload,
  Partial<PermissionPayload>
>(`${CENTRAL}/permissions`)

export const plansApi = createResourceApi<PlanResource, PlanPayload, Partial<PlanPayload>>(
  `${CENTRAL}/plans`,
)

export const planFeaturesApi = createResourceApi<
  PlanFeatureResource,
  PlanFeaturePayload,
  Partial<PlanFeaturePayload>
>(`${CENTRAL}/plan-features`)

export const announcementsApi = createResourceApi<
  PlatformAnnouncementResource,
  AnnouncementPayload,
  Partial<AnnouncementPayload>
>(`${CENTRAL}/announcements`)

export const changelogApi = createResourceApi<
  PlatformChangelogResource,
  ChangelogPayload,
  Partial<ChangelogPayload>
>(`${CENTRAL}/changelog`)

export const rolesApi = createResourceApi<RoleResource, RolePayload, Partial<RolePayload>>(
  `${CENTRAL}/roles`,
)

export const subscriptionsApi = createResourceApi<
  SubscriptionResource,
  SubscriptionPayload,
  Partial<SubscriptionPayload>
>(`${CENTRAL}/subscriptions`)

export const subscriptionEventsApi = createResourceApi<
  SubscriptionEventResource,
  SubscriptionEventPayload,
  Partial<SubscriptionEventPayload>
>(`${CENTRAL}/subscription-events`)

export const subscriptionItemsApi = createResourceApi<
  SubscriptionItemResource,
  SubscriptionItemPayload,
  Partial<SubscriptionItemPayload>
>(`${CENTRAL}/subscription-items`)

export const tenantsApi = createResourceApi<TenantResource, TenantPayload, Partial<TenantPayload>>(
  `${CENTRAL}/tenants`,
)

export const tenantConfigsApi = createResourceApi<
  TenantConfigResource,
  TenantConfigPayload,
  Partial<TenantConfigPayload>
>(`${CENTRAL}/tenant-configs`)

export const healthChecksApi = createResourceApi<
  TenantHealthCheckResource,
  TenantHealthCheckPayload,
  Partial<TenantHealthCheckPayload>
>(`${CENTRAL}/health-checks`)

export const impersonationTokensApi = createResourceApi<
  TenantImpersonationTokenResource,
  ImpersonationTokenPayload,
  Partial<ImpersonationTokenPayload>
>(`${CENTRAL}/impersonation-tokens`)

export const metricsApi = createResourceApi<
  TenantMetricResource,
  TenantMetricPayload,
  Partial<TenantMetricPayload>
>(`${CENTRAL}/metrics`)

export const supportMessagesApi = createResourceApi<
  TenantSupportMessageResource,
  SupportMessagePayload,
  Partial<SupportMessagePayload>
>(`${CENTRAL}/support-messages`)

export const supportTicketsApi = createResourceApi<
  TenantSupportTicketResource,
  SupportTicketPayload,
  Partial<SupportTicketPayload>
>(`${CENTRAL}/support-tickets`)

export const usageRecordsApi = createResourceApi<
  UsageRecordResource,
  UsageRecordPayload,
  Partial<UsageRecordPayload>
>(`${CENTRAL}/usage-records`)

export const usersApi = createResourceApi<UserResource, UserPayload, Partial<UserPayload>>(
  `${CENTRAL}/users`,
)

/* Custom actions */
export const customApi = {
  apiKeyUsage: (id: number) => postAction(`${CENTRAL}/api-keys/${id}/usage`),
  apiKeyRevoke: (id: number) => postAction(`${CENTRAL}/api-keys/${id}/revoke`),
  domainPrimary: (id: number) => postAction(`${CENTRAL}/domains/${id}/primary`),
  domainVerify: (id: number) => postAction(`${CENTRAL}/domains/${id}/verify`),
  errorLogResolve: (id: number) => postAction(`${CENTRAL}/error-logs/${id}/resolve`),
  invoicesOverdue: (params?: PaginationParams) =>
    getAction<PaginatedResponse<InvoiceResource>>(
      `${CENTRAL}/invoices/overdue/list`,
      params,
    ),
  invoiceMarkPaid: (id: string) => postAction(`${CENTRAL}/invoices/${id}/paid`),
  paymentRefund: (id: string, amount?: number) =>
    postAction(`${CENTRAL}/payments/${id}/refund`, amount ? { amount } : undefined),
  paymentMethodDefault: (id: number) =>
    postAction(`${CENTRAL}/payment-methods/${id}/default`),
  plansPublic: () =>
    getAction<PaginatedResponse<PlanResource>>(`${CENTRAL}/plans/public`),
  paymentsConfig: () =>
    getAction<ApiResponse<Record<string, unknown>>>(`${CENTRAL}/payments/config`),
  subscriptionCancel: (id: string, reason?: string) =>
    postAction(`${CENTRAL}/subscriptions/${id}/cancel`, reason ? { reason } : undefined),
  subscriptionRenew: (id: string) => postAction(`${CENTRAL}/subscriptions/${id}/renew`),
  subscriptionUpgrade: (id: string, payload: ChangePlanPayload) =>
    postAction(`${CENTRAL}/subscriptions/${id}/upgrade`, payload),
  subscriptionDowngrade: (id: string, payload: ChangePlanPayload) =>
    postAction(`${CENTRAL}/subscriptions/${id}/downgrade`, payload),
  subscriptionReactivate: (id: string) =>
    postAction(`${CENTRAL}/subscriptions/${id}/reactivate`),
  tenantsByStatus: (status: TenantStatus, params?: PaginationParams) =>
    getAction<PaginatedResponse<TenantResource>>(
      `${CENTRAL}/tenants/status/${status}`,
      params,
    ),
  tenantsExpiring: (days: number, params?: PaginationParams) =>
    getAction<PaginatedResponse<TenantResource>>(
      `${CENTRAL}/tenants/expiring/${days}`,
      params,
    ),
  tenantFeatures: (id: string) =>
    getAction<ApiResponse<unknown>>(`${CENTRAL}/tenants/${id}/features`),
  tenantRestore: (id: string) => postAction(`${CENTRAL}/tenants/${id}/restore`),
  tenantForceDelete: (id: string) =>
    request<ApiResponse<null>>({
      url: `${CENTRAL}/tenants/${id}/force`,
      method: "DELETE",
    }),
  tenantOnboard: (payload: OnboardTenantPayload) =>
    postAction<TenantResource>(`${CENTRAL}/tenants/onboard`, payload),
  supportMessageRead: (id: number) =>
    postAction(`${CENTRAL}/support-messages/${id}/read`),
  supportTicketAssign: (id: number, assigned_to: number) =>
    postAction(`${CENTRAL}/support-tickets/${id}/assign`, { assigned_to }),
  supportTicketResolve: (id: number) =>
    postAction(`${CENTRAL}/support-tickets/${id}/resolve`),
  impersonationTokenUse: (id: number) =>
    postAction(`${CENTRAL}/impersonation-tokens/${id}/use`),
  userRecordLogin: (id: number) => postAction(`${CENTRAL}/users/${id}/login`),
  userToggleActive: (id: number) => postAction(`${CENTRAL}/users/${id}/toggle-active`),
}
