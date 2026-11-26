import * as React from "react"
import type { GatsbySSR } from "gatsby"
import { AppProviders } from "./src/providers/AppProviders"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "es-MX" })
  setHeadComponents([
    <link key="favicon-svg" rel="icon" type="image/svg+xml" href="/favicon.svg" />,
    <link
      key="favicon-96"
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon-96x96.png"
    />,
    <link key="favicon-ico" rel="icon" type="image/x-icon" href="/favicon.ico" />,
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />,
    <link
      key="manifest"
      rel="manifest"
      href="/manifest.webmanifest"
      crossOrigin="anonymous"
    />,
    <link key="gfonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gstatic-preconnect"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="plus-jakarta-sans"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
    />,
    <meta key="theme-color" name="theme-color" content="#173F38" />,
  ])
}

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <AppProviders>{element}</AppProviders>
}
