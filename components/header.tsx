import React from "react"

import Link from "next/link"

import { AlignJustify } from "lucide-react"

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

import { ToggleTheme } from "@/components/toggle-theme"
import { Logo } from "@/components/logo"
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
    url: "/Nolan-Seokane-Software-Engineer-CV.pdf",
    title: "Download CV",
    target: "_blank"
  }
]

export const Header = async () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-muted bg-background py-6 shadow backdrop-blur-sm">
      <nav className="container flex max-w-7xl items-center justify-between">
        <Link href="/" title="Home">
          <Logo />
        </Link>

        {/* Small Screens and above */}
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
          {/* Mobile Screen */}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md border p-1 text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground xs:hidden">
              <AlignJustify className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-[1rem] w-[170px] xs:hidden">
              {URLS.map(({ title, url, target }) => (
                <DropdownMenuItem
                  asChild
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
