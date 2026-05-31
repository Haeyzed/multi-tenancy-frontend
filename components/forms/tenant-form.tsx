"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { EnumSelect } from "@/components/shared/enum-select"
import { BILLING_CYCLES, TENANT_STATUSES } from "@/lib/api/central/enums"
import type { TenantResource } from "@/lib/api/central/types"
import type { TenantPayload } from "@/lib/api/central/requests"

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  domain: z.string().min(1),
  status: z.enum(TENANT_STATUSES).optional(),
  plan_id: z.string().nullable().optional(),
  billing_cycle: z.enum(BILLING_CYCLES),
  owner_email: z.string().email(),
  owner_name: z.string().min(1),
})

type FormValues = z.infer<typeof schema>

interface TenantFormProps {
  item?: TenantResource | null
  onSubmit: (payload: TenantPayload) => Promise<void>
  isSubmitting: boolean
}

export function TenantForm({ item, onSubmit, isSubmitting }: TenantFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name ?? "",
      slug: item?.slug ?? "",
      domain: item?.domain ?? "",
      status: item?.status ?? "pending",
      plan_id: item?.plan_id ?? "",
      billing_cycle: item?.billing_cycle ?? "monthly",
      owner_email: item?.owner_email ?? "",
      owner_name: item?.owner_name ?? "",
    },
  })

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={form.handleSubmit((values) =>
        onSubmit({
          ...values,
          plan_id: values.plan_id || null,
        }),
      )}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register("name")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...form.register("slug")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="domain">Domain</Label>
        <Input id="domain" {...form.register("domain")} />
      </div>
      <EnumSelect
        label="Status"
        values={TENANT_STATUSES}
        value={form.watch("status") ?? "pending"}
        onChange={(v) => form.setValue("status", v)}
      />
      <EnumSelect
        label="Billing cycle"
        values={BILLING_CYCLES}
        value={form.watch("billing_cycle")}
        onChange={(v) => form.setValue("billing_cycle", v)}
      />
      <div className="grid gap-2">
        <Label htmlFor="plan_id">Plan ID</Label>
        <Input id="plan_id" {...form.register("plan_id")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="owner_name">Owner name</Label>
        <Input id="owner_name" {...form.register("owner_name")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="owner_email">Owner email</Label>
        <Input id="owner_email" type="email" {...form.register("owner_email")} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : item ? "Update tenant" : "Create tenant"}
      </Button>
    </form>
  )
}
