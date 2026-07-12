"use client"

import { useMemo } from "react"
import * as c from "@/components/ui/select"
import { cn } from "@/lib/utils"

const Select = ({
  className,
  options,
  ...props
}: {
  className?: string
  options: string[]
} & React.ComponentProps<typeof c.Select>) => {
  const items = useMemo(() => {
    return options.map((option) => ({
      value: option,
      label: option,
    }))
  }, [options])

  return (
    <c.Select {...props}>
      <c.SelectTrigger className={cn("w-full", className)}>
        <c.SelectValue />
      </c.SelectTrigger>
      <c.SelectContent position="popper" popover="hint">
        <c.SelectGroup>
          {items.map((item) => (
            <c.SelectItem key={item.value} value={item.value}>
              {item.label}
            </c.SelectItem>
          ))}
        </c.SelectGroup>
      </c.SelectContent>
    </c.Select>
  )
}

export { c, Select }
