import { Logo } from "@/shared/ui/Logo";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-[var(--spacing-200)] p-[var(--spacing-300)]">
      <Logo />
      <div
        className="flex flex-row items-center gap-2 text-preset-6 sm:text-preset-5 text-text-secondary font-mono"
        aria-label="Platform metadata"
      >
        <span>55 CURRENCIES</span>
        <span aria-hidden="true">·</span>
        <span>EOD</span>
        <span aria-hidden="true">·</span>
        <span>ECB DATA</span>
      </div>
    </header>
  );
}
