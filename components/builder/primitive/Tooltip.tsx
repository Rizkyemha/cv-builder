import * as c from "@/components/ui/tooltip"

export const TooltipWrapper = c.Tooltip
export const TooltipContent = c.TooltipContent
export const TooltipTrigger = c.TooltipTrigger

export const Tooltip = ({
  content,
  children,
}: {
  content: string
  children: React.ReactNode
}) => (
  <TooltipWrapper>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent side="top" className="rounded-sm">
      {content}
    </TooltipContent>
  </TooltipWrapper>
)

export default Tooltip
