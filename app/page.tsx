import Link from "next/link"

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import { Intro } from "@/components/intro"
import { Stack } from "@/components/stack"
import { Projects } from "@/components/projects"

import { getProjects } from "@/actions/projectsActions"
import { cn } from "@/lib/utils"

const HomePage = async () => {
  const { projects, total, limit } = await getProjects(3)

  return (
    <div className="container max-w-7xl">
      <Intro />

      <div className="flex-1 pb-20 text-center sm:mt-0 sm:text-start">
        <h1 className="title no-underline">Intro</h1>
        <p className="mt-3 font-light text-muted-foreground">
          Experienced Software Developer with years of expertise in Python,
          JavaScript, and SQL. Skilled in creating scalable systems,
          maintaining, debugging, and leading teams. Strong in collaboration and
          communication, eager to contribute to dynamic teams and their success.
        </p>
      </div>

      <Stack />

      {projects.length > 0 && (
        <>
          <h1 className="title no-underline">Projects</h1>
          <p className="my-3 font-light text-muted-foreground">
            These are the projects where I learn, build for fun, projects I have
            done freelancing, projects I contributed to at companies I worked
            for and projects I am contributing to currently
          </p>
          <Projects projects={projects} />

          <Link
            href="/projects"
            className={cn(
              navigationMenuTriggerStyle(),
              "mx-auto mt-6 block h-fit border px-6 py-4 text-center"
            )}
          >
            There&#39;s {total - limit} more projects...
          </Link>
        </>
      )}
    </div>
  )
}

export default HomePage
