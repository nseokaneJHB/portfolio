import { Suspense } from "react"
import { getSideProjects } from "@/actions/sideProjects"
import { SideProjects } from "@/components/side-projects"
import { Loading } from "@/components/loading"

const SideProjectsPage = async () => {
  const projects = await getSideProjects()

  return (
    <Suspense fallback={<Loading />}>
      <section className="container max-w-6xl">
        <h1 className="title mb-12">Side Projects</h1>

        {projects.length > 0 ? (
          <SideProjects projects={projects} />
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
