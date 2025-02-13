import path from "path"
import matter from "gray-matter"
import { promises as fs } from "fs"

const rootDirectory = path.join(process.cwd(), "content", "work-projects")

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export async function getWorkProjectBySlug(
  slug: string
): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" })
    const { data, content } = matter(fileContent)
    return {
      metadata: {
        ...data,
        slug,
        title: data.title,
        site: data.site,
        code: data.code
      },
      content
    }
  } catch (error) {
    console.error("Error getting project by slug:", error)
    return null
  }
}

export async function getWorkProjects(
  limit?: number
): Promise<ProjectMetadata[]> {
  try {
    const files = await fs.readdir(rootDirectory)

    const projects = await Promise.all(
      files.map(async file => await getWorkProjectMetadata(file))
    )

    const sortedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.publishedAt ?? "")
      const dateB = new Date(b.publishedAt ?? "")
      return dateB.getTime() - dateA.getTime()
    })

    return limit ? sortedProjects.slice(0, limit) : sortedProjects
  } catch (error) {
    console.error("Error getting projects:", error)
    return []
  }
}

export async function getWorkProjectMetadata(
  filepath: string
): Promise<ProjectMetadata> {
  try {
    const slug = filepath.replace(/\.mdx$/, "")
    const filePath = path.join(rootDirectory, filepath)
    const fileContent = await fs.readFile(filePath, { encoding: "utf8" })
    const { data } = matter(fileContent)
    return {
      ...data,
      slug,
      title: data.title,
      site: data.site,
      code: data.code
    }
  } catch (error) {
    console.error("Error getting project metadata:", error)
    return {
      slug: filepath.replace(/\.mdx$/, ""),
      title: "",
      site: "",
      code: ""
    }
  }
}
