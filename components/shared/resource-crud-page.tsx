"use client"

import { useState, type ComponentType } from "react"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"

import {
  ResourceListPage,
  useListQueryParams,
} from "@/components/shared/resource-list-page"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ConfirmAction } from "@/components/shared/confirm-action"
import type { PaginatedResponse } from "@/lib/api/central/types"
import type { UseQueryResult } from "@tanstack/react-query"

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

interface FormProps<T, Create, Update> {
  item?: T | null
  onSubmit: (payload: Create | Update) => Promise<void>
  isSubmitting: boolean
}

interface ResourceCrudPageProps<T extends { id: string | number }, Create, Update> {
  title: string
  description?: string
  hooks: ResourceHooks<T, Create, Update>
  columns: ColumnDef<T, unknown>[]
  Form: ComponentType<FormProps<T, Create, Update>>
  getId?: (item: T) => string | number
  emptyMessage?: string
}

export function ResourceCrudPage<
  T extends { id: string | number },
  Create,
  Update = Partial<Create>,
>({
  title,
  description,
  hooks,
  columns: baseColumns,
  Form,
  getId = (item) => item.id,
  emptyMessage,
}: ResourceCrudPageProps<T, Create, Update>) {
  const params = useListQueryParams()
  const query = hooks.useList(params)
  const createMutation = hooks.useCreate()
  const updateMutation = hooks.useUpdate()
  const destroyMutation = hooks.useDestroy()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)

  const openCreate = () => {
    setEditing(null)
    setOpen(true)
  }

  const openEdit = (item: T) => {
    setEditing(item)
    setOpen(true)
  }

  const handleSubmit = async (payload: Create | Update) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({
          id: getId(editing),
          payload: payload as Update,
        })
        toast.success("Updated successfully.")
      } else {
        await createMutation.mutateAsync(payload as Create)
        toast.success("Created successfully.")
      }
      setOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed.")
    }
  }

  const handleDelete = async (item: T) => {
    try {
      await destroyMutation.mutateAsync(getId(item))
      toast.success("Deleted successfully.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed.")
    }
  }

  const actionColumns: ColumnDef<T, unknown>[] = [
    ...baseColumns,
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => openEdit(row.original)}>
            Edit
          </Button>
          <ConfirmAction
            trigger={
              <Button variant="ghost" size="sm" className="text-destructive">
                Delete
              </Button>
            }
            title="Delete record?"
            description="This action cannot be undone."
            confirmLabel="Delete"
            variant="destructive"
            isLoading={destroyMutation.isPending}
            onConfirm={() => handleDelete(row.original)}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <ResourceListPage
        title={title}
        description={description}
        columns={actionColumns}
        query={query}
        emptyMessage={emptyMessage}
        actions={
          <Button onClick={openCreate}>Add {title.slice(0, -1)}</Button>
        }
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{editing ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}</SheetTitle>
            <SheetDescription>
              {editing
                ? "Update the record details below."
                : "Fill in the details to create a new record."}
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <Form
              item={editing}
              onSubmit={handleSubmit}
              isSubmitting={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
