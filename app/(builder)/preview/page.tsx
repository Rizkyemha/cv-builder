"use client"

import { useEffect, useState } from "react"
import { Section } from "@/types"
import { ModernPreview } from "@/templates/modern/preview"
import { useBuilderStore } from "@/store/useBuilderStore"
import { TEMPLATES_PREVIEW, TemplateId } from "@/templates"

export default function PreviewPage() {
  const setEditorMode = useBuilderStore((s) => s.setEditorMode)
  const [sections, setSections] = useState<Section[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [templateId, setTemplateId] = useState<TemplateId>("modern")

  useEffect(() => {
    // PageBuilder writes to sessionStorage before opening tab
    const raw = sessionStorage.getItem("cv-builder-preview")
    if (!raw) return
    try {
      const data = JSON.parse(raw)
      setEditorMode(false)
      setSections(data.sections ?? [])
      const parsedTemplateId =
        typeof data.templateId === "string" &&
        data.templateId in TEMPLATES_PREVIEW
          ? (data.templateId as TemplateId)
          : "modern"
      setTemplateId(parsedTemplateId)
    } catch {
      console.error("Failed to parse preview data")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // pick renderer based on templateId
  const Preview = TEMPLATES_PREVIEW[templateId] || ModernPreview

  return (
    <div className="flex min-h-screen justify-center bg-zinc-100 py-8">
      <div style={{ width: 794 }}>
        {isLoading ? <Loading /> : <Preview sections={sections} />}
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  )
}
