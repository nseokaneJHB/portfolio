import Link from "next/link"
import React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"

import { AlignJustify } from "lucide-react"

import { ToggleTheme } from "@/components/toggle-theme"
import { cn } from "@/lib/utils"

type LinksMetadata = {
  link: string
  label: string
  description: string
}

type URLMetadata = {
  url?: string
  title: string
  links?: LinksMetadata[]
  target?: "_self" | "_blank"
}

const URLS: URLMetadata[] = [
  {
    title: "Projects",
    links: [
      {
        link: "/work-projects",
        label: "Work Projects",
        description:
          "Work projects I am/was contributing to at companies I work/worked for."
      },
      {
        link: "/side-projects",
        label: "Side Projects",
        description:
          "Projects where I learn, and build for fun, or projects I have done freelancing."
      }
    ]
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
      <nav className="container flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          title="Home Page"
          className="font-serif text-3xl font-bold"
        >
          NS
        </Link>

        <NavigationMenu className="hidden xs:block">
          <NavigationMenuList>
            {URLS.map(({ title, url, links, target }) => (
              <NavigationMenuItem key={title}>
                {links && links?.length > 0 ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent text-sm font-light text-muted-foreground transition-colors hover:text-foreground">
                      {title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="grid gap-2 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {links.map(({ label, link, description }) => (
                        <Link
                          key={label}
                          href={link}
                          title={`${label} Page`}
                          target={target || "_self"}
                          className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <span className="text-sm font-medium leading-none">
                            {label}
                          </span>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {description}
                          </p>
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </>
                ) : url ? (
                  <Link
                    href={url}
                    title={`${title} Page`}
                    target={target || "_self"}
                  >
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                      )}
                    >
                      {title}
                    </NavigationMenuLink>
                  </Link>
                ) : null}
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
            <DropdownMenuContent className="mr-[1rem] xs:hidden">
              {URLS.map(({ title, url, links, target }) =>
                links ? (
                  <DropdownMenuSub key={title}>
                    <DropdownMenuSubTrigger className="w-full cursor-pointer p-3">
                      Projects
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="max-w-[200px]">
                        {links.map(({ label, link, description }) => (
                          <DropdownMenuItem
                            key={label}
                            className="cursor-pointer p-0"
                          >
                            <Link
                              href={link}
                              title={`${label} Page`}
                              target={target || "_self"}
                              className="w-full space-y-2 p-3"
                            >
                              <span className="text-sm font-medium leading-none">
                                {label}
                              </span>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {description}
                              </p>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : url ? (
                  <DropdownMenuItem key={title} className="p-0">
                    <Link
                      href={url}
                      className="w-full p-3"
                      title={`${title} Page`}
                      target={target || "_self"}
                    >
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ) : null
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
