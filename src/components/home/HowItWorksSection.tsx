import * as React from "react"

export type HowItWorksStep = {
  step: string
  title: string
  description: string
}

interface HowItWorksSectionProps {
  id?: string
  title?: string
  subtitle?: string
  steps: HowItWorksStep[]
}

export function HowItWorksSection({
  id = "como-funciona",
  title = "Cómo funciona",
  subtitle = "Tres pasos para reservar tu próximo espacio.",
  steps,
}: HowItWorksSectionProps) {
  return (
    <section id={id} className="border-t border-gray-200 bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-brand sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">{subtitle}</p>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="text-lg font-bold">{item.step}</span>
              </div>
              <h3 className="mt-4 font-semibold text-brand">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

