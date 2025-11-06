import type { Metadata } from "next"
import { Geist, Orbitron } from "next/font/google"
import "@/styles/globals.css"
import "@/styles/layout.css"
import "@/styles/fonts.css"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${orbitron.variable} ${geist.className}`}>
        {children}
      </body>
    </html>
  )
}
