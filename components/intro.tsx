import Image from "next/image"
import autherImage from "@/public/images/me.png"

export const Intro = () => {
  return (
    <section className="mb-16 flex flex-col-reverse items-center gap-x-10 gap-y-4 sm:flex-row">
      <div className="mt-2 flex-1 text-center sm:mt-0 sm:text-start">
        <h1 className="title no-underline">Hey there, I&#39;m Nolan.</h1>
        <p className="mt-3 font-light text-muted-foreground">
          A software engineer based in Johannesburg, South Africa whose
          passionate about learning new technologies and sharing knowledge with
          others.
        </p>
        <p className="mt-3 font-light text-muted-foreground">
          I skate for fun and I am open for modelling/acting opportunities.
        </p>
      </div>
      <div className="relative h-64 w-64 overflow-hidden rounded-full border bg-muted">
        <Image
          fill
          priority
          sizes="16rem"
          src={autherImage}
          alt="Nolan Seokane"
          className="rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </section>
  )
}
