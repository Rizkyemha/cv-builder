# CV Builder by Rizky Emha

CV Builder berbasis Next.js App Router + Zustand + Tailwind CSS dengan sistem multi-template, export PDF/HTML/Image/JSON, dan undo/redo history.

## Tech Stack

- **Next.js** App Router
- **Zustand** — state management + undo/redo
- **Tailwind CSS** — styling
- **@react-pdf/renderer** — PDF export
- **html2canvasPro** — image export
- **lucide-react** — icons

## Install

```bash
npm i
```

## Setup

Pastikan `tsconfig.json` punya path alias `@/`:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

Entry point di `app/builder/page.tsx`:

```tsx
import { PageBuilder } from "@/components/builder/PageBuilder"

export default function BuilderPage() {
  return <PageBuilder />
}
```

---

## Struktur Folder

```
/app
  /builder
    page.tsx                   → entry point builder
    /preview
      page.tsx                 → halaman preview tab baru

/components/builder
  PageBuilder.tsx              → root composer
  BuilderCanvas.tsx            → iframe A4 preview
  /forms
    DynamicField.tsx           → single field renderer
    DynamicForm.tsx            → form dari FieldSettings[]
    SectionForm.tsx            → panel form kanan (section & block mode)
  /toolbar
    BuilderHeader.tsx          → header: undo/redo, template switcher, export
    SectionToolbar.tsx         → panel kiri: section list, block list, actions
    TemplateSwitcher.tsx       → dropdown ganti template

/store
  useBuilderStore.ts           → semua state + actions + history

/hooks
  useUndoRedo.ts               → keyboard shortcut Ctrl+Z / Ctrl+Y
  useCurrentTemplate.ts        → helper akses template aktif
  useExport.ts                 → wires semua format export + loading state

/lib
  utils.ts                     → cn()
  /export
    exportJSON.ts              → serialize/deserialize JSON
    exportHTML.ts              → export iframe content ke .html
    exportImage.ts             → html2canvasPro screenshot → .png
    exportPDF.ts               → @react-pdf/renderer → .pdf

/templates
  index.ts                     → TEMPLATES registry
  /modern
    config.ts                  → SectionDef per section type
    preview.tsx                → ModernPreview (browser)
    pdf.tsx                    → ModernPdfDocument (@react-pdf)
  /ats
    config.ts
    preview.tsx
    pdf.tsx

/types
  index.ts                     → semua types
```

---

## Arsitektur Data

```
TemplateDef
  └── sections: Record<string, SectionDef>
        ├── settings: FieldSettings[]     → drives DynamicForm (section level)
        ├── hasBlock: boolean
        └── blockDef?
              └── settings: FieldSettings[] → drives DynamicForm (block level)

Zustand Store
  ├── templateId
  ├── sections: Section[]
  │     ├── data: Record<string, string|boolean>   → section-level fields
  │     └── blocks: Block[]
  │           └── data: Record<string, string|boolean>
  ├── selectedSectionIdx
  ├── selectedBlockId
  ├── history: HistoryEntry[]   → max 50 snapshot
  └── historyPtr
```

---

## Store Actions

### Section

| Action                                | Keterangan                      |
| ------------------------------------- | ------------------------------- |
| `selectSection(idx)`                  | Pilih section + buka form       |
| `addSection(type)`                    | Tambah section berdasarkan type |
| `deleteSection()`                     | Hapus section terpilih (min 1)  |
| `duplicateSection()`                  | Duplikat section terpilih       |
| `moveSection('up'\|'down')`           | Geser urutan                    |
| `toggleSectionVisible(idx?)`          | Toggle visibility               |
| `updateSectionData(data)`             | Update by submit + push history |
| `updateLiveDataSection(key, data)`    | Update data by key              |
| `updateHistoryDataSection(key, data)` | push history                    |

### Block

