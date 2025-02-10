import Link from "next/link"

import { ToggleTheme } from "@/components/toggle-theme"

const URLS = [
  {
    url: "/projects",
    label: "Projects"
  },
  {
    url: "/contact",
    label: "Contact"
  }
]

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-muted bg-background/75 py-6 backdrop-blur-sm">
      <nav className="container flex max-w-3xl items-center justify-between">
        <Link href="/" className="font-serif text-3xl font-bold">
          NS
        </Link>

        <div className="flex items-center gap-6 text-sm font-light text-muted-foreground sm:gap-10">
          {URLS.map(({ url, label }) => (
            <Link
              href={url}
              key={label}
              className="transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </div>

        <ToggleTheme />
      </nav>
    </header>
  )
}
