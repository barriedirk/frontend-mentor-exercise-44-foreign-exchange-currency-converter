interface IconProps extends Readonly<React.SVGProps<SVGSVGElement>> {
  readonly size?: number | string;
}

export function ChevronDownIcon({ className, size = 12, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2.988 4.02h6.024c.422 0 .633.515.328.82l-3 3a.48.48 0 0 1-.68 0l-3-3c-.304-.305-.093-.82.328-.82"
      />
    </svg>
  );
}
