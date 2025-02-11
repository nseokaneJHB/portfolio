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
}

const URLS: URLMetadata[] = [
  {
    title: "Projects",
    links: [
      {
        link: "/side-projects",
        label: "Side Projects",
        description:
          "Projects where I learn, build for fun, or projects I have done freelancing."
      }
      // {
      //   link: "/work-projects",
      //   label: "Work Projects",
      //   description:
      //     "Projects I am/was involved in at companies I work/worked for."
      // }
    ]
  },
  {
    url: "/contact",
    title: "Contact"
  },
  {
    url: "/Nolan-Seokane-Software-Developer-CV.pdf",
    title: "Download CV"
  }
]

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-muted bg-background/75 py-6 backdrop-blur-sm">
      <nav className="container flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          title="Home Page"
          className="font-serif text-3xl font-bold"
        >
          NS
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {URLS.map(({ title, url, links }) => (
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
                    passHref
                    href={url}
                    legacyBehavior
                    title={`${title} Page`}
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

        <ToggleTheme />
      </nav>
    </header>
  )
}
