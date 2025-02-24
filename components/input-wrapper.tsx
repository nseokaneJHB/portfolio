import {
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { UseFormReturn, FieldValues, Path } from "react-hook-form"

type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  required?: boolean
  form: UseFormReturn<T>
}

type InputFieldProps<T extends FieldValues> = BaseFieldProps<T> & {
  type: "input"
  placeholder?: string
  inputType: "text" | "email"
}

type SelectFieldProps<T extends FieldValues> = BaseFieldProps<T> & {
  type: "select"
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

type TextAreaFieldProps<T extends FieldValues> = BaseFieldProps<T> & {
  type: "textarea"
  placeholder?: string
  rows?: number
}

type InputWrapperProps<T extends FieldValues> =
  | InputFieldProps<T>
  | SelectFieldProps<T>
  | TextAreaFieldProps<T>

export const InputWrapper = <T extends FieldValues>(
  props: InputWrapperProps<T>
) => {
  const { name, label, required, form } = props

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel
            className={cn({ "text-pink-600": form.formState.errors[name] })}
          >
            {label} {required && "*"}
          </FormLabel>
          <FormControl className="w-full">
            {props.type === "input" ? (
              <Input
                {...field}
                placeholder={props.placeholder}
                type={props.inputType || "text"}
                className="h-fit w-full rounded-lg py-4"
              />
            ) : props.type === "select" ? (
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-fit w-full rounded-lg py-4 text-base md:text-sm">
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {props.options.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="h-fit py-4 text-base md:text-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : props.type === "textarea" ? (
              <Textarea
                {...field}
                rows={props.rows}
                placeholder={props.placeholder}
                className="w-full rounded-lg py-4"
              />
            ) : null}
          </FormControl>
          <FormMessage className="tracking-wide text-pink-600" />
        </FormItem>
      )}
    />
  )
}
