"use client"
import { useState } from "react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { Send, LoaderCircle } from "lucide-react"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription
} from "@/components/ui/alert-dialog"
import { InputWrapper } from "@/components/input-wrapper"

import { contact } from "@/actions/contactAction"

import { cn } from "@/lib/utils"
import { SUBJECT_OPTIONS } from "@/lib/constants"
import { ContactFormValidationSchema } from "@/lib/schema"

type ContactFormValidationType = z.infer<typeof ContactFormValidationSchema>

export const ContactForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<ContactFormValidationType>({
    resolver: zodResolver(ContactFormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      sendCopy: false
    }
  })

  const mutation = useMutation({
    mutationFn: async (payload: ContactFormValidationType) =>
      await contact(payload),
    onMutate: async () => setIsDialogOpen(true),
    onSuccess: async response => {
      console.log("\nRESPONSE DATA:", response)
      form.reset()
      setIsDialogOpen(true)
    },
    onError: async error => {
      console.log("\nRESPONSE ERROR:", error)
      setIsDialogOpen(true)
    }
  })

  const onSubmit = (payload: ContactFormValidationType) =>
    mutation.mutate(payload)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-[500px] flex-col gap-2 text-start"
      >
        <div className="mb-6 space-y-6">
          <InputWrapper
            required
            form={form}
            name="name"
            type="input"
            inputType="text"
            label="What is your name?"
            placeholder="Your name here"
          />

          <InputWrapper
            required
            form={form}
            name="email"
            type="input"
            inputType="email"
            label="What is your email address?"
            placeholder="Your email address here"
          />

          <InputWrapper
            required
            form={form}
            type="select"
            name="subject"
            options={SUBJECT_OPTIONS}
            placeholder="Select the subject line"
            label="What are you contacting me about?"
          />

          <InputWrapper
            rows={4}
            required
            form={form}
            name="message"
            type="textarea"
            placeholder="Your message here..."
            label="What is your message to me?"
          />
        </div>

        <Button
          size="lg"
          type="submit"
          disabled={mutation.isPending}
          className="flex h-fit w-full items-center gap-2 rounded-lg p-4"
        >
          <Send />
          Send Message
        </Button>

        <AlertDialog open={isDialogOpen}>
          <AlertDialogContent className="rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle
                className={cn("text-center", {
                  "animate-pulse": mutation.isPending
                })}
              >
                {mutation.isPending ? (
                  <LoaderCircle className="mx-auto h-10 w-10 animate-spin" />
                ) : mutation.isSuccess ? (
                  "Email sent!"
                ) : (
                  "Oops, email not sent!"
                )}
              </AlertDialogTitle>
              <AlertDialogDescription
                className={cn("text-center", {
                  "animate-pulse": mutation.isPending
                })}
              >
                {mutation.isPending
                  ? "Sending email..."
                  : mutation.isSuccess
                    ? "Thank you! I'll get back to you as soon as possible."
                    : mutation.error?.message}
              </AlertDialogDescription>
            </AlertDialogHeader>

            {!mutation.isPending ? (
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="mx-auto"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            ) : null}
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  )
}
