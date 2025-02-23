"use client"

import { useQueryState } from "nuqs"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Projects } from "@/components/projects"
import { Loading } from "@/components/loading"

import { PROJECT_TYPE_FILTERS, DEFAULT_PROJECT_LIMIT } from "@/lib/constants"
import { cn, toSlug, toTitleCase } from "@/lib/utils"

import { getProjects } from "@/actions/projectsActions"

export const ProjectsFilters = () => {
  const [projectType, setProjectType] = useQueryState<ProjectType>(
    "project_type",
    {
      clearOnDefault: true,
      serialize: value => value || "",
      parse: value => {
        if (value === "side" || value === "work") {
          return value as ProjectType
        }
        return null
      }
    }
  )

  const [projectLimit, setProjectLimit] = useQueryState<number>(
    "project_limit",
    {
      defaultValue: DEFAULT_PROJECT_LIMIT,
      clearOnDefault: true,
      serialize: value => value.toString(),
      parse: value => {
        const parsed = parseInt(value, DEFAULT_PROJECT_LIMIT)
        return isNaN(parsed) ? DEFAULT_PROJECT_LIMIT : parsed
      }
    }
  )

  const { isLoading, data, isFetching } = useQuery<PageProjects>({
    placeholderData: keepPreviousData,
    enabled: !!projectLimit || !!projectType,
    queryKey: ["projects", projectLimit, projectType],
    queryFn: async () => await getProjects(projectLimit, projectType || "")
  })

  return (
    <>
      <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-foreground">Total Projects: {data?.total || 0}</p>
        <div className="flex w-full flex-col items-center justify-center gap-2 xs:flex-row sm:w-fit">
          <p className="text-foreground">Filters:</p>
          {PROJECT_TYPE_FILTERS.map(type => {
            const normalizeType =
              type.toLowerCase() !== "all" ? type.toLowerCase() : null

            return type ? (
              <Button
                key={toSlug(type)}
                disabled={isFetching}
                onClick={async () =>
                  await setProjectType(normalizeType as ProjectType)
                }
                className={cn(
                  "group w-full rounded-md border bg-background text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:outline-none xs:w-fit",
                  {
                    "bg-accent text-accent-foreground":
                      normalizeType === projectType || normalizeType === "all"
                  }
                )}
              >
                {toTitleCase(type)} Projects
              </Button>
            ) : null
          })}
        </div>
      </div>

      {isLoading ? (
        <Loading title={`Loading ${projectType || "all"} projects...`} />
      ) : !isLoading && data && data.projects.length > 0 ? (
        <>
          <Projects projects={data.projects} />
          {data.hasMore ? (
            isFetching ? (
              <Loading
                size="sm"
                className="mt-6"
                title={`Loading more ${projectType || ""} projects...`}
              />
            ) : (
              <Button
                onClick={async () => await setProjectLimit(prev => prev + 3)}
                className="mt-6 block h-fit w-full rounded-md border bg-background px-4 py-2 text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:outline-none xs:mx-auto xs:w-fit"
              >
                Load more {projectType} projects
              </Button>
            )
          ) : null}
        </>
      ) : (
        <p className="text-xl font-bold tracking-tight text-muted-foreground">
          There&#39;s currently no projects listed yet.
        </p>
      )}
    </>
  )
}
