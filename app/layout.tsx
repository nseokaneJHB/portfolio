import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

import { cn } from "@/lib/utils"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { Theme } from "@/providers/Theme"
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { NuqsAdapter } from "nuqs/adapters/next/app"

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
  initialScale: 1,
  maximumScale: 1
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col font-sans antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <Theme>
          <ReactQueryClientProvider>
            <NuqsAdapter>
              <Header />
              <main className="grow pb-24 pt-40">{children}</main>
              <Footer />
              <Analytics />
              <SpeedInsights />
            </NuqsAdapter>
          </ReactQueryClientProvider>
        </Theme>
      </body>
    </html>
  )
}

export default RootLayout
