import { ButtonAnchor } from "../primitive/ButtonAnchor"
import { Button } from "../ui/button"

export const Problem = () => {
  return (
    <section
      data-slot="cv-builder-section-problem"
      className="flex h-svh w-svw items-center justify-center"
    >
      <div className="w-full max-w-5xl px-4 py-20 xl:px-10">
        <p
          data-animation="fade"
          className="mb-6 text-right text-5xl tracking-widest uppercase"
        >
          Familiar?
        </p>

        <div
          data-animation="fade"
          className="text-base leading-relaxed font-light"
        >
          <p>Jam 11 malem. Kamu udah 2 jam buka tab template CV.</p>
          <p>
            Pilih yang paling keren. Isi satu-satu — pengalaman kerja, skill,
            deskripsi yang dibikin keliatan lebih keren dari aslinya.
          </p>
          <p>
            Preview-nya bagus banget, layout rapi, dan font-nya pas. Kamu bahkan
            senyum sendiri.
          </p>
          <p>Aman ? gas Klik download.</p>
        </div>

        <div
          data-animation="slide-right"
          className="my-4 flex items-start gap-4 rounded-2xl border bg-muted p-6"
        >
          <span className="mt-0.5 shrink-0 text-3xl">🔒</span>
          <div>
            <p className="mb-1 text-lg font-semibold">
              Download not available on Free plan
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Upgrade to <span className="text-primary">Pro</span> to export
              your CV as PDF. Plans start at $9.99/month.
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-zinc-900"
              >
                Upgrade Now
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border px-4 py-2 text-xs"
                disabled
              >
                Maybe later
              </Button>
            </div>
          </div>
        </div>

        <div
          data-animation="fade"
          className="text-base leading-relaxed font-light"
        >
          <p>
            <span>{`... krik krik krik`}</span>
          </p>
          <p>Kamu nutup laptopnya. Tidur. Besok masih nganggur.</p>
        </div>

        {/* Punchline */}
        <div data-animation="slide-left" className="mt-4 border-t pt-10">
          <p className="text-base text-muted-foreground">
            Makanya kita bikin ini.
          </p>
          <p className="text-2xl leading-snug font-semibold">
            Buat. Preview. Download.
            <br />
            <span className="text-base font-light text-muted-foreground">
              Tidak ada cerita lain.
            </span>
          </p>
          <div className="mt-6 flex w-fit gap-4">
            <ButtonAnchor size="lg" href="/builder" newTab>
              Coba Sekarang
            </ButtonAnchor>
            <ButtonAnchor
              size="lg"
              variant="secondary"
              data-target="cv-builder-section-features"
            >
              Kepoin Project
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  )
}