| Action                                        | Keterangan                       |
| --------------------------------------------- | -------------------------------- |
| `selectBlock(blockId)`                        | Pilih block + buka form          |
| `addBlock(sectionIdx?)`                       | Tambah block baru                |
| `deleteBlock(blockId, sectionIdx?)`           | Hapus block                      |
| `duplicateBlock(blockId, sectionIdx?)`        | Duplikat block                   |
| `moveBlock(blockId, dir, sectionIdx?)`        | Geser urutan block               |
| `updateBlockData(blockId, data, sectionIdx?)` | Update data block + push history |
| `updateLiveDataBlock(key, data)`              | Update data by key               |
| `updateHistoryDataBlock(key, data)`           | push history                     |

### History

| Action      | Keterangan                  |
| ----------- | --------------------------- |
| `undo()`    | Kembali ke state sebelumnya |
| `redo()`    | Maju ke state berikutnya    |
| `canUndo()` | Boolean                     |
| `canRedo()` | Boolean                     |

Keyboard: `Ctrl+Z` undo, `Ctrl+Y` / `Ctrl+Shift+Z` redo.

---

## Export

| Format | Fungsi                             | Library               |
| ------ | ---------------------------------- | --------------------- |
| PDF    | `exportPDF(templateId, sections)`  | `@react-pdf/renderer` |
| Image  | `exportImage(iframeId)`            | `html2canvasPro`      |
| HTML   | `exportHTML(iframeId)`             | native DOM            |
| JSON   | `exportJSON(templateId, sections)` | native                |

Import JSON: tombol **Import** di header → pilih file `.json` hasil export sebelumnya.

---

## Membuat Template Baru

### 1. Buat folder

```
/templates/minimal/
  config.ts
  preview.tsx
  pdf.tsx
```

### 2. Buat `config.ts`

```ts
import { TemplateDef, SectionDef } from "@/types"

const headerSection: SectionDef = {
  label: "Header",
  icon: "user-circle",
  hasBlock: false,
  settings: [
    {
      key: "name",
      label: "Full name",
      type: "text",
      placeholder: "John Doe",
      default: "",
    },
    {
      key: "email",
      label: "Email",
      type: "text",
      placeholder: "john@example.com",
      default: "",
    },
    // tambah field lain...
  ],
  defaultData: { name: "Your Name", email: "" },
}

const experienceSection: SectionDef = {
  label: "Experience",
  icon: "briefcase",
  hasBlock: true, // section ini punya blocks
  settings: [
    {
      key: "sectionTitle",
      label: "Section title",
      type: "text",
      default: "Experience",
    },
  ],
  defaultData: { sectionTitle: "Experience" },
  blockDef: {
    settings: [
      { key: "company", label: "Company", type: "text", default: "" },
      { key: "role", label: "Role", type: "text", default: "" },
      { key: "desc", label: "Description", type: "textarea", default: "" },
      { key: "current", label: "Current", type: "toggle", default: false },
    ],
    defaultData: { company: "", role: "", desc: "", current: false },
    maxBlocks: 10,
  },
  defaultBlocks: [
    { id: "exp-1", data: { company: "", role: "", desc: "", current: false } },
  ],
}

export const minimalTemplate: TemplateDef = {
  id: "minimal",
  label: "Minimal",
  sectionTypes: ["header", "experience"], // urutan di menu "Add section"
  sections: {
    header: headerSection,
    experience: experienceSection,
  },
  defaultSections: [
    // state awal saat template dipilih
    {
      id: "s-1",
      type: "header",
      label: "Header",
      visible: true,
      data: headerSection.defaultData,
      blocks: [],
    },
    {
      id: "s-2",
      type: "experience",
      label: "Experience",
      visible: true,
      data: experienceSection.defaultData,
      blocks: experienceSection.defaultBlocks!,
    },
  ],
}
```

### 3. Buat `preview.tsx`

Komponen React biasa, di-render ke dalam iframe (A4 794×1123px).

