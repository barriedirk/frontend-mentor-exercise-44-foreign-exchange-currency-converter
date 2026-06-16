import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { SearchIcon } from "@/shared/assets/icons";

export interface SearchInputProps extends Readonly<
  React.InputHTMLAttributes<HTMLInputElement>
> {}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <div className="relative w-full min-w-[20rem]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-[1rem] pointer-events-none text-text-primary">
          <SearchIcon className="size-[1.25rem]" />
        </div>

        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full h-[3.5rem] bg-surface-input text-text-primary placeholder:text-text-muted border border-border-subtle rounded-12 pl-[3rem] pr-[1rem] font-mono text-preset-3 tracking-wider transition-all outline-none",
            "focus:border-brand focus:ring-1 focus:ring-brand",
            "disabled:pointer-events-none disabled:opacity-30",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
