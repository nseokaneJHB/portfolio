import Image from "next/image"

const STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Python",
  "Postgresql",
  "Mongo",
  "Git"
]

export const Stack = () => {
  return (
    <div className="sm:mt-0 sm:text-start flex-1 pb-20 text-center">
      <h1 className="title no-underline">Main Stack</h1>
      <div className="sm:justify-start mt-3 flex flex-wrap justify-center gap-4">
        {STACK.map(skill => (
          <div
            key={skill.toLowerCase()}
            className="group flex flex-col items-center justify-center gap-y-2"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-full border bg-white">
              <Image
                fill
                alt={skill}
                src={`/icons/${skill.toLowerCase()}.svg`}
                className="rounded-lg object-cover object-center p-3"
              />
            </div>
            <p>{skill}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
