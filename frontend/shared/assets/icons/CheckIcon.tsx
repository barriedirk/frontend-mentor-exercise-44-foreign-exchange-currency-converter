interface IconProps extends Readonly<React.SVGProps<SVGSVGElement>> {
  readonly size?: number | string;
}

export function CheckIcon({ className, size = 11, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.207 1.957c.117-.117.305-.117.398 0l.68.656c.094.117.094.305 0 .399l-7.031 7.031a.27.27 0 0 1-.399 0L.715 6.926c-.094-.117-.094-.305 0-.399l.68-.68c.093-.093.28-.093.398 0l2.25 2.274z"
      />
    </svg>
  );
}
