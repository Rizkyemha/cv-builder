"use client"

import { useState } from "react"
import { useBuilderStore } from "@/store/useBuilderStore"
import { exportJSON, importJSON } from "@/lib/export/exportJSON"
import { exportHTML } from "@/lib/export/exportHTML"
import { exportImage } from "@/lib/export/exportImage"
import { exportPDF } from "@/lib/export/exportPDF"

export type ExportFormat = "json" | "html" | "image" | "pdf"

export function useExport() {
  const [loading, setLoading] = useState<ExportFormat | null>(null)

  const setEditorMode = useBuilderStore((s) => s.setEditorMode)
  const sections = useBuilderStore((s) => s.sections)
  const templateId = useBuilderStore((s) => s.templateId)
  const switchTemplate = useBuilderStore((s) => s.switchTemplate)

  async function run(format: ExportFormat) {
    setEditorMode(false)
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    )
    setLoading(format)
    try {
      switch (format) {
        case "json":
          exportJSON(templateId, sections)
          break
        case "html":
          exportHTML("cv-preview-iframe")
          break
        case "image":
          await exportImage("cv-preview-iframe")
          break
        case "pdf":
          await exportPDF(templateId, sections)
          break
      }
    } finally {
      setLoading(null)
      setEditorMode(true)
    }
  }

  async function loadFromJSON(file: File) {
    try {
      const data = await importJSON(file)
      switchTemplate(data.templateId)
      useBuilderStore.setState({ sections: data.sections })
    } catch (err) {
      console.error("Import JSON failed:", err)
    }
  }

  return { run, loading, loadFromJSON }
}
