import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Mono, Manrope, Syne } from "next/font/google"
import "./globals.css"

const display = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const body = Manrope({
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
  title: "Khuluza Tshabalala | Agentic Product Builder",
  description: "Personal site for Khuluza Tshabalala, focused on agentic products, product systems, and current build work.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
