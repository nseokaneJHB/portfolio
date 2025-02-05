import Image from "next/image"
import autherImage from "@/public/globe.svg"

export const Intro = () => {
  return (
    <section className="flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center">
      <div className="mt-2 flex-1 md:mt-0">
        <h1 className="title no-underline">Hey, I&#39;m Nolan.</h1>
        <p className="mt-3 font-light text-muted-foreground">
          I&#39;m a software engineer currently based in Johannesburg, South
          Africa. I&#39;m passionate about learning new technologies
        </p>
      </div>
      <div className="relative">
        <Image
          priority
          width={175}
          height={175}
          src={autherImage}
          alt="Nolan Seokane"
          className="flex-1 rounded-lg grayscale"
        />
      </div>
    </section>
  )
}
