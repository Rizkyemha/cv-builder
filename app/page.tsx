import { Header } from "@/components/landing-page/Header"
import { Problem } from "@/components/landing-page/Problem"
import { Features } from "@/components/landing-page/Feature"
import { Cta } from "@/components/landing-page/CTA"
import { Footer } from "@/components/landing-page/Footer"
import { StaggerWrapperAnimation } from "@/components/animations/Stagger"

export default function Page() {
  return (
    <div className="relative">
      <Header />
      <main className="w-full">
        <StaggerWrapperAnimation>
          <Problem />
        </StaggerWrapperAnimation>
        <StaggerWrapperAnimation>
          <Features />
        </StaggerWrapperAnimation>
        <StaggerWrapperAnimation>
          <Cta />
        </StaggerWrapperAnimation>
      </main>
      <Footer />
    </div>
  )
}
