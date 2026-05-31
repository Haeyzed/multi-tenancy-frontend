"use client"

import { useEffect } from "react"
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { EnumSelect } from "@/components/shared/enum-select"
import { titleCase } from "@/lib/format"

export type FieldConfig<T extends FieldValues> =
  | {
      name: Path<T>
      label: string
      type: "text" | "email" | "number" | "date" | "datetime-local" | "password"
      placeholder?: string
    }
  | {
      name: Path<T>
      label: string
      type: "textarea"
      placeholder?: string
    }
  | {
      name: Path<T>
      label: string
      type: "enum"
      values: readonly string[]
    }
  | {
      name: Path<T>
      label: string
      type: "boolean"
    }

interface DynamicFormProps<T extends FieldValues> {
  schema: z.ZodType<T>
  fields: FieldConfig<T>[]
  defaultValues: DefaultValues<T>
  onSubmit: (values: T) => Promise<void>
  isSubmitting: boolean
  submitLabel?: string
  item?: Partial<T> | null
}

export function DynamicForm<T extends FieldValues>({
  schema,
  fields,
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save",
  item,
}: DynamicFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema) as never,
    defaultValues,
  })

  useEffect(() => {
    if (item) {
      form.reset({ ...defaultValues, ...item } as DefaultValues<T>)
    } else {
      form.reset(defaultValues)
    }
  }, [item, defaultValues, form])

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={form.handleSubmit((values) => onSubmit(values))}
    >
      {fields.map((field) => {
        if (field.type === "boolean") {
          return (
            <div key={String(field.name)} className="flex items-center justify-between">
              <Label htmlFor={String(field.name)}>{field.label}</Label>
              <Switch
                id={String(field.name)}
                checked={Boolean(form.watch(field.name))}
                onCheckedChange={(checked) => form.setValue(field.name, checked as never)}
              />
            </div>
          )
        }

        if (field.type === "enum") {
          return (
            <EnumSelect
              key={String(field.name)}
              label={field.label}
              values={field.values}
              value={(form.watch(field.name) as string) ?? ""}
              onChange={(value) => form.setValue(field.name, value as never)}
            />
          )
        }

        if (field.type === "textarea") {
          return (
            <div key={String(field.name)} className="grid gap-2">
              <Label htmlFor={String(field.name)}>{field.label}</Label>
              <Textarea
                id={String(field.name)}
                placeholder={field.placeholder}
                {...form.register(field.name)}
              />
            </div>
          )
        }

        return (
          <div key={String(field.name)} className="grid gap-2">
            <Label htmlFor={String(field.name)}>{field.label}</Label>
            <Input
              id={String(field.name)}
              type={field.type}
              placeholder={field.placeholder ?? titleCase(String(field.name))}
              {...form.register(field.name, {
                valueAsNumber: field.type === "number",
              })}
            />
          </div>
        )
      })}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : submitLabel}
      </Button>
    </form>
  )
}
