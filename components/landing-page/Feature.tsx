import type { ComponentType } from "react"
import * as Icons from "lucide-react"
import type { LucideProps } from "lucide-react"
import { features, FeatureType } from "@/constant/landing-page"
import { cn } from "@/lib/utils"

export const Features = () => {
  return (
    <section
      className="flex w-svw items-center justify-center bg-muted"
      data-slot="cv-builder-section-features"
    >
      <div className="w-full max-w-5xl px-4 py-20 xl:px-10">
        <h2
          data-animation="slide-left"
          className="text-2xl leading-snug font-semibold"
        >
          Features
        </h2>
        <p
          data-animation="slide-left"
          className="mb-4 text-base text-muted-foreground"
        >
          Fitur yang harusnya gratis dari awal
        </p>
        <div className="relative grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export const FeatureCard = ({ feature }: { feature: FeatureType }) => {
  const LucideIcon = Icons[
    feature.iconName as keyof typeof Icons
  ] as ComponentType<LucideProps>

  return (
    <div
      data-animation="fade"
      className="group relative block h-full w-full p-2"
    >
      <div className="relative z-20 flex h-full flex-col items-start justify-start gap-2 border-2 border-dotted border-transparent bg-background p-5 transition-all duration-200 ease-in-out group-hover:border-primary">
        <div
          className={cn(
            "mb-12 flex size-13 items-center justify-center",
            feature.bgIconColor
          )}
        >
          <LucideIcon className={`size-4 ${feature.iconColor}`} />
        </div>
        <h3 className="text-xl font-medium tracking-tight">{feature.title}</h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
      <span
        className={cn(
          "absolute inset-0 z-10 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100",
          feature.bgIconColor
        )}
      />
    </div>
  )
}
