import Image from "next/image"
import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"

export const Projects = ({ projects }: { projects: ProjectMetadata[] }) => {
  return (
    <ul
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8",
        {
          "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4": projects.length <= 3
        }
      )}
    >
      {projects.map(project => (
        <li key={project.slug} className="group relative">
          <Link href={`/${project.type}-projects/${project.slug}`}>
            {project.image && (
              <div className="relative min-h-[200px] overflow-hidden rounded-xl bg-muted">
                <Image
                  fill
                  sizes="180px"
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105 group-hover:delay-100"
                />
              </div>
            )}

            <div className="absolute inset-0 rounded-lg bg-background/85 opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:backdrop-blur-sm" />

            <div className="absolute inset-x-0 bottom-0 translate-y-2 rounded-lg px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100">
              <h2 className="line-clamp-1 text-xl font-bold tracking-tight">
                {project.title}
              </h2>
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {project.summary}
              </p>
              <p className="text-xs font-light text-muted-foreground">
                {project.type === "work" ? "Joined Project In" : "Published On"}{" "}
                {formatDate(project.publishedAt ?? "")}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
