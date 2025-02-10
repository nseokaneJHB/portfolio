import Image from "next/image"
import autherImage from "@/public/images/me.png"

export const Intro = () => {
  return (
    <section className="flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center">
      <div className="mt-2 flex-1 md:mt-0">
        <h1 className="title no-underline">Hey, I&#39;m Nolan.</h1>
        <p className="mt-3 font-light text-muted-foreground">
          I&#39;m a software engineer based in Johannesburg, South Africa.
          I&#39;m passionate about learning new technologies and sharing
          knowledge with others.
        </p>
        <br />
        <p className="mt-3 font-light text-muted-foreground">
          I also skate as a hobby and open for modelling/acting opportunities.
        </p>
      </div>
      <div className="relative h-64 w-64 overflow-hidden rounded-full border bg-muted">
        <Image
          fill
          priority
          src={autherImage}
          alt="Nolan Seokane"
          className="rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </section>
  )
}
