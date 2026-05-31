"use client"

import {
  activitiesApi,
  announcementsApi,
  apiKeysApi,
  authApi,
  changelogApi,
  customApi,
  domainsApi,
  errorLogsApi,
  healthChecksApi,
  impersonationTokensApi,
  invoiceItemsApi,
  invoicesApi,
  metricsApi,
  paymentMethodsApi,
  paymentsApi,
  permissionsApi,
  planFeaturesApi,
  plansApi,
  rolesApi,
  subscriptionEventsApi,
  subscriptionItemsApi,
  subscriptionsApi,
  supportMessagesApi,
  supportTicketsApi,
  tenantConfigsApi,
  tenantsApi,
  usageRecordsApi,
  usersApi,
} from "@/lib/api/central/endpoints"
import { createResourceHooks } from "@/lib/api/central/create-hooks"
import { queryKeys } from "@/lib/api/central/keys"
import type { ChangePlanPayload, OnboardTenantPayload } from "@/lib/api/central/requests"
import type { PaginationParams } from "@/lib/api/central/params"
import type { TenantStatus } from "@/lib/api/central/enums"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

export const useActivities = createResourceHooks(queryKeys.activities, activitiesApi)
export const useApiKeys = createResourceHooks(queryKeys.apiKeys, apiKeysApi)
export const useDomains = createResourceHooks(queryKeys.domains, domainsApi)
export const useErrorLogs = createResourceHooks(queryKeys.errorLogs, errorLogsApi)
export const useInvoices = createResourceHooks(queryKeys.invoices, invoicesApi)
export const useInvoiceItems = createResourceHooks(queryKeys.invoiceItems, invoiceItemsApi)
export const usePayments = createResourceHooks(queryKeys.payments, paymentsApi)
export const usePaymentMethods = createResourceHooks(queryKeys.paymentMethods, paymentMethodsApi)
export const usePermissions = createResourceHooks(queryKeys.permissions, permissionsApi)
export const usePlans = createResourceHooks(queryKeys.plans, plansApi)
export const usePlanFeatures = createResourceHooks(queryKeys.planFeatures, planFeaturesApi)
export const useAnnouncements = createResourceHooks(queryKeys.announcements, announcementsApi)
export const useChangelog = createResourceHooks(queryKeys.changelog, changelogApi)
export const useRoles = createResourceHooks(queryKeys.roles, rolesApi)
export const useSubscriptions = createResourceHooks(queryKeys.subscriptions, subscriptionsApi)
export const useSubscriptionEvents = createResourceHooks(
  queryKeys.subscriptionEvents,
  subscriptionEventsApi,
)
export const useSubscriptionItems = createResourceHooks(
  queryKeys.subscriptionItems,
  subscriptionItemsApi,
)
export const useTenants = createResourceHooks(queryKeys.tenants, tenantsApi)
export const useTenantConfigs = createResourceHooks(queryKeys.tenantConfigs, tenantConfigsApi)
export const useHealthChecks = createResourceHooks(queryKeys.healthChecks, healthChecksApi)
export const useImpersonationTokens = createResourceHooks(
  queryKeys.impersonationTokens,
  impersonationTokensApi,
)
export const useMetrics = createResourceHooks(queryKeys.metrics, metricsApi)
export const useSupportMessages = createResourceHooks(queryKeys.supportMessages, supportMessagesApi)
export const useSupportTickets = createResourceHooks(queryKeys.supportTickets, supportTicketsApi)
export const useUsageRecords = createResourceHooks(queryKeys.usageRecords, usageRecordsApi)
export const useUsers = createResourceHooks(queryKeys.users, usersApi)

export function useAuthMe(enabled = true) {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => authApi.me(),
    enabled,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export function useOverdueInvoices(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.invoices.overdue(params),
    queryFn: () => customApi.invoicesOverdue(params),
  })
}

export function usePublicPlans() {
  return useQuery({
    queryKey: queryKeys.plans.public,
    queryFn: () => customApi.plansPublic(),
  })
}

export function usePaymentsConfig() {
  return useQuery({
    queryKey: queryKeys.payments.config,
    queryFn: () => customApi.paymentsConfig(),
  })
}

export function useTenantsByStatus(status: TenantStatus, params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.tenants.byStatus(status, params),
    queryFn: () => customApi.tenantsByStatus(status, params),
  })
}

