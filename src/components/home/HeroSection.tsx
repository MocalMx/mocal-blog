import * as React from "react"
import { BookOpen, Search } from "lucide-react"
import { withMocalOriginUtm } from "../../utils/links"

interface HeroSectionProps {
  title?: string
  description?: string
  backgroundImageUrl: string
  primaryCta?: { label: string; href: string; icon?: React.ReactNode }
  secondaryCta?: { label: string; href: string; external?: boolean; icon?: React.ReactNode }
}

export function HeroSection({
  title = "El blog de Mocal",
  description = "Descubre tendencias, guías y consejos sobre espacios de trabajo flexibles, coworking y oficinas en México.",
  backgroundImageUrl,
  primaryCta = { label: "Leer artículos", href: "#articulos", icon: <BookOpen className="h-4 w-4" /> },
  secondaryCta = {
    label: "Explorar espacios",
    href: "https://mocal.com.mx/search",
    external: true,
    icon: <Search className="h-4 w-4" />,
  },
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-brand">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] scale-105 opacity-40"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-brand/80" aria-hidden="true" />
      <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 text-lg text-white/90">{description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={primaryCta.href}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              {primaryCta.icon}
              {primaryCta.label}
            </a>
            <a
              href={withMocalOriginUtm(secondaryCta.href)}
              target={secondaryCta.external ? "_blank" : undefined}
              rel={secondaryCta.external ? "noopener noreferrer" : undefined}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {secondaryCta.icon}
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

