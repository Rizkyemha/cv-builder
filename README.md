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

/docs
  creating-templates.md        → cara bikin template baru step-by-step
  template-key-convention.md   → rule key/type biar data gak ketimpa saat ganti template
  store-actions.md             → daftar lengkap store actions
  export.md                    → format export + cara daftarin dispatcher
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
| `phone`    | `<input type="phone">`    | `string`                    |
| `location` | `<input type="location">` | `string`                    |

---

## Dokumentasi Lanjutan

- **Bikin template baru?** Baca [`/docs/creating-templates.md`](./docs/creating-templates.md)
- Untuk key convention kamu bisa baca disini: [`/docs/template-key-convention.md`](./docs/template-key-convention.md)
- Daftar lengkap store actions (section/block/history): [`/docs/store-actions.md`](./docs/store-actions.md)
- Format export & cara daftarin dispatcher: [`/docs/export.md`](./docs/export.md)
