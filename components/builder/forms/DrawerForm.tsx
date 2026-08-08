"use client"

import {
  Drawer as DrawerRoot,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer"
import { useBuilderStore } from "@/store/useBuilderStore"
import { useCurrentTemplate } from "@/hooks/useCurrentTemplate"
import { Box, Layers } from "lucide-react"

export function Drawer({ children }: { children: React.ReactNode }) {
  const formOpen = useBuilderStore((s) => s.formOpen)
  const closeForm = useBuilderStore((s) => s.closeForm)
  const handleFormOpen = (open: boolean) => {
    !open && closeForm()
  }

  const selectedSectionIdx = useBuilderStore((s) => s.selectedSectionIdx)
  const selectedBlockId = useBuilderStore((s) => s.selectedBlockId)
  const sections = useBuilderStore((s) => s.sections)

  const template = useCurrentTemplate()
  const section = sections[selectedSectionIdx]

  if (!formOpen || !section) return null

  const sectionDef = template?.sections[section.type]
  if (!sectionDef) return null

  const isBlockMode = !!selectedBlockId
  const title = isBlockMode ? `${sectionDef.label} — item` : `${section.label}`

  return (
    <div className="flex flex-wrap gap-2">
      <DrawerRoot
        key="drawer-form"
        direction="bottom"
        open={formOpen}
        onOpenChange={handleFormOpen}
      >
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:h-[70vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader className="flex items-start">
            <div className="flex shrink-0 items-center gap-2 px-3 py-2">
              {isBlockMode ? (
                <Box size={13} className="shrink-0 text-muted-foreground" />
              ) : (
                <Layers size={13} className="shrink-0 text-muted-foreground" />
              )}
              <span className="flex-1 truncate text-sm font-medium text-foreground">
                {title}
              </span>
            </div>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto px-4">{children}</div>
        </DrawerContent>
      </DrawerRoot>
    </div>
  )
}
