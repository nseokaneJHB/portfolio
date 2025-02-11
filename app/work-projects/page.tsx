import { getWorkProjects } from "@/actions/workProjects"
import { SideProjects } from "@/components/side-projects"

const WorkProjectsPage = async () => {
  const projects = await getWorkProjects()

  return (
    <section className="container max-w-6xl">
      <h1 className="title mb-12">Work Projects</h1>

      {projects.length > 0 ? (
        <SideProjects projects={projects} />
      ) : (
        <p className="text-xl font-bold tracking-tight text-muted-foreground">
          There&#39;s currently no projects listed yet.
        </p>
      )}
    </section>
  )
}

export default WorkProjectsPage
