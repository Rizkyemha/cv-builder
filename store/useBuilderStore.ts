import { create } from "zustand"
import { Section, Block, HistoryEntry, TemplateDef } from "@/types"
import { TEMPLATES } from "@/templates"

const MAX_HISTORY = 50

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function cloneDeep<T>(val: T): T {
  return JSON.parse(JSON.stringify(val))
}

// ─── State & Actions ─────────────────────────────────────────────────────────

interface BuilderState {
  isEditorMode: boolean
  inspectorOn: boolean

  templateId: string
  sections: Section[]
  selectedSectionIdx: number
  selectedBlockId: string | null
  formOpen: boolean
  history: HistoryEntry[]
  historyPtr: number

  // computed
  canUndo: () => boolean
  canRedo: () => boolean
  selectedSection: () => Section | null
  selectedBlock: () => Block | null
  currentTemplate: () => TemplateDef | null

  // history
  undo: () => void
  redo: () => void

  // template
  switchTemplate: (templateId: string) => void

  // builder mode
  setEditorMode: (isEditorMode: boolean) => void
  setInspectorOn: (inspectorOn: boolean) => void

  // section actions
  selectSection: (idx: number) => void
  addSection: (type: string) => void
  deleteSection: () => void
  duplicateSection: () => void
  moveSection: (dir: "up" | "down") => void
  toggleSectionVisible: (idx?: number) => void
  updateSectionData: (data: Record<string, string | boolean>) => void
  updateLiveDataSection: (key: string, data: string | boolean) => void
  updateHistoryDataSection: (key: string, data: string | boolean) => void

  // block actions
  selectBlock: (blockId: string) => void
  addBlock: (sectionIdx?: number) => void
  deleteBlock: (blockId: string, sectionIdx?: number) => void
  duplicateBlock: (blockId: string, sectionIdx?: number) => void
  moveBlock: (blockId: string, dir: "up" | "down", sectionIdx?: number) => void
  updateBlockData: (
    blockId: string,
    data: Record<string, string | boolean>,
    sectionIdx?: number
  ) => void
  updateLiveDataBlock: (key: string, data: string | boolean) => void
  updateHistoryDataBlock: (key: string, data: string | boolean) => void

