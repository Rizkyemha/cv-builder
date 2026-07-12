"use client"

import { FieldSettings } from "@/types"
import { Label } from "@/components/builder/primitive/Label"
import {
  InputText,
  InputLink,
  InputDate,
  InputTextArea,
  InputMail,
  InputPhone,
  InputLocation,
} from "@/components/builder/primitive/Input"
import { Select } from "@/components/builder/primitive/Select"

import { cn } from "@/lib/utils"

interface DynamicFieldProps {
  setting: FieldSettings
  value: string | boolean
  onChange: (key: string, value: string | boolean) => void
}

export function DynamicField({ setting, value, onChange }: DynamicFieldProps) {
  const { key, label, type, options, placeholder } = setting

  return (
    <div className="space-y-1">
      <Label htmlFor={key}>{label}</Label>

      {type === "text" && (
        <InputText
          id={key}
          value={value as string}
          placeholder={placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {type === "url" && (
        <InputLink
          id={key}
          value={value as string}
          placeholder={placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {type === "date" && (
        <InputDate
          id={key}
          value={value as string}
          placeholder={placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {type === "phone" && (
        <InputPhone
          id={key}
          value={value as string}
          placeholder={placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {type === "email" && (
        <InputMail
          id={key}
          value={value as string}
          placeholder={placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {type === "location" && (
        <InputLocation
          id={key}
          value={value as string}
          placeholder={placeholder}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {type === "textarea" && (
        <InputTextArea
          id={key}
          value={value as string}
          placeholder={placeholder}
          rows={3}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {type === "select" && (
        <Select
          value={value as string}
          onValueChange={(val) => onChange(key, val)}
          options={options || []}
        />
      )}

      {type === "toggle" && (
        <button
          type="button"
          role="switch"
          aria-checked={value as boolean}
          onClick={() => onChange(key, !(value as boolean))}
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
            value ? "bg-blue-600" : "bg-border"
          )}
        >
          <span
            className={cn(
              "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
              value ? "translate-x-4" : "translate-x-0.5"
            )}
          />
        </button>
      )}
    </div>
  )
}
