"use client"
import { useState, useEffect } from "react"

import { useTheme } from "next-themes"

import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export const ToggleTheme = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mount, setMount] = useState<boolean>(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) {
    return <div className="w-9" />
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="group rounded-full"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="!h-6 !w-6 text-orange-300" />
      ) : (
        <MoonIcon className="!h-6 !w-6 text-sky-950" />
      )}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}
