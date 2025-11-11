import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "email" | "password" | "number" | "url";
  disabled?: boolean;
  required?: boolean;
}

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled = false,
  required = false,
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative pb-4">
          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
              {...field}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(e.target.valueAsNumber);
                } else {
                  field.onChange(e);
                }
              }}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-xs text-muted-foreground">
              {description}
            </FormDescription>
          )}
          <FormMessage className="absolute top-full left-0 text-xs font-medium text-destructive leading-tight" />
        </FormItem>
      )}
    />
  );
}
