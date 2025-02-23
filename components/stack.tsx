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
    <div className="mb-16 flex-1 text-center sm:mt-0 sm:text-start">
      <h1 className="title mb-6">Main Stack</h1>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
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
