"use client"

import { useRef, useState } from "react"
import {
  Undo2,
  Redo2,
  Download,
  ChevronDown,
  Upload,
  FileJson,
  FileImage,
  FileCode,
  FileText,
  Loader2,
  ExternalLink,
  SquareMousePointer,
  SquareDashedMousePointer,
} from "lucide-react"
import { useBuilderStore } from "@/store/useBuilderStore"
import { useExport, ExportFormat } from "@/hooks/useExport"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TemplateSwitcher } from "./TemplateSwitcher"
import { Tooltip } from "@/components/primitive/Tooltip"

const EXPORT_OPTIONS: {
  format: ExportFormat
  label: string
  icon: React.FC<{ size: number }>
}[] = [
  { format: "pdf", label: "Download PDF", icon: FileText },
  { format: "image", label: "Download Image", icon: FileImage },
  { format: "html", label: "Download HTML", icon: FileCode },
  { format: "json", label: "Save as JSON", icon: FileJson },
]

export function BuilderHeader() {
  const inspectorOn = useBuilderStore((s) => s.inspectorOn)
  const setInspectorOn = useBuilderStore((s) => s.setInspectorOn)
  const undo = useBuilderStore((s) => s.undo)
  const redo = useBuilderStore((s) => s.redo)
  const canUndo = useBuilderStore((s) => s.canUndo())
  const canRedo = useBuilderStore((s) => s.canRedo())
  const historyPtr = useBuilderStore((s) => s.historyPtr)
  const historyLen = useBuilderStore((s) => s.history.length)

  const { run, loading, loadFromJSON } = useExport()
  const [menuOpen, setMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function openPreview() {
    const sections = useBuilderStore.getState().sections
    const templateId = useBuilderStore.getState().templateId
    sessionStorage.setItem(
      "cv-builder-preview",
      JSON.stringify({ sections, templateId })
    )
    window.open("/preview", "_blank")
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) loadFromJSON(file)
    e.target.value = ""
  }

  return (
    <header className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-card px-3">
      <span className="text-sm font-semibold text-foreground">CV Builder</span>

      <div className="mx-1 h-5 w-px bg-border" />

      <TemplateSwitcher />

      <div className="mx-1 h-5 w-px bg-border" />
      <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted/40 px-1 py-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
        >
          <Undo2 size={13} />
        </Button>
        <span className="min-w-[36px] px-1 text-center text-[10px] text-muted-foreground tabular-nums">
          {historyPtr} / {historyLen - 1}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
        >
          <Redo2 size={13} />
        </Button>
      </div>

      <div className="flex-1" />

      <Tooltip
        content={inspectorOn ? "Turn off inspector" : "Turn on inspector"}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInspectorOn(!inspectorOn)}
        >
          {inspectorOn ? (
            <SquareDashedMousePointer size={13} />
          ) : (
            <SquareMousePointer size={13} />
          )}
        </Button>
      </Tooltip>

      {/* Preview in new tab */}
      <Button variant="outline" size="sm" onClick={openPreview}>
        <ExternalLink size={13} /> Preview
      </Button>

      {/* Import JSON */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={13} /> Import
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />

      {/* Export dropdown */}
      <div className="relative">
        <Button
          size="sm"
          onClick={() => setMenuOpen((v) => !v)}
          disabled={!!loading}
        >
          {loading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Download size={13} />
          )}
          Export
          <ChevronDown size={11} />
        </Button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute top-full right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
              {EXPORT_OPTIONS.map(({ format, label, icon: Icon }) => (
                <button
                  key={format}
                  disabled={!!loading}
                  onClick={() => {
                    run(format)
                    setMenuOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-accent",
                    "disabled:pointer-events-none disabled:opacity-40"
                  )}
                >
                  <Icon size={13} />
                  {label}
                  {loading === format && (
                    <Loader2 size={11} className="ml-auto animate-spin" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  )
}