```tsx
import { Section } from "@/types"

function HeaderSection({ section }: { section: Section }) {
  const d = section.data
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-light">{d.name as string}</h1>
      <p className="text-sm text-gray-500">{d.email as string}</p>
    </div>
  )
}

// buat renderer per section type...

const RENDERERS: Record<string, React.FC<{ section: Section }>> = {
  header: HeaderSection,
  // experience: ExperienceSection,
}

export function MinimalPreview({ sections }: { sections: Section[] }) {
  return (
    <div
      id="cv-preview-root"
      style={{ width: "794px", minHeight: "1123px", fontFamily: "sans-serif" }}
      className="bg-white p-12"
    >
      {sections
        .filter((s) => s.visible)
        .map((section) => {
          const Renderer = RENDERERS[section.type]
          if (!Renderer) return null
          return <Renderer key={section.id} section={section} />
        })}
    </div>
  )
}
```

### 4. Buat `pdf.tsx`

Gunakan builtin font `@react-pdf/renderer` — tidak perlu fetch eksternal.

Font yang tersedia: `Helvetica`, `Helvetica-Bold`, `Times-Roman`, `Times-Bold`, `Courier`, `Courier-Bold`.

```tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Section } from "@/types"

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 48,
    backgroundColor: "#fff",
  },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22, marginBottom: 4 },
  email: { fontSize: 10, color: "#6b7280" },
  // ...
})

function PdfHeader({ section }: { section: Section }) {
  const d = section.data
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={s.name}>{d.name as string}</Text>
      <Text style={s.email}>{d.email as string}</Text>
    </View>
  )
}

const PDF_RENDERERS: Record<string, React.FC<{ section: Section }>> = {
  header: PdfHeader,
}

export function MinimalPdfDocument({ sections }: { sections: Section[] }) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {sections
          .filter((s) => s.visible)
          .map((section) => {
            const Renderer = PDF_RENDERERS[section.type]
            if (!Renderer) return null
            return <Renderer key={section.id} section={section} />
          })}
      </Page>
    </Document>
  )
}
```

### 5. Daftarkan ke registry

**`templates/index.ts`**:

```ts
import { TemplateDef, SectionDef } from "@/types"
import { modernTemplate } from "./modern/config"
import { atsTemplate } from "./ats-friendly/config"
import { ModernPreview } from "./modern/preview"
import { AtsPreview } from "./ats-friendly/preview"

export const TEMPLATES: Record<string, TemplateDef> = {
  modern: modernTemplate,
  ats: atsTemplate,
  // minimal: minimalTemplate,  ← tambah template baru di sini
} as const

export const TEMPLATES_PREVIEW = {
  modern: ModernPreview,
  ats: AtsPreview,
} as const

export type TemplateId = keyof typeof TEMPLATES_PREVIEW
```

### 6. Daftarkan pdf dispatcher

**`lib/export/exportPDF.ts`**:

```ts
import { MinimalPdfDocument } from "@/templates/minimal/pdf"

const PDF_DOCUMENTS = {
  modern: ModernPdfDocument,
  ats: AtsPdfDocument,
  minimal: MinimalPdfDocument,
}
```

---

## FieldSettings Types

**`types/index.ts`**

**`components/builder/primitive/**`**:

| type       | Render                    | Value                       |
| ---------- | ------------------------- | --------------------------- |
| `text`     | `<input type="text">`     | `string`                    |
| `textarea` | `<textarea>`              | `string`                    |
| `select`   | `<select>`                | `string`                    |
| `date`     | `<input type="month">`    | `string` (format `YYYY-MM`) |
| `url`      | `<input type="url">`      | `string`                    |
| `toggle`   | Switch button             | `boolean`                   |
| `email`    | `<input type="mail">`     | `string`                    |
| `phone`    | `<input type="string">`   | `string`                    |
| `location` | `<input type="location">` | `string`                    |
