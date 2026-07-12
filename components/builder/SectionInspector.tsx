"use client"

import { cn } from "@/lib/utils"
import { useBuilderStore } from "@/store/useBuilderStore"

interface SectionInspectorProps {
  idx: number
  sectionName?: string
  children: React.ReactNode
}

export function SectionInspector({
  idx,
  sectionName = "Section",
  children,
}: SectionInspectorProps) {
  const isEditorMode = useBuilderStore((s) => s.isEditorMode)
  const inspectorOn = useBuilderStore((s) => s.inspectorOn)
  const selectedSectionIdx = useBuilderStore((s) => s.selectedSectionIdx)
  const selectSection = useBuilderStore((s) => s.selectSection)

  return (
    <div
      data-state={
        isEditorMode && inspectorOn && selectedSectionIdx === idx
          ? "focused"
          : "blurred"
      }
      className={cn(
        "relative w-full cursor-pointer rounded ring-0 transition-all duration-200 data-[state=focused]:ring-2 data-[state=focused]:ring-blue-500",
        isEditorMode &&
          inspectorOn &&
          selectedSectionIdx === idx &&
          "ring-offset-2"
      )}
      onClick={(e) => {
        e.preventDefault()
        if (!inspectorOn) return
        selectSection(idx)
      }}
    >
      {isEditorMode && inspectorOn && selectedSectionIdx === idx && (
        <span className="absolute -top-2.5 left-2 rounded bg-blue-500 px-1.5 py-0.5 text-[10px] leading-none font-medium text-white">
          {sectionName}
        </span>
      )}
      {children}
    </div>
  )
}
