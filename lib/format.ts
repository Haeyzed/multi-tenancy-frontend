import { format, formatDistanceToNow, parseISO } from "date-fns"

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—"
  try {
    return format(parseISO(value), "MMM d, yyyy")
  } catch {
    return value
  }
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—"
  try {
    return format(parseISO(value), "MMM d, yyyy h:mm a")
  } catch {
    return value
  }
}

export function formatRelative(value: string | null | undefined): string {
  if (!value) return "—"
  try {
    return formatDistanceToNow(parseISO(value), { addSuffix: true })
  } catch {
    return value
  }
}

export function formatCurrency(
  amount: number,
  currency = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100)
}

export function titleCase(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function truncate(value: string, length = 48): string {
  if (value.length <= length) return value
  return `${value.slice(0, length)}…`
}
