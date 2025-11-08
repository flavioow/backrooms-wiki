import type { Metadata } from "next"
import { Geist, Orbitron } from "next/font/google"
import "@/styles/globals.css"
import "@/styles/layout.css"
import "@/styles/fonts.css"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { routing } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Backrooms",
  description:
    "A next-gen wiki built from scratch, fully dedicated to the Backrooms",
  keywords: [
    "backrooms",
    "levels",
    "entities",
    "groups",
    "objects",
    "wiki",
    "database",
    "liminal",
    "comunity",
  ],
  authors: [
    {
      name: "Flávio Henrique Perusin de Souza",
      url: "https://flavioow.vercel.app/",
    },
  ],
  robots: "index, follow",
  applicationName: "Backrooms Wiki",
}

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-primary",
})
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-secondary",
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <html lang={locale}>
      <body
        className={`${geist.variable} ${orbitron.variable} ${geist.className}`}>
        <NextIntlClientProvider locale={locale}>
          {" "}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
