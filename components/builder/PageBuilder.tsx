"use client"

import { useUndoRedo } from "@/hooks/useUndoRedo"
import { useLayout } from "@/hooks/useLayout"
import { BuilderHeader } from "@/components/builder/toolbar/BuilderHeader"
import { SectionToolbar } from "@/components/builder/toolbar/SectionToolbar"
import { BuilderCanvas } from "@/components/builder/BuilderCanvas"
import { SectionForm } from "@/components/builder/forms/SectionForm"
import { DrawerTrigger } from "@/components/builder/toolbar/DrawerToolbar"

export function PageBuilder() {
  useUndoRedo()
  useLayout()

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background">
      <BuilderHeader />
      <div className="flex flex-1 overflow-hidden">
        <SectionToolbar />
        <BuilderCanvas />
        <SectionForm />
      </div>
      <DrawerTrigger />
    </div>
  )
}
