import { Suspense } from "react"
import { getSideProjects } from "@/actions/sideProjects"
import { Projects } from "@/components/projects"
import { Loading } from "@/components/loading"

const SideProjectsPage = async () => {
  const projects = await getSideProjects()

  return (
    <Suspense fallback={<Loading />}>
      <section className="container max-w-6xl">
        <h1 className="title mb-4">Side Projects</h1>
        <p className="mb-12 text-muted-foreground">
          Projects where I learn, and build for fun, or projects I have done
          freelancing.
        </p>

        {projects.length > 0 ? (
          <Projects projects={projects} />
        ) : (
          <p className="text-xl font-bold tracking-tight text-muted-foreground">
            There&#39;s currently no projects listed yet.
          </p>
        )}
      </section>
    </Suspense>
  )
}

export default SideProjectsPage
