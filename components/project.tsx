import Link from "next/link"
import Image from "next/image"

import { ArrowLeftIcon } from "lucide-react"

import { MDXContent } from "@/components/mdx-content"

import { formatDate } from "@/lib/utils"

export const Project = ({ metadata, content }: ProjectWithContent) => {
  const { title, image, author, publishedAt, type } = metadata

  return (
    <section className="container max-w-7xl">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to projects</span>
      </Link>

      <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg sm:h-[400px]">
        <Image fill src={image} alt={title} className="object-cover" />
      </div>

      <div>
        <h1 className="title">{title}</h1>
        <p className="mt-3 text-xs text-muted-foreground">
          {author} / {type === "work" ? "Joined Project In" : "Published At"}{" "}
          {formatDate(publishedAt)}
        </p>
      </div>

      <main className="prose mt-16 dark:prose-invert">
        <MDXContent source={content} />
      </main>
    </section>
  )
}
