interface CircleWrapperProps {
  readonly children: React.ReactNode;
  readonly size?: "sm" | "md";
}

export default function CircleWrapper({
  size = "md",
  children,
}: CircleWrapperProps) {
  const sizeMap = {
    sm: "size-[1.25rem]",
    md: "size-[1.5rem]",
  };
  return (
    <div
      className={`relative ${sizeMap[size]} rounded-full overflow-hidden shrink-0 bg-neutral-800 isolation-isolate`}
    >
      <div className="absolute inset-0 flex items-center justify-center [&>*]:!w-full [&>*]:!h-full [&>*]:!rounded-full [&>*]:bg-cover [&>*]:bg-center">
        {children}
      </div>
    </div>
  );
}
