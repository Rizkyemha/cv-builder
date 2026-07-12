import Image from "next/image"
import { ButtonAnchor } from "@/components/primitive/ButtonAnchor"

export const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100svh-60px)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 px-8">
        <h2
          data-animation="fade"
          className="max-w-3xl text-center text-4xl font-bold text-primary"
        >
          Untuk Kamu yang Capek Bikin CV Bagus, Terus Disuruh Bayar Pas Mau
          Download
        </h2>
        <p data-animation="fade" className="max-w-2xl text-center text-lg">
          Gratis. Beneran gratis. Tidak ada "upgrade to Pro", tidak ada
          watermark, tidak ada kartu kredit.
        </p>
        <div className="flex w-fit gap-4">
          <div data-animation="slide-left">
            <ButtonAnchor size="lg" href="/builder" newTab>
              Coba Sekarang
            </ButtonAnchor>
          </div>
          <div data-animation="slide-right">
            <ButtonAnchor
              size="lg"
              variant="secondary"
              data-target="cv-builder-section-problem"
            >
              Kepoin Project
            </ButtonAnchor>
          </div>
        </div>
      </div>
      {/* <div className="absolute inset-0 flex w-full max-w-5xl items-center justify-center overflow-hidden">
        <Image
          className="h-full w-full object-contain"
          src="/images/hero-cv-builder.png"
          width={1200}
          height={680}
          alt="hero picture cv builder by rizky emha"
        />
      </div> */}
    </section>
  )
}
