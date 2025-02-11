import { Suspense } from "react"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { ArrowLeftIcon } from "lucide-react"

import { getSideProjectBySlug, getSideProjects } from "@/actions/sideProjects"

import { MDXContent } from "@/components/mdx-content"
import { Loading } from "@/components/loading"

import { formatDate } from "@/lib/utils"

export const generateStaticParams = async () => {
  const projects = await getSideProjects()
  return projects.map(project => ({ slug: project.slug }))
}

type ProjectProps = {
  params: Promise<{ slug: string }>
}

const ProjectPage = async ({ params }: Awaited<ProjectProps>) => {
  const { slug } = await params
  const project = await getSideProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt } = metadata

  return (
    <Suspense fallback={<Loading />}>
      <section className="container max-w-6xl">
        <Link
          href="/side-projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to projects</span>
        </Link>

        {image && (
          <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg sm:h-[400px]">
            <Image fill src={image} alt={title} className="object-cover" />
          </div>
        )}

        <div>
          <h1 className="title">{title}</h1>
          <p className="mt-3 text-xs text-muted-foreground">
            {author} / {formatDate(publishedAt ?? "")}
          </p>
        </div>

        <main className="prose mt-16 dark:prose-invert">
          <MDXContent source={content} />
        </main>
      </section>
    </Suspense>
  )
}

export default ProjectPage
