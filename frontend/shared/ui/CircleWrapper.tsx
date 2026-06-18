interface CircleWrapperProps {
  readonly children: React.ReactNode;
}

export default function CircleWrapper({ children }: CircleWrapperProps) {
  return (
    <div className="relative size-[1.5rem] rounded-full overflow-hidden shrink-0 bg-neutral-800 isolation-isolate">
      <div className="absolute inset-0 flex items-center justify-center [&>*]:!w-full [&>*]:!h-full [&>*]:!rounded-full [&>*]:bg-cover [&>*]:bg-center">
        {children}
      </div>
    </div>
  );
}
