import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Theme } from "@/providers/Theme"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <Theme>
        <body
          suppressHydrationWarning
          className={cn(
            "flex min-h-screen flex-col font-sans antialiased",
            inter.variable,
            playfair.variable
          )}
        >
          <Header />
          <main className="grow pb-24 pt-40">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </body>
      </Theme>
    </html>
  )
}

export default RootLayout
