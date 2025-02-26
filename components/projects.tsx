import { ProjectCard } from "@/components/project-card"

import { cn } from "@/lib/utils"

export const Projects = ({ projects }: { projects: ProjectMetadata[] }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4",
        {
          "sm:grid-cols-2 md:grid-cols-3": projects.length <= 3
        }
      )}
    >
      {projects.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
