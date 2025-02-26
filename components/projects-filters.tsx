"use client"

import { useQueryState } from "nuqs"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Projects } from "@/components/projects"
import { Loading } from "@/components/loading"
import { Filters } from "@/components/filters"

import { DEFAULT_PROJECT_LIMIT } from "@/lib/constants"

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
      <Filters
        isFetching={isFetching}
        total={data?.total || 0}
        projectType={projectType}
        setProjectType={setProjectType}
      />

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
                className="mx-auto mt-6 block h-fit w-fit rounded-lg border bg-background p-4 text-sm font-medium text-muted-foreground !shadow-none transition-colors hover:bg-accent hover:text-accent-foreground"
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
