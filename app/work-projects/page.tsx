import { getWorkProjects } from "@/actions/workProjects"
import { SideProjects } from "@/components/side-projects"

const WorkProjectsPage = async () => {
  const projects = await getWorkProjects()

  return (
    <section className="container max-w-6xl">
      <h1 className="title mb-4">Work Projects</h1>
      <p className="mb-12 text-muted-foreground">
        Projects I am/was contributing to at companies I work/worked for.
      </p>

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
