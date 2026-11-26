import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import { GatsbyImage, getImage, getSrc, type IGatsbyImageData } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, MARKS, type Document } from "@contentful/rich-text-types"
import { CalendarDays, ChevronRight, Share2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Layout } from "../../components/layout/Layout"
import { NewsletterSection } from "../../components/home"
import type { ContentfulBlogPostPageQuery } from "../../graphql/__generated__/types"
import { withMocalOriginUtm } from "../../utils/links"
import { Seo } from "../../components/seo"
import { NewsletterSubscribeForm } from "../../components/newsletter/NewsletterSubscribeForm"
import {
  fetchMainRecommendedSpaces,
  type MainRecommendedSpace,
} from "../../api/mainRecommendedSpaces"
import { FeaturedSpaces } from "../../components/spaces/FeaturedSpaces"

type Props = PageProps<ContentfulBlogPostPageQuery>

function safeJsonParse<T>(value: string | null | undefined): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function getShareUrl(pathname: string, origin?: string | null) {
  const baseFromOrigin = origin && origin !== "null" ? origin : null
  const runtimeOrigin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : null

  const base = baseFromOrigin ?? runtimeOrigin ?? "https://blog.mocal.com.mx"
  const absoluteUrl = `${base}${pathname}`
  const urlWithUtm = withMocalOriginUtm(absoluteUrl)

  try {
    const url = new URL(urlWithUtm)
    // Específico para enlaces compartidos del artículo
    url.searchParams.set("utm_content", "article_share")
    return url.toString()
  } catch {
    // Fallback sencillo en caso de que URL falle por alguna razón inesperada
    const separator = urlWithUtm.includes("?") ? "&" : "?"
    return `${urlWithUtm}${separator}utm_content=article_share`
  }
}

function RelatedPostCard({
  title,
  category,
  to,
  image,
}: {
  title: string
  category?: string
  to: string
  image?: IGatsbyImageData
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 transition-shadow hover:shadow-sm"
    >
      <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
        {image ? (
          <GatsbyImage image={image} alt="" className="h-12 w-12" />
        ) : (
          <div className="h-12 w-12 bg-gradient-to-br from-brand to-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        {category ? (
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{category}</p>
        ) : null}
        <p className="truncate text-sm font-medium text-brand group-hover:text-primary">{title}</p>
      </div>
    </Link>
  )
}

