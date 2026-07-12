export function exportHTML(iframeId = "cv-preview-iframe"): void {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null
  if (!iframe?.contentDocument) {
    console.error("CV preview iframe not found")
    return
  }

  const doc = iframe.contentDocument

  // inline all stylesheets from iframe into <style> tags
  const styles = Array.from(doc.styleSheets)
    .map((sheet) => {
      try {
        const rules = Array.from(sheet.cssRules)
          .map((r) => r.cssText)
          .join("\n")
        return `<style>${rules}</style>`
      } catch {
        // cross-origin sheet (e.g. CDN), keep as <link>
        return sheet.href ? `<link rel="stylesheet" href="${sheet.href}">` : ""
      }
    })
    .join("\n")

  const bodyHTML = doc.body.innerHTML

  const html = `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>CV</title>
                    ${styles}
                    <style>
                      * { box-sizing: border-box;}
                      body { background: white; }
                    </style>
                  </head>
                  <body class="min-w-svw flex justify-center bg-zinc-100">
                    <div class="w-fit">
                    ${bodyHTML}
                    </div>
                  </body>
                </html>`

  const blob = new Blob([html], { type: "text/html" })
  triggerDownload(blob, "cv.html")
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
