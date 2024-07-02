import type { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

function TextInputField<TFields extends FieldValues>({
  formControl,
  name,
  label,
  ...inputProps
}: React.ComponentProps<typeof Input> & {
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
            <Input {...field} {...inputProps} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default TextInputField;
