import { Suspense } from "react"

import { notFound } from "next/navigation"

import { getWorkProjectBySlug, getWorkProjects } from "@/actions/workProjects"

import { Loading } from "@/components/loading"
import { Project } from "@/components/project"

export const generateStaticParams = async () => {
  const projects = await getWorkProjects()
  return projects.map(project => ({ slug: project.slug }))
}

type ProjectProps = {
  params: Promise<{ slug: string }>
}

const ProjectPage = async ({ params }: Awaited<ProjectProps>) => {
  const { slug } = await params
  const project = await getWorkProjectBySlug(slug)

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