export function useTenantsExpiring(days: number, params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.tenants.expiring(days, params),
    queryFn: () => customApi.tenantsExpiring(days, params),
  })
}

export function useTenantFeatures(id: string | null) {
  return useQuery({
    queryKey: queryKeys.tenants.features(id!),
    queryFn: () => customApi.tenantFeatures(id!),
    enabled: Boolean(id),
  })
}

export function useTenantOnboard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: OnboardTenantPayload) => customApi.tenantOnboard(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.tenants.all })
    },
  })
}

export function useSubscriptionActions() {
  const queryClient = useQueryClient()
  const invalidate = () =>
    void queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all })

  return {
    cancel: useMutation({
      mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
        customApi.subscriptionCancel(id, reason),
      onSuccess: invalidate,
    }),
    renew: useMutation({
      mutationFn: (id: string) => customApi.subscriptionRenew(id),
      onSuccess: invalidate,
    }),
    upgrade: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: ChangePlanPayload }) =>
        customApi.subscriptionUpgrade(id, payload),
      onSuccess: invalidate,
    }),
    downgrade: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: ChangePlanPayload }) =>
        customApi.subscriptionDowngrade(id, payload),
      onSuccess: invalidate,
    }),
    reactivate: useMutation({
      mutationFn: (id: string) => customApi.subscriptionReactivate(id),
      onSuccess: invalidate,
    }),
  }
}

export function useCustomActions() {
  const queryClient = useQueryClient()

  const invalidate = (key: readonly unknown[]) =>
    void queryClient.invalidateQueries({ queryKey: key })

  return {
    apiKeyRevoke: useMutation({
      mutationFn: (id: number) => customApi.apiKeyRevoke(id),
      onSuccess: () => invalidate(queryKeys.apiKeys.all),
    }),
    domainPrimary: useMutation({
      mutationFn: (id: number) => customApi.domainPrimary(id),
      onSuccess: () => invalidate(queryKeys.domains.all),
    }),
    domainVerify: useMutation({
      mutationFn: (id: number) => customApi.domainVerify(id),
      onSuccess: () => invalidate(queryKeys.domains.all),
    }),
    errorLogResolve: useMutation({
      mutationFn: (id: number) => customApi.errorLogResolve(id),
      onSuccess: () => invalidate(queryKeys.errorLogs.all),
    }),
    invoiceMarkPaid: useMutation({
      mutationFn: (id: string) => customApi.invoiceMarkPaid(id),
      onSuccess: () => invalidate(queryKeys.invoices.all),
    }),
    paymentRefund: useMutation({
      mutationFn: ({ id, amount }: { id: string; amount?: number }) =>
        customApi.paymentRefund(id, amount),
      onSuccess: () => invalidate(queryKeys.payments.all),
    }),
    paymentMethodDefault: useMutation({
      mutationFn: (id: number) => customApi.paymentMethodDefault(id),
      onSuccess: () => invalidate(queryKeys.paymentMethods.all),
    }),
    tenantRestore: useMutation({
      mutationFn: (id: string) => customApi.tenantRestore(id),
      onSuccess: () => invalidate(queryKeys.tenants.all),
    }),
    tenantForceDelete: useMutation({
      mutationFn: (id: string) => customApi.tenantForceDelete(id),
      onSuccess: () => invalidate(queryKeys.tenants.all),
    }),
    supportMessageRead: useMutation({
      mutationFn: (id: number) => customApi.supportMessageRead(id),
      onSuccess: () => invalidate(queryKeys.supportMessages.all),
    }),
    supportTicketAssign: useMutation({
      mutationFn: ({ id, assigned_to }: { id: number; assigned_to: number }) =>
        customApi.supportTicketAssign(id, assigned_to),
      onSuccess: () => invalidate(queryKeys.supportTickets.all),
    }),
    supportTicketResolve: useMutation({
      mutationFn: (id: number) => customApi.supportTicketResolve(id),
      onSuccess: () => invalidate(queryKeys.supportTickets.all),
    }),
    impersonationTokenUse: useMutation({
      mutationFn: (id: number) => customApi.impersonationTokenUse(id),
      onSuccess: () => invalidate(queryKeys.impersonationTokens.all),
    }),
    userToggleActive: useMutation({
      mutationFn: (id: number) => customApi.userToggleActive(id),
      onSuccess: () => invalidate(queryKeys.users.all),
    }),
  }
}
