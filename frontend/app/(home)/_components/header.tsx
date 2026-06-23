import { Logo } from "@/shared/ui/Logo";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-[15px] sm:p-[20px]">
      <Logo />
      <ul className="flex flex-wrap items-center gap-2 text-preset-6 sm:text-preset-4 text-neutral-200">
        <li>55 CURRENCIES</li>
        <li className="flex items-center gap-2 before:content-['•'] before:text-neutral-200">
          EOD
        </li>
        <li className="flex items-center gap-2 before:content-['•'] before:text-neutral-200">
          ECB DATA
        </li>
      </ul>
    </header>
  );
}
