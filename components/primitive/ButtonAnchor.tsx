"use client"

import { ReactNode, MouseEvent, ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type ButtonAnchorProps = {
  children: ReactNode
  href?: string
  newTab?: boolean
  "data-target"?: string
} & ComponentProps<typeof Button>

export const ButtonAnchor = ({
  children,
  href,
  newTab = false,
  ...props
}: ButtonAnchorProps) => {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (href) {
      if (newTab) {
        window.open(`${href}`, "_blank", "noopener,noreferrer")
        return
      }
      router.push(href)
      return
    }

    const target = props["data-target"]
    if (target) {
      e.preventDefault()
      const el = document.querySelector(`[data-slot="${target}"]`)

      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60
        window.scrollTo({ top, behavior: "smooth" })
      }
    }
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}
