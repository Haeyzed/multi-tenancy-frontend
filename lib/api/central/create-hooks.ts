"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query"

import type { ResourceApi } from "@/lib/api/central/resource-api"
import type { PaginationParams } from "@/lib/api/central/params"
import type { ApiResponse, PaginatedResponse } from "@/lib/api/central/types"

interface ResourceQueryKeys {
  all: readonly unknown[]
  list: (params?: PaginationParams) => readonly unknown[]
  detail: (id: string | number) => readonly unknown[]
}

export function createResourceHooks<
  T,
  Create = Partial<T>,
  Update = Partial<Create>,
>(
  keys: ResourceQueryKeys,
  api: ResourceApi<T, Create, Update>,
) {
  function useList(
    params?: PaginationParams,
    options?: Omit<
      UseQueryOptions<PaginatedResponse<T>, Error>,
      "queryKey" | "queryFn"
    >,
  ) {
    return useQuery({
      queryKey: keys.list(params),
      queryFn: () => api.list(params),
      ...options,
    })
  }

  function useDetail(
    id: string | number | null | undefined,
    options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, "queryKey" | "queryFn">,
  ) {
    return useQuery({
      queryKey: keys.detail(id!),
      queryFn: () => api.get(id!),
      enabled: id != null,
      ...options,
    })
  }

  function useCreate(
    options?: UseMutationOptions<ApiResponse<T>, Error, Create>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (payload: Create) => api.create(payload),
      onSuccess: (...args) => {
        void queryClient.invalidateQueries({ queryKey: keys.all })
        options?.onSuccess?.(...args)
      },
      ...options,
    })
  }

  function useUpdate(
    options?: UseMutationOptions<
      ApiResponse<T>,
      Error,
      { id: string | number; payload: Update }
    >,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, payload }) => api.update(id, payload),
      onSuccess: (...args) => {
        void queryClient.invalidateQueries({ queryKey: keys.all })
        options?.onSuccess?.(...args)
      },
      ...options,
    })
  }

  function useDestroy(
    options?: UseMutationOptions<ApiResponse<null>, Error, string | number>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (id: string | number) => api.destroy(id),
      onSuccess: (...args) => {
        void queryClient.invalidateQueries({ queryKey: keys.all })
        options?.onSuccess?.(...args)
      },
      ...options,
    })
  }

  return { useList, useDetail, useCreate, useUpdate, useDestroy }
}
