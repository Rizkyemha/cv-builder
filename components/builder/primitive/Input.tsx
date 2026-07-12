import * as React from "react"
import * as c from "@/components/ui/input-group"
import { Type, Calendar, Link, Mail, Phone, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const InputText = ({
  className,
  ...props
}: React.ComponentProps<typeof c.InputGroupInput>) => {
  return (
    <c.InputGroup>
      <c.InputGroupInput type="text" className={className} {...props} />
      <c.InputGroupAddon>
        <Type />
      </c.InputGroupAddon>
    </c.InputGroup>
  )
}

const InputDate = ({
  className,
  ...props
}: React.ComponentProps<typeof c.InputGroupInput>) => {
  return (
    <c.InputGroup>
      <c.InputGroupInput type="date" className={className} {...props} />
      <c.InputGroupAddon>
        <Calendar />
      </c.InputGroupAddon>
    </c.InputGroup>
  )
}

const InputLink = ({
  className,
  ...props
}: React.ComponentProps<typeof c.InputGroupInput>) => {
  return (
    <c.InputGroup>
      <c.InputGroupInput type="url" className={className} {...props} />
      <c.InputGroupAddon>
        <Link />
      </c.InputGroupAddon>
    </c.InputGroup>
  )
}

const InputMail = ({
  className,
  ...props
}: React.ComponentProps<typeof c.InputGroupInput>) => {
  return (
    <c.InputGroup>
      <c.InputGroupInput type="email" className={className} {...props} />
      <c.InputGroupAddon>
        <Mail />
      </c.InputGroupAddon>
    </c.InputGroup>
  )
}

const InputPhone = ({
  className,
  ...props
}: React.ComponentProps<typeof c.InputGroupInput>) => {
  return (
    <c.InputGroup>
      <c.InputGroupInput type="phone" className={className} {...props} />
      <c.InputGroupAddon>
        <Phone />
      </c.InputGroupAddon>
    </c.InputGroup>
  )
}

const InputLocation = ({
  className,
  ...props
}: React.ComponentProps<typeof c.InputGroupInput>) => {
  return (
    <c.InputGroup>
      <c.InputGroupInput type="text" className={className} {...props} />
      <c.InputGroupAddon>
        <MapPin />
      </c.InputGroupAddon>
    </c.InputGroup>
  )
}

const InputTextArea = ({
  className,
  ...props
}: React.ComponentProps<typeof c.InputGroupTextarea>) => {
  return (
    <c.InputGroup>
      <c.InputGroupTextarea
        className={cn("resize-none leading-relaxed", className)}
        {...props}
      />
    </c.InputGroup>
  )
}

export {
  c,
  InputText,
  InputDate,
  InputLink,
  InputTextArea,
  InputMail,
  InputPhone,
  InputLocation,
}
