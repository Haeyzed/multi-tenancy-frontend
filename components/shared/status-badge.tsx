import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { titleCase } from "@/lib/format"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-secondary-foreground",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
        warning:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
        danger:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
        info: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
        muted: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const STATUS_VARIANTS: Record<string, VariantProps<typeof statusBadgeVariants>["variant"]> = {
  active: "success",
  paid: "success",
  succeeded: "success",
  healthy: "success",
  resolved: "success",
  closed: "muted",
  verified: "success",
  published: "success",
  trialing: "info",
  open: "info",
  pending: "warning",
  past_due: "warning",
  warning: "warning",
  in_progress: "info",
  suspended: "warning",
  cancelled: "muted",
  failed: "danger",
  error: "danger",
  critical: "danger",
  uncollectible: "danger",
  expired: "muted",
  draft: "muted",
  void: "muted",
  deleted: "muted",
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = STATUS_VARIANTS[status] ?? "default"

  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {titleCase(status)}
    </span>
  )
}
