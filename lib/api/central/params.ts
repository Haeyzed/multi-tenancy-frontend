export interface PaginationParams {
  per_page?: number
  page?: number
}

export function toSearchParams(
  params?: Record<string, string | number | boolean | undefined>,
): Record<string, string | number> {
  if (!params) return {}
  const out: Record<string, string | number> = {}
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      out[key] = typeof value === "boolean" ? (value ? 1 : 0) : value
    }
  }
  return out
}
