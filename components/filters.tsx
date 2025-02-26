import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

import { Filter } from "lucide-react"

import { PROJECT_TYPE_FILTERS } from "@/lib/constants"
import { cn, toSlug, toTitleCase } from "@/lib/utils"

type FiltersProps = {
  total: number
  isFetching: boolean
  projectType: ProjectType | null
  setProjectType: React.Dispatch<React.SetStateAction<ProjectType | null>>
}

export const Filters = ({
  total,
  isFetching,
  projectType,
  setProjectType
}: FiltersProps) => {
  return (
    <div className="mb-12 flex items-center justify-between gap-4">
      <p className="text-foreground">Total Projects: {total || 0}</p>

      {/* Small Screens and above */}
      <div className="hidden w-full flex-col items-center justify-center gap-2 xs:flex-row sm:flex sm:w-fit">
        <p className="text-foreground">Filters:</p>
        {PROJECT_TYPE_FILTERS.map(type => {
          const normalizeType =
            type.toLowerCase() !== "all" ? type.toLowerCase() : null

          return type ? (
            <Button
              key={toSlug(type)}
              disabled={isFetching}
              onClick={() => setProjectType(normalizeType as ProjectType)}
              className={cn(
                "group h-fit w-full rounded-lg border bg-background px-4 py-2 text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus-visible:outline-none xs:w-fit",
                {
                  "bg-accent text-accent-foreground":
                    normalizeType === projectType || normalizeType === "all"
                }
              )}
            >
              {toTitleCase(type)} Projects
            </Button>
          ) : null
        })}
      </div>

      {/* Mobile Screen */}
      <Dialog>
        <DialogTrigger className="flex h-fit items-center gap-2 rounded-lg border px-4 py-2 text-muted-foreground shadow-none outline-none transition-colors hover:bg-accent hover:text-foreground sm:hidden">
          <span>Filters:</span>
          <Filter className="h-6 w-6" />
        </DialogTrigger>
        <DialogContent className="gap-y-6 rounded-lg sm:hidden">
          <DialogHeader className="text-start" hidden>
            <DialogTitle className="text-3xl no-underline" hidden>
              Filter by
            </DialogTitle>
            <DialogDescription className="font-light" hidden>
              Filter projects by any of the below.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-2">
            <label className="text-sm font-medium leading-none">
              Filter By Project Type:
            </label>
            <RadioGroup
              className="gap-2"
              defaultValue="All"
              onValueChange={event => {
                const normalizeType =
                  event.toLowerCase() !== "all" ? event.toLowerCase() : null

                setProjectType(normalizeType as ProjectType)
              }}
            >
              {PROJECT_TYPE_FILTERS.map(type => {
                const isActive =
                  type.toLowerCase() === projectType ||
                  (type.toLowerCase() === "all" && !projectType)

                return (
                  <Label
                    key={type}
                    className={cn(
                      "group flex items-center gap-x-2 text-lg text-muted-foreground hover:cursor-pointer",
                      {
                        "text-accent-foreground": isActive
                      }
                    )}
                  >
                    <RadioGroupItem
                      id={type}
                      value={type}
                      className={cn(
                        "h-6 w-6 bg-white group-hover:bg-accent [&>span>svg]:hidden",
                        {
                          "bg-sky-400 group-hover:bg-sky-500 data-[state=checked]:bg-sky-400 group-hover:data-[state=checked]:bg-sky-500":
                            isActive
                        }
                      )}
                    />
                    {toTitleCase(type)} Projects
                  </Label>
                )
              })}
            </RadioGroup>
          </div>
          <hr />
          <DialogFooter className="gap-2">
            <Button
              onClick={() => setProjectType(null)}
              className="h-fit w-full rounded-lg bg-yellow-400 p-4 hover:bg-yellow-600"
            >
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