export default function ContentfulBlogPostPage({ data, location }: Props) {
  const post = data.contentfulBlogPost
  if (!post) return null

  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = React.useState<string | null>(null)
  const [locationRequested, setLocationRequested] = React.useState(false)
  const [shareCopied, setShareCopied] = React.useState(false)

  const {
    data: recommendedSpaces,
    isLoading: isLoadingSpaces,
    isError: isErrorSpaces,
  } = useQuery<MainRecommendedSpace[]>({
    queryKey: ["mainRecommendedSpaces", userLocation],
    queryFn: () =>
      fetchMainRecommendedSpaces({
        profileId: null,
        spaceCategoryId: null,
        lat: userLocation?.lat ?? null,
        lng: userLocation?.lng ?? null,
        limit: 3,
        scoreWindow: 30,
        maxDistanceKm: 25,
      }),
  })

  const spaceIds = React.useMemo(() => recommendedSpaces?.map((s) => s.id) ?? [], [recommendedSpaces])

  const handleRequestLocation = React.useCallback(() => {
    if (locationRequested) return

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocationError("Tu navegador no soporta geolocalización.")
      return
    }
    setLocationError(null)
    setLocationRequested(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => (null),
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    )
  }, [locationRequested])

  React.useEffect(() => {
    handleRequestLocation()
  }, [handleRequestLocation])

  const coverImage = getImage(post.coverImage?.gatsbyImage ?? null)
  const avatarImage = getImage(post.author?.avatar?.gatsbyImage ?? null)

  const categoryTitle = post.categories?.title ?? "Blog"
  const authorName = [post.author?.firstName, post.author?.lastName].filter(Boolean).join(" ")
  const publishedAt = post.createdAt ?? ""

  const shareUrl = getShareUrl(location.pathname, (location as Location | undefined)?.origin)

  const richTextDoc = safeJsonParse<Document>(post.content?.raw)
  const richText = richTextDoc
    ? documentToReactComponents(richTextDoc, {
        renderMark: {
          [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
          [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
        },
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => (
            <p className="my-4 text-[15px] leading-7 text-gray-700">{children}</p>
          ),
          [BLOCKS.HEADING_1]: (_node, children) => (
            <h1 className="mt-10 text-3xl font-semibold tracking-tight text-brand">{children}</h1>
          ),
          [BLOCKS.HEADING_2]: (_node, children) => (
            <h2 className="mt-10 text-xl font-semibold text-brand">{children}</h2>
          ),
          [BLOCKS.HEADING_3]: (_node, children) => (
            <h3 className="mt-8 text-lg font-semibold text-brand">{children}</h3>
          ),
          [BLOCKS.UL_LIST]: (_node, children) => (
            <ul className="my-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-gray-700">
              {children}
            </ul>
          ),
          [BLOCKS.OL_LIST]: (_node, children) => (
            <ol className="my-4 list-decimal space-y-2 pl-6 text-[15px] leading-7 text-gray-700">
              {children}
            </ol>
          ),
          [BLOCKS.QUOTE]: (_node, children) => (
            <blockquote className="my-8 rounded-xl bg-primary-subtle px-6 py-5 text-sm text-brand">
              <div className="border-l-4 border-primary pl-4 leading-7">{children}</div>
            </blockquote>
          ),
          [INLINES.HYPERLINK]: (node, children) => (
            <a
              href={withMocalOriginUtm(String(node.data.uri))}
              className="font-medium text-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        },
      })
    : null

  return (
    <Layout>
      <div className="bg-gray-50 overflow-x-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
          >
            <Link to="/" className="hover:text-brand">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
            <Link to="/" className="hover:text-brand">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
            <span className="font-medium text-brand">{categoryTitle}</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Main */}
            <article className="min-w-0 lg:col-span-8">
              <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {categoryTitle}
                </p>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                  {post.title}
                </h1>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                      {avatarImage ? (
                        <GatsbyImage image={avatarImage} alt="" className="h-10 w-10" />
                      ) : (
                        <div className="h-10 w-10 bg-gradient-to-br from-brand to-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand">{authorName || post.author?.username}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        <span>{publishedAt}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    onClick={() => {
                      void navigator.clipboard?.writeText(shareUrl)
                      setShareCopied(true)
                      window.setTimeout(() => {
                        setShareCopied(false)
                      }, 2000)
                    }}
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    Copiar link
                  </button>
                </div>

                {shareCopied ? (
                  <div className="mt-3 inline-flex items-center rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    Link copiado al portapapeles
                  </div>
                ) : null}

                {coverImage ? (
                  <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">
                    <GatsbyImage
                      image={coverImage}
                      alt=""
                      className="h-full w-full max-h-[420px] object-cover"
                    />
                  </div>
                ) : null}

                {post.abstract ? (
                  <p className="mt-6 text-sm italic leading-7 text-gray-600">{post.abstract}</p>
                ) : null}

                <div className="prose prose-slate mt-6 max-w-none">{richText}</div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="min-w-0 lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl bg-brand p-6 text-white shadow-sm">
                  <h2 className="text-lg font-semibold">¿Necesitas un lugar para trabajar hoy?</h2>
                  <p className="mt-2 text-sm text-white/85">
                    Reserva tu escritorio o sala de juntas en segundos. Espacios equipados y listos para ti.
                  </p>
                  <a
                    href={withMocalOriginUtm("https://mocal.com.mx/search")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-cta px-4 text-sm font-medium text-white transition-colors hover:bg-cta/90"
                  >
                    Reservar ahora
                  </a>
                </div>

                {(data.related?.nodes?.length ?? 0) > 0 ? (
                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="text-sm font-semibold text-brand">Artículos relacionados</h2>
                    <div className="mt-4 space-y-3">
                      {data.related?.nodes?.map((p) => (
                        <RelatedPostCard
                          key={p.id ?? p.slug ?? ""}
                          title={p.title ?? ""}
                          category={p.categories?.title ?? undefined}
                          to={withMocalOriginUtm(`/articles/${p.slug}`)}
                          image={getImage(p.coverImage?.gatsbyImage ?? null) ?? undefined}
                        />
                      ))}
                    </div>
                    <Link
                      to="/"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-brand hover:bg-gray-50"
                    >
                      Ver todo el blog
                    </Link>
                  </div>
                ) : null}

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold text-brand">Newsletter</h2>
                  <p className="mt-2 text-xs text-gray-500">
                    Recibe consejos de productividad y ofertas exclusivas cada semana.
                  </p>
                  <div className="mt-4">
                    <NewsletterSubscribeForm
                      placeholder="Tu email"
                      buttonLabel="Suscribirme"
                      formClassName="space-y-3"
                      inputClassName="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-brand placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                      buttonClassName="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-80"
                      errorClassName="mt-3 text-xs text-red-600"
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <FeaturedSpaces
            spaces={recommendedSpaces}
            isLoading={isLoadingSpaces}
            isError={isErrorSpaces}
            locationError={locationError}
          />

        </div>

        {/* Full-bleed Newsletter */}
        <NewsletterSection />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ContentfulBlogPostPage($id: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    contentfulBlogPost(id: { eq: $id }) {
      ...ContentfulBlogPostFragment
    }
    related: allContentfulBlogPost(
      sort: { updatedAt: DESC }
      limit: 3
      filter: { id: { ne: $id } }
    ) {
      nodes {
        id
        slug
        title
        categories {
          title
        }
        coverImage {
          gatsbyImage(width: 160, height: 160)
        }
      }
    }
  }
`

export const Head: HeadFC<ContentfulBlogPostPageQuery> = ({ data, location }) => {
  const post = data.contentfulBlogPost
  const siteUrl = data.site?.siteMetadata?.siteUrl ?? "https://blog.mocal.com.mx"
  const siteName = data.site?.siteMetadata?.title ?? "Blog de Mocal"

  const title = post?.title ? `${post.title} — ${siteName}` : siteName
  const description = post?.abstract ?? "Blog de Mocal"
  const keywords = (post?.seoKeywords?.filter((k): k is string => Boolean(k)) ?? null) as string[] | null
  const image = getSrc(post?.coverImage?.gatsbyImage ?? null)
  const ogImageData = getImage(post?.coverImage?.gatsbyImage ?? null)
  const imageWidth = ogImageData?.width ?? 1200
  const imageHeight = ogImageData?.height ?? 630

  return (
    <Seo
      siteUrl={siteUrl}
      siteName={siteName}
      title={title}
      description={description}
      pathname={location.pathname}
      image={image}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      keywords={keywords}
      type="article"
    />
  )
}

