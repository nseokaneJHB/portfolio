import { Suspense } from "react"

import { Metadata } from "next"

import { Loading } from "@/components/loading"
import { ProjectsFilters } from "@/components/projects-filters"

export const metadata: Metadata = {
  title: "Projects"
}

const ProjectsPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <section className="container max-w-7xl">
        <h1 className="title mb-6">Projects</h1>
        <p className="mb-12 text-muted-foreground">
          These are the projects where I learn, build for fun, projects I have
          done freelancing, projects I contributed to at companies I worked for
          and projects I am contributing to currently.
        </p>

        <ProjectsFilters />
      </section>
    </Suspense>
  )
}

export default ProjectsPage
