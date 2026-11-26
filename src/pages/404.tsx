import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import { Layout } from "../components/layout/Layout"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-brand">404</h1>
        <p className="mt-4 text-lg text-gray-500">
          Lo sentimos, no pudimos encontrar lo que buscabas.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Página no encontrada — Blog de Mocal</title>
