import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

type LoadingProps = {
  title?: string
  size?: "sm" | "lg"
  className?: string
}

export const Loading = ({
  className,
  size = "lg",
  title = "Loading..."
}: LoadingProps) => {
  return (
    <section
      className={cn(
        "container mt-24 flex max-w-7xl animate-pulse flex-col items-center justify-center gap-4",
        className
      )}
    >
      <LoaderCircle
        className={cn("animate-spin", {
          "h-10 w-10": size === "sm",
          "h-24 w-24": size === "lg"
        })}
      />
      <p
        className={cn("font-bold tracking-tight", {
          "text-md": size === "sm",
          "text-3xl": size === "lg"
        })}
      >
        {title}
      </p>
    </section>
  )
}
