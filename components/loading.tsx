import { LoaderCircle } from "lucide-react"

export const Loading = () => {
  return (
    <section className="container mt-24 flex max-w-6xl animate-pulse flex-col items-center justify-center gap-4">
      <LoaderCircle className="h-24 w-24 animate-spin" />
      <p className="text-3xl font-bold tracking-tight">Loading...</p>
    </section>
  )
}
