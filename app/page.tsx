import { Metadata } from "next"
import Link from "next/link"

import { Intro } from "@/components/intro"
import { Stack } from "@/components/stack"
import { Projects } from "@/components/projects"

import { getProjects } from "@/actions/projectsActions"

export const metadata: Metadata = {
  title: "Nolan Seokane"
}

const HomePage = async () => {
  const { projects, total, limit } = await getProjects(3)

  return (
    <div className="container max-w-7xl">
      <Intro />

      <div className="mb-16 flex-1 text-center sm:text-start">
        <h1 className="title mb-6">Intro</h1>
        <p className="font-light text-muted-foreground">
          Experienced Software Developer with years of expertise in Python,
          JavaScript, and SQL. Skilled in creating scalable systems,
          maintaining, debugging, and leading teams. Strong in collaboration and
          communication, eager to contribute to dynamic teams and their success.
        </p>
      </div>

      <Stack />

      {projects.length > 0 && (
        <div className="flex-1 text-center sm:text-start">
          <h1 className="title mb-6">Projects</h1>
          <p className="mb-6 font-light text-muted-foreground">
            These are the projects where I learn, build for fun, projects I have
            done freelancing, projects I contributed to at companies I worked
            for and projects I am contributing to currently
          </p>
          <Projects projects={projects} />

          <Link
            title="Projects"
            href="/projects"
            className="mx-auto mt-6 block h-fit w-fit rounded-lg border bg-background p-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            There&#39;s {total - limit} more projects...
          </Link>
        </div>
      )}
    </div>
  )
}

export default HomePage
