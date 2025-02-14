import { Intro } from "@/components/intro"
import { Stack } from "@/components/stack"

const HomePage = () => {
  return (
    <div className="container max-w-6xl">
      <Intro />

      <div className="sm:mt-0 sm:text-start flex-1 pb-20 text-center">
        <h1 className="title no-underline">Intro</h1>
        <p className="mt-3 font-light text-muted-foreground">
          Experienced Software Developer with years of expertise in Python,
          JavaScript, and SQL. Skilled in creating scalable systems,
          maintaining, debugging, and leading teams. Strong in collaboration and
          communication, eager to contribute to dynamic teams and their success.
        </p>
      </div>

      <Stack />
    </div>
  )
}

export default HomePage
