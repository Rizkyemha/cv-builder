"use client"

import * as React from "react"
import * as c from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof c.Label>) => {
  return (
    <c.Label
      className={cn(
        "block text-[13px] font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export default Label
