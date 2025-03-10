"use server"

import path from "path"
import matter from "gray-matter"
import { promises as fs } from "fs"
import { toTitleCase } from "@/lib/utils"

const rootDirectory = path.join(process.cwd(), "content")

export const getProjectBySlug = async (
  slug: string
): Promise<ProjectWithContent | null> => {
  const filePath = path.join(rootDirectory, `${slug}.mdx`)

  try {
    await fs.access(filePath)
  } catch {
    console.warn(`${toTitleCase(slug)} not found: ${filePath}`)
    return null
  }

  try {
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" })
    const { data, content } = matter(fileContent)
    return {
      content,
      metadata: {
        ...data,
        slug,
        live: data.live,
        title: data.title,
        image: data.image,
        author: data.author,
        summary: data.summary,
        publishedAt: data.publishedAt
      }
    }
  } catch (error) {
    console.error("Error getting project by slug:", error)
    return null
  }
}

export const getProjectMetadata = async (
  filepath: string
): Promise<ProjectMetadata | null> => {
  try {
    const slug = filepath.replace(/\.mdx$/, "")
    const filePath = path.join(rootDirectory, filepath)
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" })
    const { data } = matter(fileContent)
    return {
      ...data,
      slug,
      live: data.live,
      title: data.title,
      image: data.image,
      author: data.author,
      summary: data.summary,
      publishedAt: data.publishedAt
    }
  } catch (error) {
    console.error("Error getting project metadata:", error)
    return null
  }
}

export const getProjects = async (
  limit: number = 0,
  filter: ProjectMetadata["type"] | "" = ""
): Promise<PageProjects> => {
  try {
    const files = await fs.readdir(rootDirectory)

    const rawProjects = await Promise.all(
      files.map(async file => await getProjectMetadata(file))
    )

    const cleanedProjects = rawProjects.filter(
      (project): project is ProjectMetadata => project !== null
    )

    let projects = cleanedProjects.sort((a, b) => {
      const dateA = new Date(a.publishedAt ?? "")
      const dateB = new Date(b.publishedAt ?? "")
      return dateB.getTime() - dateA.getTime()
    })

    if (filter) {
      projects = projects.filter(project => project.type === filter)
    }

    const total = cleanedProjects.length
    const hasMore = limit > 0 && projects.length > limit
    projects = limit ? projects.slice(0, limit) : projects

    return {
      limit,
      total,
      hasMore,
      projects
    }
  } catch (error) {
    console.error("Error getting projects:", error)
    return {
      limit,
      total: 0,
      projects: [],
      hasMore: false
    }
  }
}

export const getProjectsSlugs = async () => {
  try {
    const files = await fs.readdir(rootDirectory)
    const rawProjects = await Promise.all(
      files.map(async file => await getProjectMetadata(file))
    )

    return rawProjects
      .filter((project): project is ProjectMetadata => project !== null)
      .map(project => {
        return {
          slug: project.slug,
          publishedAt: project.publishedAt
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt ?? "")
        const dateB = new Date(b.publishedAt ?? "")
        return dateB.getTime() - dateA.getTime()
      })
  } catch (error) {
    console.error("Error getting projects slugs:", error)
    return []
  }
}
