import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"

import { formatDate } from "@/lib/utils"
import { ArrowLeftIcon } from "lucide-react"
import { getProjectBySlug, getProjects } from "@/actions/projects"
import { notFound } from "next/navigation"
import { MDXContent } from "@/components/mdx-content"

export const generateStaticParams = async () => {
  const projects = await getProjects()
  return projects.map(project => ({ slug: project.slug }))
}

type ProjectProps = {
  params: Promise<{ slug: string }>
}

const ProjectPage = async ({ params }: Awaited<ProjectProps>) => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt } = metadata

  return (
    <section className="pb-24 pt-32">
      <div className="container max-w-3xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to projects</span>
        </Link>

        <Suspense fallback={<div>Loading...</div>}>
          {image && (
            <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title || ""}
                className="object-cover"
                fill
              />
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
        </Suspense>
      </div>
    </section>
  )
}

export default ProjectPage
