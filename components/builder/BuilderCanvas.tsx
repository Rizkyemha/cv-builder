"use client"

import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useBuilderStore } from "@/store/useBuilderStore"
import { ModernPreview } from "@/templates/modern/preview"
import { TEMPLATES_PREVIEW, TemplateId } from "@/templates"
import { Skeleton } from "@/components/ui/skeleton"

// A4 dimensions in px at 96dpi
const A4_W = 794
const A4_H = 1123

function IframePortal({
  iframeRef,
  children,
  onReady,
}: {
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  children: React.ReactNode
  onReady: (isReady: boolean) => void
}) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    function init() {
      const doc = iframe!.contentDocument
      if (!doc) return

      if (!doc.getElementById("canvas-css")) {
        const link = doc.createElement("link")
        link.id = "canvas-css"
        link.rel = "stylesheet"
        link.href = "/canvas.css"

        doc.head.appendChild(link)
      }

      // base reset
      if (!doc.getElementById("cv-base")) {
        const style = doc.createElement("style")
        style.id = "cv-base"
        style.textContent = `* { box-sizing: border-box; } body { background: white; }`
        doc.head.appendChild(style)
      }

      setMountNode(doc.body)
    }

    if (iframe.contentDocument?.readyState === "complete") {
      init()
      onReady(true)
    } else {
      iframe.addEventListener("load", init)
      return () => iframe.removeEventListener("load", init)
    }
  }, [iframeRef])

  if (!mountNode) return null
  return createPortal(children, mountNode)
}

function LoadingCanvas() {
  return (
    <div
      className="h-full w-full bg-white p-12"
      style={{
        border: "none",
        transformOrigin: "top left",
        display: "block",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
      }}
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-2/5 rounded-r-md bg-muted dark:bg-muted/10" />
        <Skeleton className="h-3 w-3/5 rounded-r-md bg-muted dark:bg-muted/10" />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, sectionIdx) => (
          <div key={sectionIdx} className="flex flex-col gap-3">
            <Skeleton className="h-4 w-1/4 rounded-r-md bg-muted dark:bg-muted/10" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-full rounded-r-md bg-muted dark:bg-muted/10" />
              <Skeleton className="h-3 w-full rounded-r-md bg-muted dark:bg-muted/10" />
              <Skeleton className="h-3 w-4/5 rounded-r-md bg-muted dark:bg-muted/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BuilderCanvas() {
  const sections = useBuilderStore((s) => s.sections)
  const templateId = useBuilderStore((s) => s.templateId)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    function calcScale() {
      if (!wrapperRef.current) return
      const available = wrapperRef.current.clientWidth - 48
      setScale(Math.min(1, available / A4_W))
    }
    calcScale()
    const ro = new ResizeObserver(calcScale)
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  // pick preview component based on templateId
  const PreviewComponent =
    TEMPLATES_PREVIEW[templateId as TemplateId] || ModernPreview

  return (
    <div
      ref={wrapperRef}
      className="flex flex-1 justify-center overflow-y-auto py-6"
    >
      {/* scaled A4 wrapper */}
      <div
        style={{
          width: A4_W * scale,
          height: A4_H * scale,
          flexShrink: 0,
        }}
      >
        {!isReady && <LoadingCanvas />}

        <iframe
          ref={iframeRef}
          id="cv-preview-iframe"
          title="CV Preview"
          style={{
            width: A4_W,
            height: A4_H,
            border: "none",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            display: isReady ? "block" : "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <IframePortal
            iframeRef={iframeRef}
            onReady={(val) => setIsReady(val)}
          >
            <PreviewComponent sections={sections} />
          </IframePortal>
        </iframe>
      </div>
    </div>
  )
}
