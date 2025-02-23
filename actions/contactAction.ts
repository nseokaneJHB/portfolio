"use server"
import { z } from "zod"
import { Resend } from "resend"

import EmailTemplate from "@/emails/contact-email-template"

import { getLabelFromOptions } from "@/lib/utils"
import { SUBJECT_OPTIONS } from "@/lib/constants"
import { ContactFormValidationSchema } from "@/lib/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactFormValidationType = z.infer<typeof ContactFormValidationSchema>

export const contact = async (payload: ContactFormValidationType) => {
  const parse = ContactFormValidationSchema.safeParse(payload)

  if (!parse.success) {
    return { error: parse.error.errors[0], status: 400 }
  }

  const to = ["nolanseokane@gmail.com"]

  const { email, subject, sendCopy } = parse.data

  if (sendCopy === true) {
    to.push(email)
  }

  try {
    const { data, error } = await resend.emails.send({
      to,
      from: process.env.RESEND_EMAIL!,
      react: EmailTemplate(parse.data),
      subject: `${subject === "other" ? "Other Opportunity" : getLabelFromOptions(subject, SUBJECT_OPTIONS)} from ${email}`
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
