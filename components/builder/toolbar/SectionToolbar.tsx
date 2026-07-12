"use client"

import {
  GripVertical,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { useBuilderStore } from "@/store/useBuilderStore"
import { useCurrentTemplate } from "@/hooks/useCurrentTemplate"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Section } from "@/types"
import { Tooltip } from "@/components/primitive/Tooltip"

// ─── Block list inside a section ─────────────────────────────────────────────

function BlockList({
  section,
  sectionIdx,
}: {
  section: Section
  sectionIdx: number
}) {
  const selectedBlockId = useBuilderStore((s) => s.selectedBlockId)
  const selectedSectionIdx = useBuilderStore((s) => s.selectedSectionIdx)
  const selectBlock = useBuilderStore((s) => s.selectBlock)
  const addBlock = useBuilderStore((s) => s.addBlock)
  const deleteBlock = useBuilderStore((s) => s.deleteBlock)
  const duplicateBlock = useBuilderStore((s) => s.duplicateBlock)
  const moveBlock = useBuilderStore((s) => s.moveBlock)
  const template = useCurrentTemplate()
  const def = template?.sections[section.type]
  const isActive = sectionIdx === selectedSectionIdx

  if (!isActive || !def?.hasBlock) return null

  const maxReached = def.blockDef?.maxBlocks
    ? section.blocks.length >= def.blockDef.maxBlocks
    : false

  return (
    <div className={"mt-0.5 mr-1 space-y-0.5 pb-1 pl-5"}>
      {section.blocks.map((block, bi) => {
        const isSelected = block.id === selectedBlockId
        // use first text field value as label
        const firstTextKey = def.blockDef?.settings.find(
          (s) => s.type === "text"
        )?.key
        const preview = firstTextKey
          ? (block.data[firstTextKey] as string) || `Item ${bi + 1}`
          : `Item ${bi + 1}`

        return (
          <div
            key={block.id}
            className={cn(
              "group flex cursor-pointer items-center gap-1 rounded-md border border-transparent px-2 py-1 text-xs transition-colors",
              isSelected
                ? "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-muted-foreground hover:bg-accent"
            )}
            onClick={() => {
              selectBlock(block.id)
            }}
          >
            <GripVertical
              size={10}
              className="shrink-0 text-muted-foreground"
            />
            <span className="flex-1 truncate">{preview}</span>
            <span className="hidden items-center gap-0.5 group-hover:flex">
              <Tooltip content="Move up">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    moveBlock(block.id, "up", sectionIdx)
                  }}
                  disabled={bi === 0}
                  className="p-0.5 hover:text-foreground disabled:opacity-20"
                >
                  <ArrowUp size={12} />
                </button>
              </Tooltip>
              <Tooltip content="Move down">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    moveBlock(block.id, "down", sectionIdx)
                  }}
                  disabled={bi === section.blocks.length - 1}
                  className="p-0.5 hover:text-foreground disabled:opacity-20"
                >
                  <ArrowDown size={12} />
                </button>
              </Tooltip>
              <Tooltip content="Duplicate">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateBlock(block.id, sectionIdx)
                  }}
                  className="p-0.5 hover:text-foreground"
                >
                  <Copy size={12} />
                </button>
              </Tooltip>
              <Tooltip content="Delete">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteBlock(block.id, sectionIdx)
                  }}
                  className="p-0.5 hover:text-red-500"
                >
                  <Trash2 size={12} />
                </button>
              </Tooltip>
            </span>
          </div>
        )
      })}

      <button
        disabled={maxReached}
        onClick={() => addBlock(sectionIdx)}
        className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      >
        <Plus size={10} /> Add item{" "}
        {maxReached && `(max ${def.blockDef?.maxBlocks})`}
      </button>
    </div>
  )
}

// ─── Add section menu ─────────────────────────────────────────────────────────

