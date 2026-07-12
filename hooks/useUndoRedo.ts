import { useEffect } from "react"
import { useBuilderStore } from "@/store/useBuilderStore"

export function useUndoRedo() {
  const undo = useBuilderStore((s) => s.undo)
  const redo = useBuilderStore((s) => s.redo)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey
      if (!mod) return
      if (e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      if (e.key === "y" || (e.key === "z" && e.shiftKey)) {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [undo, redo])
}
