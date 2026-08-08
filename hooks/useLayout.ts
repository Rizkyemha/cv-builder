"use client"

import { useLayoutStore } from "@/store/useLayoutStore"
import { useLayoutEffect } from "react"

export const useLayout = () => {
  const setLayout = useLayoutStore((s) => s.setLayout)
  const setDrawerOpen = useLayoutStore((s) => s.setDrawerOpen)

  useLayoutEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024

      setLayout(isDesktop)
      isDesktop && setDrawerOpen(false)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
}
