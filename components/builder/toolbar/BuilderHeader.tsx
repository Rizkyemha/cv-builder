"use client"

import { useRef, useState } from "react"
import {
  Undo2,
  Redo2,
  Download,
  Upload,
  FileJson,
  FileImage,
  FileCode,
  FileText,
  Loader2,
  ExternalLink,
  SquareMousePointer,
  SquareDashedMousePointer,
  Ellipsis,
} from "lucide-react"

import { useBuilderStore } from "@/store/useBuilderStore"
import { useLayoutStore } from "@/store/useLayoutStore"
import { useExport, ExportFormat } from "@/hooks/useExport"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tooltip } from "@/components/primitive/Tooltip"
import { TemplateSwitcher } from "@/components/builder/toolbar/TemplateSwitcher"

// -- CONSTANT ----------------------

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

// -- COMPONENT ----------------------

export function BuilderHeader() {
  const isDesktop = useLayoutStore((s) => s.isDesktop)

  return (
    <header className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-card px-3">
      <span className="text-sm font-semibold text-foreground text-primary">
        CV Builder
      </span>

      <div className="mx-1 h-5 w-px bg-border" />

      <TemplateSwitcher />
      {!isDesktop && <div className="grow" />}
      <Utility />
    </header>
  )
}

const Utility = () => {
  const isDesktop = useLayoutStore((s) => s.isDesktop)

  return isDesktop ? <UtilityDesktop /> : <UtilityMobile />
}

const UtilityDesktop = () => {
  return (
    <>
      <UndoRedoButton />
      <div className="flex-1" />
      <InspectorButton />
      <PreviewButton />
      <ImportButton />
      <ExportButton />
    </>
  )
}

const UtilityMobile = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit bg-card shadow-lg"
        align="end"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col">
          <UndoRedoButton />
          <InspectorButton />
          <PreviewButton />
          <ImportButton />
          <ExportButton />
        </div>
      </PopoverContent>
    </Popover>
  )
}

const UndoRedoButton = () => {
  const undo = useBuilderStore((s) => s.undo)
  const redo = useBuilderStore((s) => s.redo)
  const canUndo = useBuilderStore((s) => s.canUndo())
  const canRedo = useBuilderStore((s) => s.canRedo())
  const historyPtr = useBuilderStore((s) => s.historyPtr)
  const historyLen = useBuilderStore((s) => s.history.length)
  const isDesktop = useLayoutStore((s) => s.isDesktop)

  return (
    <div className="flex flex-col bg-muted/40 lg:flex-row lg:items-center lg:gap-0.5 lg:rounded-md lg:border lg:border-border lg:px-1 lg:py-0.5">
      <Button
        variant={isDesktop ? "ghost" : "outline"}
        size={isDesktop ? "icon" : "sm"}
        onClick={undo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
        aria-label="Undo"
      >
        <Undo2 size={13} />
      </Button>
      {isDesktop && (
        <span className="min-w-9 px-1 text-center text-[10px] text-muted-foreground tabular-nums">
          {historyPtr} / {historyLen - 1}
        </span>
      )}
      <Button
        variant={isDesktop ? "ghost" : "outline"}
        size={isDesktop ? "icon" : "sm"}
        onClick={redo}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
        aria-label="Redo"
      >
        <Redo2 size={13} />
      </Button>
    </div>
  )
}

const InspectorButton = () => {
  const inspectorOn = useBuilderStore((s) => s.inspectorOn)
  const setInspectorOn = useBuilderStore((s) => s.setInspectorOn)

  return (
    <Tooltip content={inspectorOn ? "Turn off inspector" : "Turn on inspector"}>
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
  )
}

const PreviewButton = () => {
  const isDesktop = useLayoutStore((s) => s.isDesktop)
  const sections = useBuilderStore((s) => s.sections)
  const templateId = useBuilderStore((s) => s.templateId)

  function openPreview() {
    sessionStorage.setItem(
      "cv-builder-preview",
      JSON.stringify({ sections, templateId })
    )
    window.open("/preview", "_blank")
  }

  return (
    <Button variant="outline" size="sm" onClick={openPreview}>
      <ExternalLink size={13} /> {isDesktop && "Preview"}
    </Button>
  )
}

const ImportButton = () => {
  const isDesktop = useLayoutStore((s) => s.isDesktop)
  const { loadFromJSON } = useExport()
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) loadFromJSON(file)
    e.target.value = ""
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={13} /> {isDesktop && "Import"}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />
    </>
  )
}

const ExportButton = () => {
  const isDesktop = useLayoutStore((s) => s.isDesktop)
  const { run, loading } = useExport()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        className="border-0"
        size="sm"
        onClick={() => setMenuOpen((v) => !v)}
        disabled={!!loading}
      >
        {loading ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <Download size={13} />
        )}
        {isDesktop && "Export"}
      </Button>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="bg-card px-0 shadow-lg lg:px-4">
          <DialogHeader className="px-4 lg:px-0">
            <DialogTitle>Export</DialogTitle>
            <DialogDescription className="sr-only">
              Export options cv builder
            </DialogDescription>
          </DialogHeader>
          <div>
            {EXPORT_OPTIONS.map(({ format, label, icon: Icon }) => (
              <button
                key={format}
                disabled={!!loading}
                onClick={() => {
                  run(format)
                  setMenuOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2 text-left text-xs text-foreground transition-colors hover:bg-accent",
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
        </DialogContent>
      </Dialog>
    </div>
  )
}
