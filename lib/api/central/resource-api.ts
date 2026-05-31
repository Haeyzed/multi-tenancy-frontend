import { api, request } from "@/lib/api/client"
import type { ApiResponse, PaginatedResponse } from "@/lib/api/central/types"
import {
  toSearchParams,
  type PaginationParams,
} from "@/lib/api/central/params"

export interface ResourceApi<T, Create = Partial<T>, Update = Partial<Create>> {
  list: (params?: PaginationParams) => Promise<PaginatedResponse<T>>
  get: (id: string | number) => Promise<ApiResponse<T>>
  create: (payload: Create) => Promise<ApiResponse<T>>
  update: (id: string | number, payload: Update) => Promise<ApiResponse<T>>
  destroy: (id: string | number) => Promise<ApiResponse<null>>
}

export function createResourceApi<
  T,
  Create = Partial<T>,
  Update = Partial<Create>,
>(path: string): ResourceApi<T, Create, Update> {
  return {
    list: (params) =>
      request<PaginatedResponse<T>>({
        url: path,
        method: "GET",
        params: toSearchParams(params),
      }),
    get: (id) =>
      request<ApiResponse<T>>({ url: `${path}/${id}`, method: "GET" }),
    create: (payload) =>
      request<ApiResponse<T>>({ url: path, method: "POST", data: payload }),
    update: (id, payload) =>
      request<ApiResponse<T>>({
        url: `${path}/${id}`,
        method: "PUT",
        data: payload,
      }),
    destroy: (id) =>
      request<ApiResponse<null>>({ url: `${path}/${id}`, method: "DELETE" }),
  }
}

export async function postAction<T = null>(
  path: string,
  payload?: unknown,
): Promise<ApiResponse<T>> {
  return request<ApiResponse<T>>({ url: path, method: "POST", data: payload })
}

export async function getAction<T>(
  path: string,
  params?: PaginationParams,
): Promise<T> {
  return request<T>({
    url: path,
    method: "GET",
    params: toSearchParams(params),
  })
}

export { api }
