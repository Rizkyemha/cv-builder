import { ButtonAnchor } from "@/components/primitive/ButtonAnchor"
import Image from "next/image"

export const Cta = () => {
  return (
    <section className="flex w-svw items-center justify-center">
      <div className="relative flex w-full max-w-5xl flex-col gap-4 overflow-hidden px-4 py-20 sm:flex-row sm:gap-0 xl:px-10">
        {/* CONTENT */}
        <div className="relative z-20">
          <h2
            data-animation="slide-left"
            className="text-2xl leading-snug font-semibold"
          >
            Kontribusi Template
          </h2>
          <p
            data-animation="slide-left"
            className="mb-4 w-full text-base wrap-break-word text-muted-foreground"
          >
            Kamu seorang developer atau desainer yang punya ide template keren?
            Pull request terbuka.
          </p>
          <div
            data-animation="slide-left"
            className="flex w-fit flex-wrap gap-4"
          >
            <ButtonAnchor size="lg" href="https://github.com/Rizkyemha/cv-builder">
              Github
            </ButtonAnchor>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div
            data-animation="slide-right"
            className="flex items-center justify-center"
          >
            <Image
              className="h-full w-full object-cover"
              src="/images/contributor-decoration.webp"
              width={200}
              height={200}
              alt="logo rizky emha"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
