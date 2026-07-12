import Image from "next/image"
import { ButtonAnchor } from "@/components/primitive/ButtonAnchor"

export default function NotFound() {
  return (
    <div className="flex h-svh w-svw items-center justify-center">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4">
        <p className="text-3xl font-bold">NOT FOUND | 404</p>
        <div
          data-animation="slide-right"
          className="flex w-100 items-center justify-center"
        >
          <Image
            className="h-full w-full object-cover"
            src="/images/contributor-decoration.webp"
            width={200}
            height={200}
            alt="logo rizky emha"
          />
        </div>
        <p className="text-base text-muted-foreground">balik ke :</p>
        <div className="space-x-4">
          <ButtonAnchor href="/">Home</ButtonAnchor>
          <ButtonAnchor variant="outline" href="/builder">
            Builder
          </ButtonAnchor>
        </div>
      </div>
    </div>
  )
}
