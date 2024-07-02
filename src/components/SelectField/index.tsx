import { Select, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import type { PropsWithChildren } from 'react';
import type { FieldValues, Control, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';

function SelectField<TFields extends FieldValues>({
  formControl,
  name,
  label,
  children,
}: PropsWithChildren<{
  formControl: Control<TFields, unknown>;
  name: Path<TFields>;
  label?: string;
}>) {
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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectField;
