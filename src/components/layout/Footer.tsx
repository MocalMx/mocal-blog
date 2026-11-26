import * as React from "react"
import { Link } from "gatsby"
import { withMocalOriginUtm } from "../../utils/links"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <img src="/mocal-logo-color.svg" alt="Mocal" className="h-7 w-auto" />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-500">
              Conectando a profesionales con los mejores espacios en todo México.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand">Soporte</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={withMocalOriginUtm("https://mocal.com.mx/about/help-center")}
                  className="text-sm text-gray-500 hover:text-brand"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a
                  href={withMocalOriginUtm("https://mocal.com.mx/privacy")}
                  className="text-sm text-gray-500 hover:text-brand"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href={withMocalOriginUtm("https://mocal.com.mx/terms")}
                  className="text-sm text-gray-500 hover:text-brand"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Términos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand">Síguenos</h3>
            <div className="mt-3 flex gap-4">
              <a
                href="https://www.linkedin.com/company/keysely/"
                className="text-gray-400 transition-colors hover:text-brand"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.32 8.01H4.7V23H.32V8.01zM8.34 8.01h4.19v2.04h.06c.58-1.1 2-2.26 4.11-2.26 4.39 0 5.2 2.89 5.2 6.65V23h-4.38v-7.39c0-1.76-.03-4.03-2.46-4.03-2.46 0-2.84 1.92-2.84 3.9V23H8.34V8.01z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61582403333597"
                className="text-gray-400 transition-colors hover:text-brand"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mocal. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href={withMocalOriginUtm("https://mocal.com.mx/privacy")}
              className="text-sm text-gray-500 hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidad
            </a>
            <a
              href={withMocalOriginUtm("https://mocal.com.mx/legal/cookies")}
              className="text-sm text-gray-500 hover:text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
