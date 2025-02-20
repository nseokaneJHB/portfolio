import Image from "next/image"
import Link from "next/link"

import { formatDate } from "@/lib/utils"

export const ProjectCard = ({ project }: { project: ProjectMetadata }) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-xl border shadow-sm shadow-muted-foreground/10 transition-transform duration-500 hover:scale-105"
    >
      <div className="relative min-h-[200px] overflow-hidden rounded-t-xl bg-muted">
        <Image
          fill
          sizes="180px"
          src={project.image}
          alt={project.title}
          className="rounded-t-lg object-cover object-center transition-transform duration-500 group-hover:scale-105 group-hover:delay-100"
        />
      </div>

      <div className="space-y-2 p-4">
        <h2 className="line-clamp-1 text-xl font-bold tracking-tight">
          {project.title}
        </h2>
        <p className="line-clamp-1 text-sm text-muted-foreground transition-colors duration-500 ease-linear group-hover:text-foreground">
          {project.summary}
        </p>
        <p className="text-xs font-light text-muted-foreground transition-colors duration-500 ease-linear group-hover:text-foreground">
          {project.type === "work" ? "Joined Project In" : "Published On"}{" "}
          {formatDate(project.publishedAt)}
        </p>
      </div>
    </Link>
  )
}
