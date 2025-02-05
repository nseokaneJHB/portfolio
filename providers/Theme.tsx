"use client"
import { ThemeProvider } from "next-themes"

export const Theme = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
