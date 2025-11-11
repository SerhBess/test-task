import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  rows = 4,
  disabled = false,
  required = false,
  maxLength,
}: TextareaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative pb-4">
          <div className="flex items-center justify-between">
            <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
              {required && <span className="ml-1 text-destructive">*</span>}
            </FormLabel>
            {maxLength && field.value && (
              <span className="text-xs text-muted-foreground">
                {field.value.length}/{maxLength}
              </span>
            )}
          </div>
          <FormControl>
            <Textarea
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className="resize-none min-h-[150px] transition-all duration-200 hover:border-primary/50 focus:border-primary"
              {...field}
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
