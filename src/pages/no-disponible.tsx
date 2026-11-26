import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { Layout } from "../components/layout/Layout"

const NotAvailablePage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl bg-white px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Region restricted</span>
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
            Not available in{" "}
            <span className="text-primary underline decoration-primary/30 underline-offset-4">
              your region
            </span>
          </h1>

          <p className="mt-4 text-sm text-gray-600 sm:text-base">
            Mocal is only available in Mexico. If you are in Mexico and see this message, please
            try again or contact us at{" "}
            <a
              href="mailto:contacto@mocal.com.mx"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              contacto@mocal.com.mx
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default NotAvailablePage

export const Head: HeadFC = () => (
  <title>Not available in your region — Mocal</title>
)

