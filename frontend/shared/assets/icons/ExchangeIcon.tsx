interface IconProps extends Readonly<React.SVGProps<SVGSVGElement>> {
  readonly size?: number | string;
}

export function ExchangeIcon({ className, size = 11, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 11 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9 2 5l4-4M2 5h16m-4 6 4 4-4 4m4-4H2" />
    </svg>
  );
}
