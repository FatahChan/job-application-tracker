import type { FieldValues, Control, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

function OtpField<TFields extends FieldValues>({
  formControl,
  name,
}: {
  formControl: Control<TFields, unknown>;
  name: Path<TFields>;
}) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>One-Time Password</FormLabel>
          <FormControl>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default OtpField;