function AddSectionMenu({ onClose }: { onClose: () => void }) {
  const addSection = useBuilderStore((s) => s.addSection)
  const template = useCurrentTemplate()
  if (!template) return null

  return (
    <div className="absolute top-30 right-0 bottom-full left-0 z-10 mb-1 h-50 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
      <p className="border-b border-border px-3 py-2 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
        Add section
      </p>
      {template.sectionTypes.map((type) => {
        const def = template.sections[type]
        return (
          <button
            key={type}
            onClick={() => {
              addSection(type)
              onClose()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-accent"
          >
            {def.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Main SectionToolbar ──────────────────────────────────────────────────────

export function SectionToolbar() {
  const sections = useBuilderStore((s) => s.sections)
  const selectedSectionIdx = useBuilderStore((s) => s.selectedSectionIdx)
  const selectSection = useBuilderStore((s) => s.selectSection)
  const deleteSection = useBuilderStore((s) => s.deleteSection)
  const duplicateSection = useBuilderStore((s) => s.duplicateSection)
  const moveSection = useBuilderStore((s) => s.moveSection)
  const toggleSectionVisible = useBuilderStore((s) => s.toggleSectionVisible)

  const template = useCurrentTemplate()

  const [addMenuOpen, setAddMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({})

  const atTop = selectedSectionIdx === 0
  const atBottom = selectedSectionIdx === sections.length - 1
  const onlyOne = sections.length === 1

  function toggleCollapse(i: number) {
    setCollapsed((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <div className="relative flex h-full w-70 shrink-0 flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-2.5 py-2">
        <span className="text-[12px] font-semibold tracking-wide text-muted-foreground uppercase">
          Sections
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAddMenuOpen((v) => !v)}
        >
          <Plus size={12} /> Add
        </Button>
      </div>

      {/* Section list */}
      <div className="flex-1 space-y-0.5 overflow-y-auto py-1.5">
        {sections.map((section, i) => {
          const selected = i === selectedSectionIdx
          const isCollapsed = collapsed[i]
          const def = template?.sections[section.type]
          const hasBlock = !!def?.hasBlock

          return (
            <div key={section.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => selectSection(i)}
                onKeyDown={(e) => e.key === "Enter" && selectSection(i)}
                className={cn(
                  "group mx-1 flex cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-[13px] transition-colors",
                  selected
                    ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                    : "text-foreground hover:bg-accent",
                  !section.visible && "opacity-50"
                )}
              >
                <GripVertical
                  size={12}
                  className="shrink-0 text-muted-foreground"
                />

                {/* collapse toggle for sections with blocks */}
                {hasBlock ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCollapse(i)
                    }}
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label={isCollapsed ? "Expand" : "Collapse"}
                  >
                    {isCollapsed ? (
                      <ChevronRight size={11} />
                    ) : (
                      <ChevronDown size={11} />
                    )}
                  </button>
                ) : (
                  <span className="w-3 shrink-0" />
                )}

                <span className="flex-1 truncate">{section.label}</span>

                <Tooltip content={section.visible ? "Hide" : "Show"}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSectionVisible(i)
                    }}
                    className="shrink-0 p-0.5 text-muted-foreground hover:text-foreground"
                    aria-label={section.visible ? "Hide" : "Show"}
                  >
                    {section.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                </Tooltip>
              </div>

              {/* Block list */}
              {!isCollapsed && <BlockList section={section} sectionIdx={i} />}
            </div>
          )
        })}
      </div>

      {/* Section actions */}
      <div className="shrink-0 space-y-1.5 border-t border-border p-2">
        <p className="px-1 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
          Actions
        </p>
        <div className="flex flex-wrap gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => moveSection("up")}
            disabled={atTop}
          >
            <ArrowUp size={11} /> Up
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => moveSection("down")}
            disabled={atBottom}
          >
            <ArrowDown size={11} /> Down
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <Button variant="outline" size="sm" onClick={duplicateSection}>
            <Copy size={11} /> Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSectionVisible()}
          >
            <EyeOff size={11} /> Hide
          </Button>
        </div>
        <Button
          size="sm"
          onClick={deleteSection}
          disabled={onlyOne}
          className="w-full justify-center"
        >
          <Trash2 size={11} /> Delete section
        </Button>
      </div>

      {/* Add section menu */}
      {addMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-9"
            onClick={() => setAddMenuOpen(false)}
          />
          <AddSectionMenu onClose={() => setAddMenuOpen(false)} />
        </>
      )}
    </div>
  )
}
