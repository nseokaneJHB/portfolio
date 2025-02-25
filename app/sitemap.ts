import { MetadataRoute } from "next"

import { getProjectsSlugs } from "@/actions/projectsActions"

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { DOMAIN_URL } = process.env
  const lastModified = new Date("2025-02-25T22:01:19.732Z")

  const projects = await getProjectsSlugs()

  const dynamicEntries = projects.map(({ slug, publishedAt }) => ({
    url: `${DOMAIN_URL}/projects/${slug}`,
    lastModified: new Date(publishedAt) || lastModified
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${DOMAIN_URL}`, lastModified },
    { url: `${DOMAIN_URL}/contact`, lastModified },
    { url: `${DOMAIN_URL}/projects`, lastModified }
  ]

  return [...staticRoutes, ...dynamicEntries]
}

export default sitemap
