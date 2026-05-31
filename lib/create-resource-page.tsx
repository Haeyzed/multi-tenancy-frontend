"use client"

import type { ComponentType } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { z } from "zod"

import { DynamicForm, type FieldConfig } from "@/components/forms/dynamic-form"
import { ResourceCrudPage } from "@/components/shared/resource-crud-page"
import type { PaginatedResponse } from "@/lib/api/central/types"
import type { UseQueryResult } from "@tanstack/react-query"
import type { FieldValues } from "react-hook-form"

interface ResourceHooks<T, Create, Update> {
  useList: (params?: { page?: number; per_page?: number }) => UseQueryResult<
    PaginatedResponse<T>,
    Error
  >
  useCreate: () => {
    mutateAsync: (payload: Create) => Promise<unknown>
    isPending: boolean
  }
  useUpdate: () => {
    mutateAsync: (args: { id: string | number; payload: Update }) => Promise<unknown>
    isPending: boolean
  }
  useDestroy: () => {
    mutateAsync: (id: string | number) => Promise<unknown>
    isPending: boolean
  }
}

interface ResourceConfig<
  T extends { id: string | number },
  S extends z.ZodType<FieldValues>,
> {
  title: string
  description?: string
  hooks: ResourceHooks<T, z.infer<S>, Partial<z.infer<S>>>
  columns: ColumnDef<T, unknown>[]
  schema: S
  fields: FieldConfig<z.infer<S>>[]
  defaults: z.infer<S>
  emptyMessage?: string
}

function makeForm<S extends z.ZodType<FieldValues>>(
  schema: S,
  fields: FieldConfig<z.infer<S>>[],
  defaults: z.infer<S>,
) {
  const Form: ComponentType<{
    item?: z.infer<S> | null
    onSubmit: (payload: z.infer<S>) => Promise<void>
    isSubmitting: boolean
  }> = ({ item, onSubmit, isSubmitting }) => (
    <DynamicForm
      schema={schema}
      fields={fields}
      defaultValues={defaults}
      item={item ?? null}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  )
  return Form
}

export function createResourcePage<
  T extends { id: string | number },
  S extends z.ZodType<FieldValues>,
>(config: ResourceConfig<T, S>) {
  const Form = makeForm(config.schema, config.fields, config.defaults)

  return function ResourcePage() {
    return (
      <ResourceCrudPage
        title={config.title}
        description={config.description}
        hooks={config.hooks}
        columns={config.columns}
        Form={Form as ComponentType<{
          item?: T | null
          onSubmit: (payload: z.infer<S>) => Promise<void>
          isSubmitting: boolean
        }>}
        emptyMessage={config.emptyMessage}
      />
    )
  }
}
