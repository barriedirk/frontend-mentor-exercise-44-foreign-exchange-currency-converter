import { cn } from "@/shared/utils/cn";

export interface CurrencySelectButtonProps extends Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> {
  readonly code: string;
  readonly flagUrl: string;
}

export function CurrencySelectButton({
  className,
  code,
  flagUrl,
  ...props
}: CurrencySelectButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-[0.75rem] bg-surface-input text-text-primary border border-transparent rounded-12 px-[1rem] py-[0.75rem] font-mono text-preset-3-bold tracking-wider transition-all cursor-pointer h-fit w-fit select-none outline-none",
        "hover:bg-surface-hover",
        "focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand focus:ring-2 focus:ring-brand focus:border-brand",
        "disabled:pointer-events-none disabled:opacity-30",
        className,
      )}
      {...props}
    >
      <img
        src={flagUrl}
        alt={`${code} flag`}
        className="h-[1.5rem] w-[2rem] object-cover rounded-2"
        loading="lazy"
      />
      <span>{code}</span>
      <svg
        className="w-[1rem] h-[1rem] text-text-muted transition-transform group-focus:text-brand"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}
