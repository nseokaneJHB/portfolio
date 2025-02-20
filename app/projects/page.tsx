import { Suspense } from "react"

import { Loading } from "@/components/loading"
import { Projects } from "@/components/projects"

import { getProjects } from "@/actions/projectsActions"

const ProjectsPage = async () => {
  const { projects, total } = await getProjects()

  return (
    <Suspense fallback={<Loading />}>
      <section className="container max-w-7xl">
        <h1 className="title mb-4">Projects</h1>
        <p className="mb-12 text-muted-foreground">
          These are the projects where I learn, build for fun, projects I have
          done freelancing, projects I contributed to at companies I worked for
          and projects I am contributing to currently.
        </p>

        {projects.length > 0 ? (
          <>
            <p className="mb-12 text-foreground">Total Projects: {total}</p>
            <Projects projects={projects} />
          </>
        ) : (
          <p className="text-xl font-bold tracking-tight text-muted-foreground">
            There&#39;s currently no projects listed yet.
          </p>
        )}
      </section>
    </Suspense>
  )
}

export default ProjectsPage
