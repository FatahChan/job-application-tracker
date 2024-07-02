import { cn } from '@/lib/utils';
import React from 'react';

export interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DebouncedInput = React.forwardRef<HTMLInputElement, DebouncedInputProps>(
  ({ className, type, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const lastEvent = React.useRef<React.ChangeEvent<HTMLInputElement>>();
    const deferredInputValue = React.useDeferredValue(inputValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      lastEvent.current = event;
    };

    React.useEffect(() => {
      if (lastEvent.current && onChange) {
        const syntheticEvent = {
          ...lastEvent.current,
          target: {
            ...lastEvent.current.target,
            value: deferredInputValue,
          },
        };
        onChange(syntheticEvent);
      }
    }, [deferredInputValue, onChange]);

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        value={deferredInputValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
DebouncedInput.displayName = 'DebouncedInput';

export { DebouncedInput };
