import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

export type CategoryCard = {
  title: string
  description: string
  icon: LucideIcon
  colorClassName: string
}

interface CategoriesSectionProps {
  id?: string
  title?: string
  subtitle?: string
  categories: CategoryCard[]
}

export function CategoriesSection({
  id = "categorias",
  title = "Explorar por categoría",
  subtitle = "Artículos y guías organizados por tipo de espacio.",
  categories,
}: CategoriesSectionProps) {
  return (
    <section id={id} className="border-t border-gray-200 bg-highlight py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-brand sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">{subtitle}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {categories.map(({ title: categoryTitle, description, icon: Icon, colorClassName }) => (
            <div
              key={categoryTitle}
              className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClassName}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-brand">{categoryTitle}</h3>
              <p className="mt-2 text-sm text-gray-500">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                Ver artículos <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

