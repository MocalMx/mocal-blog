import * as React from "react"
import { MapPin } from "lucide-react"
import { withMocalOriginUtm } from "../../utils/links"

interface HostCtaSectionProps {
  title?: string
  description?: string
  cta: { label: string; href: string }
}

export function HostCtaSection({
  title = "¿Tienes un espacio? Lista tu espacio en Mocal",
  description = "Llega a miles de profesionales que buscan oficinas, salas de juntas y coworkings. Gestiona reservas y cobra de forma segura.",
  cta,
}: HostCtaSectionProps) {
  return (
    <section className="border-t border-gray-200 bg-brand py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">{description}</p>
        <div className="mt-8">
          <a
            href={withMocalOriginUtm(cta.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-8 text-sm font-medium text-brand transition-colors hover:bg-white/90"
          >
            <MapPin className="h-4 w-4" />
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}

