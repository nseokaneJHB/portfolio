import { getProjects } from "@/actions/projects"
import { Projects } from "@/components/projects"

const ProjectsPage = async () => {
  const projects = await getProjects()

  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        <h1 className="title mb-12">Projects</h1>

        {projects.length > 0 ? (
          <Projects projects={projects} />
        ) : (
          <p className="text-xl font-bold tracking-tight text-muted-foreground">
            There&#39;s currently no projects listed yet.
          </p>
        )}
      </div>
    </section>
  )
}

export default ProjectsPage
