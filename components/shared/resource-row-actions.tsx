"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCustomActions, useSubscriptionActions } from "@/lib/api/central/hooks"
import type { SubscriptionResource } from "@/lib/api/central/types"

export function SubscriptionRowActions({ item }: { item: SubscriptionResource }) {
  const actions = useSubscriptionActions()

  const run = async (label: string, fn: () => Promise<unknown>) => {
    try {
      await fn()
      toast.success(`${label} successful.`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${label} failed.`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm">Actions</Button>}
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => void run("Renewal", () => actions.renew.mutateAsync(item.id))}
        >
          Renew
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void run("Cancellation", () => actions.cancel.mutateAsync({ id: item.id }))}
        >
          Cancel
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            void run("Reactivation", () => actions.reactivate.mutateAsync(item.id))
          }
        >
          Reactivate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DomainRowActions({ id }: { id: number }) {
  const { domainPrimary, domainVerify } = useCustomActions()

  const run = async (label: string, fn: () => Promise<unknown>) => {
    try {
      await fn()
      toast.success(`${label} successful.`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${label} failed.`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm">Actions</Button>}
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => void run("Primary set", () => domainPrimary.mutateAsync(id))}
        >
          Set primary
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void run("Verification", () => domainVerify.mutateAsync(id))}
        >
          Verify
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ApiKeyRowActions({ id }: { id: number }) {
  const { apiKeyRevoke } = useCustomActions()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        void apiKeyRevoke.mutateAsync(id).then(
          () => toast.success("API key revoked."),
          (error: Error) => toast.error(error.message),
        )
      }
    >
      Revoke
    </Button>
  )
}

export function ErrorLogRowActions({ id }: { id: number }) {
  const { errorLogResolve } = useCustomActions()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        void errorLogResolve.mutateAsync(id).then(
          () => toast.success("Error log resolved."),
          (error: Error) => toast.error(error.message),
        )
      }
    >
      Resolve
    </Button>
  )
}
