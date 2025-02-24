import Link from "next/link"
import React from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu"

import { AlignJustify } from "lucide-react"

import { ToggleTheme } from "@/components/toggle-theme"
import { cn } from "@/lib/utils"

type URLMetadata = {
  url: string
  title: string
  target?: "_self" | "_blank"
}

const URLS: URLMetadata[] = [
  {
    url: "/projects",
    title: "Projects"
  },
  {
    url: "/contact",
    title: "Contact"
  },
  {
    url: "/Nolan-Seokane-Software-Developer-CV.pdf",
    title: "Download CV",
    target: "_blank"
  }
]

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-muted bg-background py-6 backdrop-blur-sm">
      <nav className="container flex max-w-7xl items-center justify-between">
        <Link href="/" title="Home" className="font-serif text-3xl font-bold">
          NS
        </Link>

        <NavigationMenu className="hidden xs:block">
          <NavigationMenuList>
            {URLS.map(({ title, url, target }) => (
              <NavigationMenuItem key={title}>
                <NavigationMenuLink
                  href={url}
                  title={`${title} Page`}
                  target={target || "_self"}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-x-4">
          <ToggleTheme />
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md border p-1 outline-none xs:hidden">
              <AlignJustify className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-[1rem] w-[170px] shadow-sm shadow-muted-foreground xs:hidden">
              {URLS.map(({ title, url, target }) => (
                <DropdownMenuItem
                  key={title}
                  className="bg-transparent p-0 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Link
                    href={url}
                    title={title}
                    target={target || "_self"}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full justify-start py-6"
                    )}
                  >
                    {title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
