import { useBuilderStore } from "@/store/useBuilderStore"
import { TEMPLATES } from "@/templates"

export function useCurrentTemplate() {
  const templateId = useBuilderStore((s) => s.templateId)
  return TEMPLATES[templateId]
}
