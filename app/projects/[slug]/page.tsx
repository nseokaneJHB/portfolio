import { Suspense } from "react"

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { ArrowLeftIcon } from "lucide-react"

import { Loading } from "@/components/loading"
import { MDXContent } from "@/components/mdx-content"

import { formatDate } from "@/lib/utils"

import { getProjectBySlug, getProjects } from "@/actions/projectsActions"

export const generateStaticParams = async () => {
  const { projects } = await getProjects()
  return projects.map(project => ({ slug: project.slug }))
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({
  params
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return {
    title: project.metadata.title,
    description: project.metadata.summary,
    openGraph: {
      images: [
        {
          url: project.metadata.image
        }
      ]
    }
  }
}

const ProjectPage = async ({ params }: Awaited<ProjectPageProps>) => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt, type } = metadata

  return (
    <Suspense fallback={<Loading />}>
      <section className="container max-w-7xl">
        <Link
          title="Back"
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to projects</span>
        </Link>

        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg sm:h-[400px]">
          <Image
            fill
            priority
            src={image}
            alt={title}
            className="object-cover"
          />
        </div>

        <h1 className="title">{title}</h1>
        <p className="mt-3 text-xs text-muted-foreground">
          {author} / {type === "work" ? "Joined Project In" : "Published At"}{" "}
          {formatDate(publishedAt)}
        </p>

        <main className="prose mt-16 dark:prose-invert">
          <MDXContent source={content} />
        </main>
      </section>
    </Suspense>
  )
}

export default ProjectPage
