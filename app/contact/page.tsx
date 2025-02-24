import { Suspense } from "react"

import Link from "next/link"

import { Linkedin, Github, Mail } from "lucide-react"

import { Loading } from "@/components/loading"
import { ContactForm } from "@/components/contact-form"

const ContactPage = () => {
  const SOCIAL_LINKS = [
    {
      name: "Email",
      label: "nolanseokane@gmail.com",
      icon: <Mail className="h-6 w-6" />,
      link: "mailto:nolanseokane@gmail.com"
    },
    {
      name: "Github",
      label: "github.com/nseokane",
      icon: <Github className="h-6 w-6" />,
      link: "https://github.com/nseokane"
    },
    {
      name: "LinkedIn",
      label: "linkedin.com/in/nolan-seokane",
      icon: <Linkedin className="h-6 w-6" />,
      link: "https://www.linkedin.com/in/nolan-seokane-6467a312a/"
    }
  ]

  return (
    <Suspense fallback={<Loading />}>
      <section className="container max-w-7xl text-center sm:text-start">
        <h1 className="title mb-6">Get In Touch</h1>

        <p className="mb-3 font-light text-muted-foreground">
          Feel free to reach out for collaboration, opportunities or if
          you&#39;d like to discuss any projects.
        </p>

        <p className="mb-12 font-light text-muted-foreground">
          Use the form below or drop me an email. New fashioned social media
          work too.
        </p>

        <div className="mb-16 rounded-lg bg-muted/50 px-6 py-4">
          <h1 className="mb-6 font-serif text-xl font-bold">Quick Connect</h1>

          {SOCIAL_LINKS.map(({ link, label, icon, name }) => (
            <Link
              key={label}
              href={link}
              title={name}
              className="mb-3 flex items-center gap-2 text-muted-foreground hover:text-sky-600"
            >
              <span>{icon}</span>
              <p className="overflow-hidden truncate whitespace-nowrap text-start">
                {label}
              </p>
            </Link>
          ))}

          <div className="border-t pt-3">
            <p className="text-start text-sm text-muted-foreground/90">
              Based in Johannesburg, South Africa
            </p>
          </div>
        </div>

        <ContactForm />
      </section>
    </Suspense>
  )
}

export default ContactPage
