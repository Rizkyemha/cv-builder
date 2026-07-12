// ─── Field & Settings ────────────────────────────────────────────────────────

export type FieldType =
  | "text"
  | "date"
  | "url"
  | "email"
  | "phone"
  | "location"
  | "textarea"
  | "select"
  | "toggle"

export interface FieldSettings {
  key: string
  label: string
  type: FieldType
  options?: string[]
  placeholder?: string
  default: string | boolean
}

// ─── Block ───────────────────────────────────────────────────────────────────

export interface Block {
  id: string
  data: Record<string, string | boolean>
}

// ─── Section ─────────────────────────────────────────────────────────────────

export interface Section {
  id: string
  type: string
  label: string
  visible: boolean
  data: Record<string, string | boolean>
  blocks: Block[]
}

// ─── Template Config (per-template, defined in templates/*/config.ts) ────────

export interface BlockDef {
  settings: FieldSettings[]
  maxBlocks?: number
  defaultData: Record<string, string | boolean>
}

export interface SectionDef {
  label: string
  icon: string
  hasBlock: boolean
  settings: FieldSettings[] // section-level fields
  blockDef?: BlockDef // only when hasBlock: true
  defaultData: Record<string, string | boolean>
  defaultBlocks?: Block[] // initial blocks when section first added
}

export interface TemplateDef {
  id: string
  label: string
  thumbnail?: string
  sectionTypes: string[] // ordered list of available section types
  sections: Record<string, SectionDef>
  defaultSections: Section[] // initial state when template is selected
}

// ─── History ─────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  sections: Section[]
  selectedSectionIdx: number
  selectedBlockId: string | null
}
