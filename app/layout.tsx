import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Mono, Inter } from "next/font/google"
import "./globals.css"

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
  title: "Khuluza Tshabalala | Agentic Product Builder",
  description: "Khuluza Tshabalala is a South African full-stack product builder exploring AI agents, thoughtful software and the problems worth solving. Explore current projects and the 2026 event journal.",
  openGraph: {
    title: "Khuluza Tshabalala | Curious mind. Builder at heart.",
    description: "Thoughtful digital products, AI agents and a healthy curiosity for what comes next.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${body.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
