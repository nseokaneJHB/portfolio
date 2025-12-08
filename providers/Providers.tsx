"use client"
import { PropsWithChildren, useState, useEffect } from "react"

import { ThemeProvider } from "next-themes"

import { NuqsAdapter } from "nuqs/adapters/next/app"

import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider"

import { Loading } from "@/components/loading"

export const Providers = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Loading
        size="sm"
        className="mt-36 grow"
        title="Nolan Seokane's portfolio Loading..."
      />
    )
  }

  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <ReactQueryClientProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ReactQueryClientProvider>
    </ThemeProvider>
  )
}
