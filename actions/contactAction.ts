"use server"
import { z } from "zod"
import { Resend } from "resend"

import { ContactFormValidationSchema } from "@/lib/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactFormValidationType = z.infer<typeof ContactFormValidationSchema>

export const contact = async (payload: ContactFormValidationType) => {
  const parse = ContactFormValidationSchema.safeParse(payload)

  if (!parse.success) {
    return { error: parse.error.errors[0], status: 400 }
  }

  const to = ["nolanseokane@gmail.com"]

  if (parse.data.sendCopy === true) {
    to.push(parse.data.email)
  }

  try {
    const { data, error } = await resend.emails.send({
      to,
      subject: parse.data.subject,
      from: process.env.RESEND_EMAIL!,
      text: `New email from ${parse.data.name}!<br /><br />Contact ${parse.data.name} on this email address ${parse.data.email} for further contact.`
    })

    if (error) {
      console.log("\nERROR SENDING EMAIL:", error)
      return { error, status: 500 }
    }

    return { data }
  } catch (error) {
    console.log("\nRESEND ERROR - Could not contact me:", { error })
    return { error, status: 500 }
  }
}
