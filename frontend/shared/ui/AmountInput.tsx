import { cn } from "@/shared/utils/cn";
import { useId } from "react";

interface AmountInputProps extends Readonly<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">
> {
  readonly value: string;
  readonly onChange: (rawValue: string) => void;
}

export function AmountInput({
  className,
  value,
  onChange,
  placeholder = "0",
  ...props
}: AmountInputProps) {
  const inputId = useId();

  const formatDisplayValue = (val: string): string => {
    if (!val) return "";

    const parts = val.split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    let cleaned = inputVal.replace(/[^0-9.]/g, "");

    const splitParts = cleaned.split(".");
    if (splitParts.length > 2) {
      cleaned = `${splitParts[0]}.${splitParts.slice(1).join("")}`;
    }

    onChange(cleaned);
  };

  return (
    <div className="relative inline-block w-full max-w-[24rem]">
      <input
        id={inputId}
        type="text"
        inputMode="decimal"
        value={formatDisplayValue(value)}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent text-text-primary placeholder:text-text-muted font-mono font-bold text-[2.5rem] tracking-tight outline-none pb-[0.5rem] transition-all",
          "border-b-2 border-border-subtle",
          "focus:border-transparent focus:ring-2 focus:ring-brand focus:rounded-12 focus:px-[1rem] focus:py-[0.5rem] focus:my-[-0.5rem]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
