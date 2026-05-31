import type { ComponentType } from "react"

export interface NavItem {
  title: string
  href: string
  icon?: ComponentType<{ className?: string }>
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const dashboardNav: NavGroup[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/" }],
  },
  {
    label: "Tenants",
    items: [
      { title: "Tenants", href: "/tenants" },
      { title: "Onboard", href: "/tenants/onboard" },
      { title: "Domains", href: "/domains" },
      { title: "Configurations", href: "/tenant-configs" },
    ],
  },
  {
    label: "Plans",
    items: [
      { title: "Plans", href: "/plans" },
      { title: "Plan Features", href: "/plan-features" },
    ],
  },
  {
    label: "Subscriptions",
    items: [
      { title: "Subscriptions", href: "/subscriptions" },
      { title: "Subscription Items", href: "/subscription-items" },
      { title: "Subscription Events", href: "/subscription-events" },
    ],
  },
  {
    label: "Billing",
    items: [
      { title: "Invoices", href: "/invoices" },
      { title: "Overdue Invoices", href: "/invoices/overdue" },
      { title: "Invoice Items", href: "/invoice-items" },
      { title: "Payments", href: "/payments" },
      { title: "Payment Methods", href: "/payment-methods" },
      { title: "Usage Records", href: "/usage-records" },
    ],
  },
  {
    label: "Access",
    items: [
      { title: "Users", href: "/users" },
      { title: "Roles", href: "/roles" },
      { title: "Permissions", href: "/permissions" },
      { title: "API Keys", href: "/api-keys" },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "Support Tickets", href: "/support-tickets" },
      { title: "Support Messages", href: "/support-messages" },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { title: "Health Checks", href: "/health-checks" },
      { title: "Metrics", href: "/metrics" },
      { title: "Error Logs", href: "/error-logs" },
    ],
  },
  {
    label: "Platform",
    items: [
      { title: "Announcements", href: "/announcements" },
      { title: "Changelog", href: "/changelog" },
      { title: "Activity Log", href: "/activities" },
    ],
  },
  {
    label: "Security",
    items: [{ title: "Impersonation Tokens", href: "/impersonation-tokens" }],
  },
]

export function getPageTitle(pathname: string): string {
  for (const group of dashboardNav) {
    for (const item of group.items) {
      if (item.href === pathname) return item.title
    }
  }
  return "Dashboard"
}
