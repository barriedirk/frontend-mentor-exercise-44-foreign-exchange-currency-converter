interface IconProps extends Readonly<React.SVGProps<SVGSVGElement>> {
  readonly size?: number | string;
}

export function ExchangeVerticalIcon({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m11 6 4-4 4 4m-4-4v16m-6-4-4 4-4-4m4 4V2" />
    </svg>
  );
}
