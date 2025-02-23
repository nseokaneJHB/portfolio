import { Suspense } from "react"

import { notFound } from "next/navigation"

import { Loading } from "@/components/loading"
import { Project } from "@/components/project"

import { getProjectBySlug, getProjects } from "@/actions/projectsActions"

export const generateStaticParams = async () => {
  const { projects } = await getProjects()
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

  return (
    <Suspense fallback={<Loading />}>
      <Project content={content} metadata={metadata} />
    </Suspense>
  )
}

export default ProjectPage
