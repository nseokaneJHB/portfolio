import {
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl
} from "@/components/ui/form"
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent
} from "@/components/ui/select"

type CustomSelectProps = {
  name: string
  label: string
  required?: boolean
  className?: string
  placeholder?: string
  options: Array<{ value: string; label: string }>
}

export const CustomSelect = ({
  name,
  label,
  options,
  className,
  placeholder,
  required = false
}: CustomSelectProps) => {
  return (
    <FormItem className="w-full">
      <FormLabel></FormLabel>
    </FormItem>
  )
}
