import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { CalendarIcon, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import type { FieldValues, Control, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';

function DateField<TFields extends FieldValues>({
  formControl,
  name,
  label,
  reset,
}: {
  formControl: Control<TFields, unknown>;
  name: Path<TFields>;
  label?: string;
  reset?: () => void;
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

          <div className="flex gap-4 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? format(field.value, 'yyyy-MM-dd') : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date('1900-01-01')}
                  initialFocus
                  className="shadow-xl"
                />
              </PopoverContent>
            </Popover>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                reset?.();
              }}
            >
              <RotateCcw size={16} />
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
}

export default DateField;
