import { PropsWithChildren } from "react"

import "./globals.css"

import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { cn } from "@/lib/utils"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { Providers } from "@/providers/Providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif"
})

export const metadata: Metadata = {
  description:
    "Software Engineer, Skateboarder and an upcoming Model/Actor open for collaboration and work.",
  title: {
    default: "Nolan Seokane",
    template: "%s | Nolan Seokane"
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(inter.variable, playfair.variable)}
      >
        <Providers>
          <Header />
          <main className="grow pb-16 pt-40">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
