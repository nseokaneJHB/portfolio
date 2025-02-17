import { Suspense } from "react"

import { notFound } from "next/navigation"

import { getSideProjectBySlug, getSideProjects } from "@/actions/sideProjects"

import { Loading } from "@/components/loading"
import { Project } from "@/components/project"

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

  return (
    <Suspense fallback={<Loading />}>
      <Project content={content} metadata={metadata} />
    </Suspense>
  )
}

export default ProjectPage
