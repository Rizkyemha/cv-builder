"use client"

import { X, Layers, Box } from "lucide-react"
import { useBuilderStore } from "@/store/useBuilderStore"
import { useCurrentTemplate } from "@/hooks/useCurrentTemplate"
import { DynamicForm } from "@/components/builder/forms/DynamicForm"
import { Button } from "@/components/ui/button"
import { Drawer } from "@/components/builder/forms/DrawerForm"
import { useLayoutStore } from "@/store/useLayoutStore"

export function SectionForm() {
  const isDesktop = useLayoutStore((s) => s.isDesktop)

  return isDesktop ? <SectionFormDesktop /> : <SectionFormMobile />
}

export function SectionFormDesktop() {
  return <SectionFormMenu />
}

export function SectionFormMobile() {
  return (
    <Drawer>
      <SectionFormMenu />
    </Drawer>
  )
}

export function SectionFormMenu() {
  const isDesktop = useLayoutStore((s) => s.isDesktop)
  const formOpen = useBuilderStore((s) => s.formOpen)
  const selectedSectionIdx = useBuilderStore((s) => s.selectedSectionIdx)
  const selectedBlockId = useBuilderStore((s) => s.selectedBlockId)
  const sections = useBuilderStore((s) => s.sections)
  const closeForm = useBuilderStore((s) => s.closeForm)

  const template = useCurrentTemplate()
  const section = sections[selectedSectionIdx]

  if (!formOpen || !section) return null

  const sectionDef = template?.sections[section.type]
  if (!sectionDef) return null

  const isBlockMode = !!selectedBlockId
  const block = isBlockMode
    ? section.blocks.find((b) => b.id === selectedBlockId)
    : null

  const settings = isBlockMode
    ? (sectionDef.blockDef?.settings ?? [])
    : sectionDef.settings

  const data = isBlockMode ? (block?.data ?? {}) : section.data

  const title = isBlockMode ? `${sectionDef.label} — item` : `${section.label}`

  return (
    <div className="flex h-full shrink-0 flex-col bg-card lg:w-70 lg:border-l lg:border-border">
      {/* Header */}
      {isDesktop && (
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
          {isBlockMode ? (
            <Box size={13} className="shrink-0 text-muted-foreground" />
          ) : (
            <Layers size={13} className="shrink-0 text-muted-foreground" />
          )}
          <span className="flex-1 truncate text-sm font-medium text-foreground">
            {title}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeForm}
            aria-label="Close"
          >
            <X size={14} />
          </Button>
        </div>
      )}

      {/* Tab strip — switch between section & block settings */}
      {sectionDef.hasBlock && (
        <div className="flex shrink-0 border-b border-border">
          <button
            onClick={() => {
              useBuilderStore.getState().closeForm()
              useBuilderStore.setState({
                selectedBlockId: null,
                formOpen: true,
              })
            }}
            className={`flex-1 border-b-2 py-1.5 text-[11px] font-medium transition-colors ${
              !isBlockMode
                ? "border-primary text-primary-foreground dark:text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Section
          </button>
          <button
            onClick={() => {
              if (!selectedBlockId && section.blocks.length > 0) {
                useBuilderStore.setState({
                  selectedBlockId: section.blocks[0].id,
                  formOpen: true,
                })
              }
            }}
            disabled={section.blocks.length === 0}
            className={`flex-1 border-b-2 py-1.5 text-[11px] font-medium transition-colors disabled:opacity-30 ${
              isBlockMode
                ? "border-primary text-primary-foreground dark:text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Item{" "}
            {isBlockMode && block
              ? `(${section.blocks.findIndex((b) => b.id === selectedBlockId) + 1}/${section.blocks.length})`
              : `(${section.blocks.length})`}
          </button>
        </div>
      )}
      {/* Form body */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DynamicForm
          key={
            isBlockMode
              ? (selectedBlockId ?? "block")
              : `section-${selectedSectionIdx}`
          }
          mode={isBlockMode ? "block-mode" : "section-mode"}
          selectedBlock={
            isBlockMode
              ? {
                  blockId: selectedBlockId,
                  sectionIdx: selectedSectionIdx,
                }
              : undefined
          }
          settings={settings}
          data={data}
        />
      </div>
    </div>
  )
}
