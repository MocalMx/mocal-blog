import * as React from "react"
import { NewsletterSubscribeForm } from "../newsletter/NewsletterSubscribeForm"

interface NewsletterSectionProps {
  title?: string
  description?: string
  placeholder?: string
  buttonLabel?: string
}

export function NewsletterSection({
  title = "Suscríbete a nuestro newsletter",
  description = "Recibe ofertas, novedades y tips para aprovechar al máximo tu espacio de trabajo.",
  placeholder = "Tu correo electrónico",
  buttonLabel = "Suscribirse",
}: NewsletterSectionProps) {
  return (
    <section className="border-t border-gray-200 bg-brand py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-white/90">{description}</p>
          <div className="mt-8">
            <NewsletterSubscribeForm
              placeholder={placeholder}
              buttonLabel={buttonLabel}
              formClassName="flex flex-col gap-3 sm:flex-row sm:justify-center"
              inputClassName="h-11 min-w-0 rounded-full border border-gray-300 bg-white px-4 text-sm text-brand placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary sm:max-w-xs"
              buttonClassName="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-brand transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-80"
              errorClassName="mt-4 text-sm text-red-200"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

