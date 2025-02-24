import Link from "next/link"

import { JSX } from "react"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"

const ExternalLink = ({
  href,
  children,
  ...props
}: JSX.IntrinsicElements["a"]) => {
  if (!href) {
    return null
  }

  return (
    <Link
      href={href}
      title="Project"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </Link>
  )
}

const components = {
  a: ExternalLink
}

export const MDXContent = (props: JSX.IntrinsicAttributes & MDXRemoteProps) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
