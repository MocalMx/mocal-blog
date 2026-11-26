import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "gatsby"
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image"
import { withMocalOriginUtm } from "../../utils/links"

export type FeaturedArticle = {
  title: string
  excerpt: string
  category: string
  readTime: string
  slug: string
  coverImage?: IGatsbyImageData
}

interface FeaturedArticlesSectionProps {
  id?: string
  articles: FeaturedArticle[]
  title?: string
  subtitle?: string
}

export function FeaturedArticlesSection({
  id = "articulos",
  articles,
  title = "Artículos destacados",
  subtitle = "Los artículos más leídos en el blog de Mocal.",
}: FeaturedArticlesSectionProps) {
  return (
    <section id={id} className="border-t border-gray-200 bg-primary-subtle py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-brand sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">{subtitle}</p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug || article.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                {article.coverImage ? (
                  <GatsbyImage
                    image={article.coverImage}
                    alt={article.title}
                    className="h-full w-full"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-brand to-primary" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug text-brand transition-colors group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{article.excerpt}</p>
                <Link
                  to={withMocalOriginUtm(`/articles/${article.slug}`)}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Leer más <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

