"use client"

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React, { useRef } from "react"

import { cn } from "@/lib/utils"

type AnimationWrapperProps = {
  className?: string
  options?: {
    once: boolean
  }
} & Readonly<{
  children: React.ReactNode
}>

gsap.registerPlugin(useGSAP, ScrollTrigger)

type AnimationType = "fade" | "slide-left" | "slide-right" | "pop"

const presets: Record<AnimationType, gsap.TweenVars> = {
  fade: { opacity: 0, y: 50 },
  "slide-left": { opacity: 0, x: -60 },
  "slide-right": { opacity: 0, x: 60 },
  pop: { opacity: 0, scale: 0, ease: "back.out(1.2)" },
}

function useStaggerAnimation(
  scopeRef: React.RefObject<HTMLElement>,
  once = false
) {
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-animation]")
      if (!items.length) return

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      })

      items.forEach((item, i) => {
        const type = (item.dataset.animation as AnimationType) ?? "fade"
        const vars = presets[type] ?? presets.fade
        tl.from(item, vars, i === 0 ? undefined : "<0.2")
      })
    },
    { scope: scopeRef }
  )
}

export function StaggerWrapperAnimation({
  className,
  children,
  options = {
    once: true,
  },
}: AnimationWrapperProps) {
  const scopeRef = useRef<HTMLDivElement>(null)

  useStaggerAnimation(scopeRef as React.RefObject<HTMLDivElement>, options.once)

  return (
    <div ref={scopeRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  )
}
