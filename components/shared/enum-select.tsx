"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { titleCase } from "@/lib/format"

interface EnumSelectProps<T extends string> {
  label: string
  values: readonly T[]
  value: T | ""
  onChange: (value: T) => void
  placeholder?: string
  disabled?: boolean
}

export function EnumSelect<T extends string>({
  label,
  values,
  value,
  onChange,
  placeholder = "Select…",
  disabled,
}: EnumSelectProps<T>) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Select
        value={value || undefined}
        onValueChange={(v) => onChange(v as T)}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values.map((item) => (
            <SelectItem key={item} value={item}>
              {titleCase(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
