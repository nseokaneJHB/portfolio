"use client"
import { useState, useEffect } from "react"

import { useTheme } from "next-themes"

import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export const ToggleTheme = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mount, setMount] = useState<boolean>(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) {
    return <div className="w-9" />
  }

  const iconClass =
    "!h-6 !w-6 transform transition-transform duration-300 ease-linear group-hover:rotate-180"

  return (
    <Button
      size="icon"
      variant="ghost"
      className="group rounded-full"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className={cn("text-orange-300", iconClass)} />
      ) : (
        <MoonIcon className={cn("text-sky-950", iconClass)} />
      )}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}
