import { Suspense } from "react"

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Loading } from "@/components/loading"
import { Project } from "@/components/project"

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

  return (
    <Suspense fallback={<Loading />}>
      <Project content={content} metadata={metadata} />
    </Suspense>
  )
}

export default ProjectPage
