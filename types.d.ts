type ProjectType = "side" | "work"

type ProjectMetadata = {
  slug: string
  live: string
  code?: string
  title: string
  image: string
  author: string
  summary: string
  publishedAt: string
  type?: "side" | "work"
}

type ProjectWithContent = {
  metadata: ProjectMetadata
  content: string
}

type PageProjects = {
  total: number
  limit: number
  hasMore: boolean
  projects: ProjectMetadata[]
}
