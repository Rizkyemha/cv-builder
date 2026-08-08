"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

import { useBuilderStore } from "@/store/useBuilderStore"
import { TEMPLATES } from "@/templates"
import { cn } from "@/lib/utils"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function TemplateSwitcher() {
  const templateId = useBuilderStore((s) => s.templateId)
  const switchTemplate = useBuilderStore((s) => s.switchTemplate)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const current = TEMPLATES[templateId]

  function handleSwitchTemplate(id: string) {
    switchTemplate(id)
    setMenuOpen(false)
  }

  return (
    <Popover open={menuOpen} onOpenChange={setMenuOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <span className="text-muted-foreground">Template:</span>
          <span className="font-medium">{current?.label ?? templateId}</span>
          <ChevronDown size={11} className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle className="sr-only">Choose template</PopoverTitle>
          <PopoverDescription>Choose template</PopoverDescription>
        </PopoverHeader>
        {Object.values(TEMPLATES).map((t) => (
          <button
            key={t.id}
            onClick={() => handleSwitchTemplate(t.id)}
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors",
              t.id === templateId
                ? "bg-primary/30 text-primary-foreground dark:text-primary"
                : "text-foreground hover:bg-accent"
            )}
          >
            {t.label}
            {t.id === templateId && <Check size={12} />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
