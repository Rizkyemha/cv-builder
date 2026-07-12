"use client"

import { useState, useEffect, useRef } from "react"
import { FieldSettings } from "@/types"
import { DynamicField } from "@/components/builder/forms/DynamicField"
import { Button } from "@/components/ui/button"
import { useBuilderStore } from "@/store/useBuilderStore"

interface DynamicFormProps {
  settings: FieldSettings[]
  data: Record<string, string | boolean>
  mode: "section-mode" | "block-mode"
  selectedBlock?: {
    blockId: string
    sectionIdx: number
  }
}

export function DynamicForm({
  settings,
  data,
  mode,
  selectedBlock,
}: DynamicFormProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [reset, setReset] = useState({})
  const [local, setLocal] = useState<Record<string, string | boolean>>(() => {
    const init: Record<string, string | boolean> = {}
    for (const s of settings) {
      init[s.key] = data[s.key] ?? s.default
    }
    return init
  })
  const debounceRef = useRef<Record<string, NodeJS.Timeout>>({})

  const updateSectionData = useBuilderStore((s) => s.updateSectionData)
  const updateBlockData = useBuilderStore((s) => s.updateBlockData)
  const updateLiveDataSection = useBuilderStore((s) => s.updateLiveDataSection)
  const updateLiveDataBlock = useBuilderStore((s) => s.updateLiveDataBlock)
  const updateHistoryDataSection = useBuilderStore(
    (s) => s.updateHistoryDataSection
  )
  const updateHistoryDataBlock = useBuilderStore(
    (s) => s.updateHistoryDataBlock
  )

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      setReset(local)
    }

    return
  }, [isMounted])

  function handleChange(key: string, value: string | boolean) {
    setLocal((prev) => ({ ...prev, [key]: value }))

    mode === "section-mode"
      ? updateLiveDataSection(key, value)
      : updateLiveDataBlock(key, value)

    clearTimeout(debounceRef.current[key])
    debounceRef.current[key] = setTimeout(() => {
      mode === "section-mode"
        ? updateHistoryDataSection(key, value)
        : updateHistoryDataBlock(key, value)
    }, 500)
  }

  useEffect(() => {
    return () => {
      Object.values(debounceRef.current).forEach(clearTimeout)
    }
  }, [])

  function handleReset() {
    Object.values(debounceRef.current).forEach(clearTimeout)
    debounceRef.current = {}

    mode === "block-mode" && selectedBlock
      ? updateBlockData(selectedBlock.blockId, reset, selectedBlock.sectionIdx)
      : updateSectionData(reset)
  }

  if (settings.length === 0) {
    return (
      <p className="px-3 py-4 text-xs text-muted-foreground">
        No settings available for this section.
      </p>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-3">
        {settings.map((setting, i) => (
          <div key={setting.key}>
            <DynamicField
              setting={setting}
              value={local[setting.key] ?? setting.default}
              onChange={handleChange}
            />
            {i < settings.length - 1 && <hr className="mt-4 border-border" />}
          </div>
        ))}
      </div>

      <div className="flex shrink-0 gap-2 border-t border-border px-3 py-2.5">
        <Button
          className="w-full"
          variant="outline"
          size="sm"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
