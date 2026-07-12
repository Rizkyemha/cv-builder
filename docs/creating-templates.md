# Membuat Template Baru

> Sebelum bikin key/type baru, baca dulu [`template-key-convention.md`](./template-key-convention.md) — supaya data user tidak hilang saat pindah antar template.

## 1. Buat folder

```
/templates/minimal/
  config.ts
  preview.tsx
  pdf.tsx
```

## 2. Buat `config.ts`

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

## 3. Buat `preview.tsx`

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

## 4. Buat `pdf.tsx`

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

## 5. Daftarkan ke registry

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

## 6. Daftarkan PDF dispatcher

Lihat [`/docs/export.md`](./export.md#mendaftarkan-pdf-dispatcher-untuk-template-baru).