  // form
  closeForm: () => void
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeEntry(state: BuilderState): HistoryEntry {
  return {
    sections: cloneDeep(state.sections),
    selectedSectionIdx: state.selectedSectionIdx,
    selectedBlockId: state.selectedBlockId,
  }
}

function pushHistory(
  state: BuilderState,
  patch: Partial<BuilderState>
): Partial<BuilderState> {
  const merged = { ...state, ...patch }
  const entry = makeEntry(merged as BuilderState)
  const trimmed = state.history.slice(0, state.historyPtr + 1)
  const next = [...trimmed, entry]
  if (next.length > MAX_HISTORY) next.shift()
  return { ...patch, history: next, historyPtr: next.length - 1 }
}

function restoreEntry(entry: HistoryEntry): Partial<BuilderState> {
  return {
    sections: cloneDeep(entry.sections),
    selectedSectionIdx: entry.selectedSectionIdx,
    selectedBlockId: entry.selectedBlockId,
    formOpen: false,
  }
}

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_TEMPLATE_ID = "modern"
const initialSections = cloneDeep(
  TEMPLATES[INITIAL_TEMPLATE_ID].defaultSections
)
const initialEntry: HistoryEntry = {
  sections: cloneDeep(initialSections),
  selectedSectionIdx: 0,
  selectedBlockId: null,
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuilderStore = create<BuilderState>((set, get) => ({
  templateId: INITIAL_TEMPLATE_ID,
  sections: initialSections,
  selectedSectionIdx: 0,
  selectedBlockId: null,
  formOpen: false,
  isEditorMode: true,
  inspectorOn: true,
  history: [initialEntry],
  historyPtr: 0,

  // ── builder mode ──
  setEditorMode: (isEditorMode) => set({ isEditorMode }),
  setInspectorOn: (inspectorOn) => set({ inspectorOn }),

  // ── computed ──

  canUndo: () => get().historyPtr > 0,
  canRedo: () => get().historyPtr < get().history.length - 1,

  selectedSection: () => {
    const { sections, selectedSectionIdx } = get()
    return sections[selectedSectionIdx] ?? null
  },

  selectedBlock: () => {
    const { sections, selectedSectionIdx, selectedBlockId } = get()
    if (!selectedBlockId) return null
    return (
      sections[selectedSectionIdx]?.blocks.find(
        (b) => b.id === selectedBlockId
      ) ?? null
    )
  },

  currentTemplate: () => TEMPLATES[get().templateId] ?? null,

  // ── history ──

  undo: () => {
    const { historyPtr, history } = get()
    if (historyPtr <= 0) return
    const ptr = historyPtr - 1
    set({ ...restoreEntry(history[ptr]), historyPtr: ptr })
  },

  redo: () => {
    const { historyPtr, history } = get()
    if (historyPtr >= history.length - 1) return
    const ptr = historyPtr + 1
    set({ ...restoreEntry(history[ptr]), historyPtr: ptr })
  },

  // ── template ──

  switchTemplate: (templateId) => {
    const template = TEMPLATES[templateId]
    if (!template) return

    const prevSections = get().sections
    const newSections = cloneDeep(template.defaultSections)

    const sections = newSections.map((newSection) => {
      const prevMatch = prevSections.find((s) => s.type === newSection.type)
      if (!prevMatch) return newSection

      const sectionDef = template.sections[newSection.type]
      const maxBlocks = sectionDef?.blockDef?.maxBlocks

      const mergedBlocks = sectionDef?.hasBlock
        ? maxBlocks
          ? prevMatch.blocks.slice(0, maxBlocks)
          : prevMatch.blocks
        : newSection.blocks

      return {
        ...newSection,
        data: { ...newSection.data, ...prevMatch.data },
        blocks: mergedBlocks,
      }
    })

    const patch = {
      templateId,
      sections,
      selectedSectionIdx: 0,
      selectedBlockId: null,
      formOpen: false,
    }
    set((s) => pushHistory(s, patch))
  },

  // ── section actions ──

  selectSection: (idx) => {
    set({ selectedSectionIdx: idx, selectedBlockId: null, formOpen: true })
  },

  addSection: (type) => {
    const state = get()
    const template = TEMPLATES[state.templateId]
    const def = template?.sections[type]
    if (!def) return

    const newSection: Section = {
      id: uid(),
      type,
      label: def.label,
      visible: true,
      data: cloneDeep(def.defaultData),
      blocks: cloneDeep(def.defaultBlocks ?? []).map((b) => ({
        ...b,
        id: uid(),
      })),
    }

    const sections = [...state.sections, newSection]
    const selectedSectionIdx = sections.length - 1
    set((s) =>
      pushHistory(s, {
        sections,
        selectedSectionIdx,
        selectedBlockId: null,
        formOpen: true,
      })
    )
  },

  deleteSection: () => {
    const state = get()
    if (state.sections.length === 1) return
    const sections = state.sections.filter(
      (_, i) => i !== state.selectedSectionIdx
    )
    const selectedSectionIdx = Math.min(
      state.selectedSectionIdx,
      sections.length - 1
    )
    set((s) =>
      pushHistory(s, {
        sections,
        selectedSectionIdx,
        selectedBlockId: null,
        formOpen: false,
      })
    )
  },

  duplicateSection: () => {
    const state = get()
    const src = state.sections[state.selectedSectionIdx]
    const copy: Section = {
      ...cloneDeep(src),
      id: uid(),
      label: src.label + " (copy)",
      blocks: cloneDeep(src.blocks).map((b) => ({ ...b, id: uid() })),
    }
    const sections = [...state.sections]
    sections.splice(state.selectedSectionIdx + 1, 0, copy)
    const selectedSectionIdx = state.selectedSectionIdx + 1
    set((s) =>
      pushHistory(s, {
        sections,
        selectedSectionIdx,
        selectedBlockId: null,
        formOpen: true,
      })
    )
  },

  moveSection: (dir) => {
    const state = get()
    const { selectedSectionIdx, sections } = state
    const targetIdx =
      dir === "up" ? selectedSectionIdx - 1 : selectedSectionIdx + 1
    if (targetIdx < 0 || targetIdx >= sections.length) return
    const next = [...sections]
    ;[next[selectedSectionIdx], next[targetIdx]] = [
      next[targetIdx],
      next[selectedSectionIdx],
    ]
    set((s) =>
      pushHistory(s, { sections: next, selectedSectionIdx: targetIdx })
    )
  },

  toggleSectionVisible: (idx) => {
    const state = get()
    const target = idx ?? state.selectedSectionIdx
    const sections = state.sections.map((s, i) =>
      i === target ? { ...s, visible: !s.visible } : s
    )
    set((s) => pushHistory(s, { sections }))
  },

  updateSectionData: (data) => {
    const state = get()
    const sections = state.sections.map((s, i) =>
      i !== state.selectedSectionIdx
        ? s
        : { ...s, data: { ...s.data, ...data } }
    )
    set((s) => pushHistory(s, { sections, formOpen: false }))
  },

  updateLiveDataSection: (key, data) => {
    const state = get()
    const sections = state.sections.map((s, i) =>
      i !== state.selectedSectionIdx
        ? s
        : { ...s, data: { ...s.data, [key]: data } }
    )
    set({ sections, formOpen: true })
  },

  updateHistoryDataSection: (key, data) => {
    const state = get()
    const sections = state.sections.map((s, i) =>
      i !== state.selectedSectionIdx
        ? s
        : { ...s, data: { ...s.data, [key]: data } }
    )
    set((s) => pushHistory(s, { sections, formOpen: true }))
  },

  // ── block actions ──

  selectBlock: (blockId) => {
    set({ selectedBlockId: blockId, formOpen: true })
  },

  addBlock: (sectionIdx) => {
    const state = get()
    const idx = sectionIdx ?? state.selectedSectionIdx
    const template = TEMPLATES[state.templateId]
    const section = state.sections[idx]
    if (!section) return
    const def = template?.sections[section.type]
    if (!def?.blockDef) return
    if (
      def.blockDef.maxBlocks &&
      section.blocks.length >= def.blockDef.maxBlocks
    )
      return

    const newBlock: Block = {
      id: uid(),
      data: cloneDeep(def.blockDef.defaultData),
    }
    const sections = state.sections.map((s, i) =>
      i !== idx ? s : { ...s, blocks: [...s.blocks, newBlock] }
    )
    set((s) =>
      pushHistory(s, {
        sections,
        selectedSectionIdx: idx,
        selectedBlockId: newBlock.id,
        formOpen: true,
      })
    )
  },

  deleteBlock: (blockId, sectionIdx) => {
    const state = get()
    const idx = sectionIdx ?? state.selectedSectionIdx
    const sections = state.sections.map((s, i) =>
      i !== idx ? s : { ...s, blocks: s.blocks.filter((b) => b.id !== blockId) }
    )
    set((s) =>
      pushHistory(s, { sections, selectedBlockId: null, formOpen: false })
    )
  },

  duplicateBlock: (blockId, sectionIdx) => {
    const state = get()
    const idx = sectionIdx ?? state.selectedSectionIdx
    const section = state.sections[idx]
    if (!section) return
    const srcIdx = section.blocks.findIndex((b) => b.id === blockId)
    if (srcIdx === -1) return
    const copy: Block = { ...cloneDeep(section.blocks[srcIdx]), id: uid() }
    const blocks = [...section.blocks]
    blocks.splice(srcIdx + 1, 0, copy)
    const sections = state.sections.map((s, i) =>
      i !== idx ? s : { ...s, blocks }
    )
    set((s) =>
      pushHistory(s, { sections, selectedBlockId: copy.id, formOpen: true })
    )
  },

  moveBlock: (blockId, dir, sectionIdx) => {
    const state = get()
    const idx = sectionIdx ?? state.selectedSectionIdx
    const section = state.sections[idx]
    if (!section) return
    const blockIdx = section.blocks.findIndex((b) => b.id === blockId)
    const targetIdx = dir === "up" ? blockIdx - 1 : blockIdx + 1
    if (targetIdx < 0 || targetIdx >= section.blocks.length) return
    const blocks = [...section.blocks]
    ;[blocks[blockIdx], blocks[targetIdx]] = [
      blocks[targetIdx],
      blocks[blockIdx],
    ]
    const sections = state.sections.map((s, i) =>
      i !== idx ? s : { ...s, blocks }
    )
    set((s) => pushHistory(s, { sections }))
  },

  updateBlockData: (blockId, data, sectionIdx) => {
    const state = get()
    const idx = sectionIdx ?? state.selectedSectionIdx
    const sections = state.sections.map((s, i) =>
      i !== idx
        ? s
        : {
            ...s,
            blocks: s.blocks.map((b) =>
              b.id !== blockId ? b : { ...b, data: { ...b.data, ...data } }
            ),
          }
    )
    set((s) => pushHistory(s, { sections, formOpen: false }))
  },

  updateLiveDataBlock: (key, data) => {
    const state = get()
    const idx = state.selectedSectionIdx
    const blockIdx = state.selectedBlockId
    const sections = state.sections.map((s, i) =>
      i !== idx
        ? s
        : {
            ...s,
            blocks: s.blocks.map((b) =>
              b.id !== blockIdx ? b : { ...b, data: { ...b.data, [key]: data } }
            ),
          }
    )
    set({ sections, formOpen: true })
  },

  updateHistoryDataBlock: (key, data) => {
    const state = get()
    const idx = state.selectedSectionIdx
    const blockIdx = state.selectedBlockId
    const sections = state.sections.map((s, i) =>
      i !== idx
        ? s
        : {
            ...s,
            blocks: s.blocks.map((b) =>
              b.id !== blockIdx ? b : { ...b, data: { ...b.data, [key]: data } }
            ),
          }
    )
    set((s) => pushHistory(s, { sections, formOpen: true }))
  },

  closeForm: () => set({ formOpen: false, selectedBlockId: null }),
}))
