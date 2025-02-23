import { z } from "zod"

const NameValidationSchema = z
  .string()
  .regex(
    /^[A-Za-z ]{3,}$/,
    `Name must contain at least 3 characters and no special characters or numbers.`
  )

const EmailValidationSchema = z
  .string()
  .min(2, "Email Address is required.")
  .email("Enter a valid email address.")

const SubjectValidationSchema = z
  .enum(["general", "job", "project", "other"])
  .or(z.string().min(1, { message: "Please select a valid subject line." }))

export const ContactFormValidationSchema = z.object({
  name: NameValidationSchema,
  email: EmailValidationSchema,
  subject: SubjectValidationSchema,
  sendCopy: z.boolean().default(false),
  message: z.string().min(2, {
    message: "Cannot send an empty message."
  })
})
