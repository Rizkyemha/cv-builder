# Export

| Format | Fungsi                              | Library                |
| ------ | ------------------------------------ | ----------------------- |
| PDF    | `exportPDF(templateId, sections)`    | `@react-pdf/renderer`   |
| Image  | `exportImage(iframeId)`              | `html2canvasPro`        |
| HTML   | `exportHTML(iframeId)`               | native DOM              |
| JSON   | `exportJSON(templateId, sections)`   | native                  |

Import JSON: tombol **Import** di header → pilih file `.json` hasil export sebelumnya.

## Catatan Image export

Gunakan `html2canvas-pro`, **bukan** `html2canvas` biasa — versi original belum support fungsi warna CSS `oklch()` yang dipakai Tailwind v4, dan akan throw runtime error `Attempting to parse an unsupported color function "oklch"`.

## Mendaftarkan PDF dispatcher untuk template baru

**`lib/export/exportPDF.ts`**:

```ts
import { MinimalPdfDocument } from "@/templates/minimal/pdf"

const PDF_DOCUMENTS = {
  modern: ModernPdfDocument,
  ats: AtsPdfDocument,
  minimal: MinimalPdfDocument, // ← tambahkan di sini
}
```

Lihat [`/docs/creating-templates.md`](./creating-templates.md) untuk cara bikin `pdf.tsx` dari awal.
