import * as React from "react"

import {
  Hr,
  Html,
  Font,
  Body,
  Head,
  Text,
  Preview,
  Tailwind
} from "@react-email/components"

import { getLabelFromOptions, toTitleCase } from "@/lib/utils"
import { SUBJECT_OPTIONS } from "@/lib/constants"

interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

const EmailTemplate = ({
  name,
  email,
  subject,
  message
}: Readonly<EmailTemplateProps>) => (
  <Tailwind
    config={{
      theme: {
        screens: {
          xs: "400px",
          sm: "667px"
        },
        extend: {
          borderColor: {
            DEFAULT: "rgb(var(44, 50, 77) / 0.5)"
          }
        }
      }
    }}
  >
    <Html>
      <Head>
        <Font fontFamily="Poppins" fallbackFontFamily="Times New Roman" />
      </Head>

      <Preview>New Email From {toTitleCase(name)}</Preview>

      <Body className="grid place-content-center place-items-center">
        <div className="m-0 mx-auto box-border w-full max-w-[500px] bg-gray-100 px-4 py-6 text-center text-gray-700">
          <Text className="m-0 mb-6 box-border text-3xl font-bold leading-snug">
            Dear Nolan Seokane
          </Text>
          <Text className="m-0 mb-4 box-border leading-snug">
            My name is <strong>{toTitleCase(name)}</strong> I am messaging you
            regarding{" "}
            {subject === "other"
              ? "something I think you might be interested in."
              : "a " + getLabelFromOptions(subject, SUBJECT_OPTIONS)}
            {". "}
            Here is my message to you.
          </Text>
          <div className="m-0 mb-6 box-border border-2">
            <Text className="m-0 box-border p-2 leading-snug">{message}</Text>
          </div>
          <div className="mb-4">
            <Text className="m-0 box-border leading-snug">Kind regards</Text>
            <Text className="m-0 box-border leading-snug">
              Name: <strong>{toTitleCase(name)}</strong>
            </Text>
            <Text className="m-0 box-border leading-snug">
              Email: <strong>{email}</strong>
            </Text>
          </div>
          <Hr className="m-0 mb-2 box-border border-2" />
          <Text className="m-0 box-border leading-snug text-gray-700/60">
            &copy; 2025 Nolan Seokane. All rights reserved.
          </Text>
        </div>
      </Body>
    </Html>
  </Tailwind>
)

EmailTemplate.PreviewProps = {
  subject: "other",
  name: "Nolan Kgotso",
  email: "kgotsonolan@gmail.com",
  message: "Some message to test with"
}

export default EmailTemplate
