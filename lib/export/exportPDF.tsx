import { pdf } from "@react-pdf/renderer"
import { Section } from "@/types"
import { ModernPdfDocument } from "@/templates/modern/pdf"
import { AtsPdfDocument } from "@/templates/ats-friendly/pdf"

const PDF_DOCUMENTS: Record<string, React.FC<{ sections: Section[] }>> = {
  modern: ModernPdfDocument,
  ats: AtsPdfDocument,
  // minimal: MinimalPdfDocument,
}

export async function exportPDF(
  templateId: string,
  sections: Section[],
  filename = "cv.pdf"
): Promise<void> {
  const Document = PDF_DOCUMENTS[templateId]
  if (!Document) {
    console.error(`No PDF document registered for template: ${templateId}`)
    return
  }

  const blob = await pdf(<Document sections={sections} />).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
