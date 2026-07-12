import { Section } from '@/types'

export interface CVJsonExport {
  version: number
  templateId: string
  exportedAt: string
  sections: Section[]
}

export function exportJSON(templateId: string, sections: Section[]): void {
  const payload: CVJsonExport = {
    version: 1,
    templateId,
    exportedAt: new Date().toISOString(),
    sections,
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  triggerDownload(blob, 'cv.json')
}

export function importJSON(file: File): Promise<CVJsonExport> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as CVJsonExport
        if (!data.sections || !data.templateId) throw new Error('Invalid CV file')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
