import * as React from "react"
import type { LucideIcon } from "lucide-react"

export type WhyMocalItem = {
  title: string
  description: string
  icon: LucideIcon
}

interface WhyMocalSectionProps {
  title?: string
  subtitle?: string
  items: WhyMocalItem[]
}

export function WhyMocalSection({
  title = "Por qué Mocal",
  subtitle = "Reserva con confianza espacios verificados en todo México.",
  items,
}: WhyMocalSectionProps) {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-brand sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">{subtitle}</p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
          {items.map(({ title: itemTitle, description, icon: Icon }) => (
            <div key={itemTitle} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-brand">{itemTitle}</h3>
              <p className="mt-2 text-sm text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

