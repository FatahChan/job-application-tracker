import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onFocus, onBlur, ...props }, ref) => {
    const preventDefault = React.useCallback(
      (e: Event) => e.preventDefault(),
      [],
    );
    const preventUpDown = React.useCallback((e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    }, []);
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        onFocus={(e) => {
          if (type === "number") {
            e.target.addEventListener("wheel", preventDefault, {
              passive: false,
            });
            e.target.addEventListener("keydown", preventUpDown, {
              passive: false,
            });
          }
          onFocus?.(e);
        }}
        onBlur={(e) => {
          if (type === "number") {
            e.target.removeEventListener("wheel", preventDefault);
            e.target.removeEventListener("keydown", preventUpDown);
          }
          onBlur?.(e);
        }}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
