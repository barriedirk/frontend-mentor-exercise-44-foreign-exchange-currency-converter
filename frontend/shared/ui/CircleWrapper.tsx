const SIZE_MAP = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
} as const;

interface CircleWrapperProps {
  readonly children: React.ReactNode;
  readonly size?: keyof typeof SIZE_MAP;
}

export default function CircleWrapper({
  size = "md",
  children,
}: CircleWrapperProps) {
  return (
    <div
      className={`relative ${SIZE_MAP[size]} rounded-full overflow-hidden shrink-0 bg-neutral-800 isolation-isolate`}
    >
      <div className="absolute inset-0 flex items-center justify-center [&>*]:!w-full [&>*]:!h-full [&>*]:!rounded-full [&>*]:bg-cover [&>*]:bg-center">
        {children}
      </div>
    </div>
  );
}
