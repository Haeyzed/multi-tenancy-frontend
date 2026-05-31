"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { z } from "zod"

import { DynamicForm, type FieldConfig } from "@/components/forms/dynamic-form"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { BILLING_CYCLES, PAYMENT_PROVIDERS } from "@/lib/api/central/enums"
import { useTenantOnboard } from "@/lib/api/central/hooks"
import { onboardSchema } from "@/lib/schemas"

type OnboardForm = z.infer<typeof onboardSchema>

const fields: FieldConfig<OnboardForm>[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "domain", label: "Domain", type: "text" },
  { name: "plan_id", label: "Plan ID", type: "text" },
  { name: "billing_cycle", label: "Billing cycle", type: "enum", values: BILLING_CYCLES },
  { name: "owner_name", label: "Owner name", type: "text" },
  { name: "owner_email", label: "Owner email", type: "email" },
  { name: "payment_provider", label: "Payment provider", type: "enum", values: PAYMENT_PROVIDERS },
]

const defaults: OnboardForm = {
  name: "",
  slug: "",
  domain: "",
  plan_id: "",
  billing_cycle: "monthly",
  owner_name: "",
  owner_email: "",
  payment_provider: "stripe",
}

export default function TenantOnboardPage() {
  const router = useRouter()
  const onboard = useTenantOnboard()

  async function handleSubmit(payload: OnboardForm) {
    try {
      await onboard.mutateAsync(payload)
      toast.success("Tenant onboarded successfully.")
      router.push("/tenants")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Onboard failed.")
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <PageHeader
        title="Onboard tenant"
        description="Create a new tenant with billing and owner details."
      />
      <Card>
        <CardContent className="pt-6">
          <DynamicForm
            schema={onboardSchema}
            fields={fields}
            defaultValues={defaults}
            onSubmit={handleSubmit}
            isSubmitting={onboard.isPending}
            submitLabel="Onboard tenant"
          />
        </CardContent>
      </Card>
    </div>
  )
}
