import { AppProviders } from "@/providers/app-providers"
import { Toaster } from "@/components/ui/sonner"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </AppProviders>
  )
}
