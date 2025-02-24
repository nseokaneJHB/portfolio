import Image from "next/image"
import Link from "next/link"

import { Eye, Earth, Github } from "lucide-react"

import { formatDate } from "@/lib/utils"

export const ProjectCard = ({ project }: { project: ProjectMetadata }) => {
  return (
    <div className="group w-full rounded-xl border shadow-sm shadow-muted-foreground/10 transition-transform duration-500 hover:scale-105">
      <div className="relative min-h-[200px] w-full overflow-hidden rounded-t-xl bg-muted">
        <Image
          fill
          priority
          sizes="180px"
          src={project.image}
          alt={project.title}
          className="rounded-t-lg object-cover object-center transition-transform duration-500 group-hover:scale-105 group-hover:delay-100"
        />
      </div>

      <div className="p-4">
        <h2 className="mb-2 line-clamp-1 text-xl font-bold tracking-tight">
          {project.title}
        </h2>
        <p className="mb-3 line-clamp-1 text-sm text-muted-foreground transition-colors duration-500 ease-linear group-hover:text-foreground">
          {project.summary}
        </p>
        <div className="mb-3 flex justify-center gap-2 sm:justify-start">
          <Link
            title="More Details"
            href={`/projects/${project.slug}`}
            className="rounded-md border bg-background p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:outline-none"
          >
            <Eye className="mx-auto h-4 w-4" />
          </Link>
          <Link
            target="_blank"
            href={project.live}
            title="Live Website"
            className="rounded-md border bg-background p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:outline-none"
          >
            <Earth className="mx-auto h-4 w-4" />
          </Link>
          {project.code ? (
            <Link
              target="_blank"
              href={project.code}
              title="Website Code"
              className="rounded-md border bg-background p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:outline-none"
            >
              <Github className="mx-auto h-4 w-4" />
            </Link>
          ) : null}
        </div>
        <p className="text-xs font-light text-muted-foreground transition-colors duration-500 ease-linear group-hover:text-foreground">
          {project.type === "work" ? "Joined Project In" : "Published On"}{" "}
          {formatDate(project.publishedAt)}
        </p>
      </div>
    </div>
  )
}
