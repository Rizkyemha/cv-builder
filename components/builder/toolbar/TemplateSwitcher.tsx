"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { useBuilderStore } from "@/store/useBuilderStore"
import { TEMPLATES } from "@/templates"
import { cn } from "@/lib/utils"

export function TemplateSwitcher() {
  const templateId = useBuilderStore((s) => s.templateId)
  const switchTemplate = useBuilderStore((s) => s.switchTemplate)
  const [open, setOpen] = useState(false)

  const current = TEMPLATES[templateId]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground transition-colors hover:bg-accent"
      >
        <span className="text-muted-foreground">Template:</span>
        <span className="font-medium">{current?.label ?? templateId}</span>
        <ChevronDown size={11} className="text-muted-foreground" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
            <p className="border-b border-border px-3 py-2 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
              Choose template
            </p>
            {Object.values(TEMPLATES).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  switchTemplate(t.id)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors",
                  t.id === templateId
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "text-foreground hover:bg-accent"
                )}
              >
                {t.label}
                {t.id === templateId && <Check size={12} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
