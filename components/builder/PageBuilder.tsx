'use client'

import { useUndoRedo } from '@/hooks/useUndoRedo'
import { BuilderHeader } from '@/components/builder/toolbar/BuilderHeader'
import { SectionToolbar } from '@/components/builder/toolbar/SectionToolbar'
import { BuilderCanvas } from '@/components/builder/BuilderCanvas'
import { SectionForm } from '@/components/builder/forms/SectionForm'

export function PageBuilder() {
  useUndoRedo()

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <BuilderHeader />
      <div className="flex flex-1 overflow-hidden">
        <SectionToolbar />
        <BuilderCanvas />
        <SectionForm />
      </div>
    </div>
  )
}
