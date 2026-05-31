import { AppProviders } from "@/providers/app-providers"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Toaster } from "@/components/ui/sonner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <DashboardShell>{children}</DashboardShell>
      <Toaster richColors closeButton position="top-right" />
    </AppProviders>
  )
}
