import html2canvasPro from "html2canvas-pro"

export async function exportImage(
  iframeId = "cv-preview-iframe",
  filename = "cv.png"
): Promise<void> {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null
  if (!iframe?.contentDocument) {
    console.error("CV preview iframe not found")
    return
  }

  const root = iframe.contentDocument.getElementById("cv-preview-root")
  if (!root) {
    console.error("cv-preview-root element not found inside iframe")
    return
  }

  const canvas = await html2canvasPro(root as HTMLElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: 794,
    height: root.scrollHeight,
    windowWidth: 794,
  })

  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, "image/png")
}
