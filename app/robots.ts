import { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${process.env.DOMAIN_URL}/sitemap.xml`
  }
}

export default robots
