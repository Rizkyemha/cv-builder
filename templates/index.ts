import { TemplateDef } from "@/types"
import { modernTemplate } from "./modern/config"
import { atsTemplate } from "./ats-friendly/config"
import { ModernPreview } from "./modern/preview"
import { AtsPreview } from "./ats-friendly/preview"

export const TEMPLATES: Record<string, TemplateDef> = {
  modern: modernTemplate,
  ats: atsTemplate,
  // minimal: minimalTemplate,  ← tambah template baru di sini wok
} as const

export const TEMPLATES_PREVIEW = {
  modern: ModernPreview,
  ats: AtsPreview,
} as const

export type TemplateId = keyof typeof TEMPLATES_PREVIEW
