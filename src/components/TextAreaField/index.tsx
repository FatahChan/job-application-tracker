import type { FieldValues, Control, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

function TextAreaField<TFields extends FieldValues>({
  formControl,
  name,
  label,
  ...textareaProps
}: React.ComponentProps<typeof Textarea> & {
  formControl: Control<TFields, unknown>;
  name: Path<TFields>;
  label?: string;
}) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-4 items-center">
            <FormLabel className="capitalize leading-none">{label ?? field.name}</FormLabel>
            <FormMessage className="text-xs leading-none" />
          </div>
          <FormControl>
            <Textarea {...field} {...textareaProps} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default TextAreaField;
