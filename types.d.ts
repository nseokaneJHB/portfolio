type ProjectMetadata = {
  title: string
  summary: string
  image: string
  author: string
  publishedAt: string
  slug: string
  type?: "side" | "work"
}

type ProjectWithContent = {
  metadata: ProjectMetadata
  content: string
}
