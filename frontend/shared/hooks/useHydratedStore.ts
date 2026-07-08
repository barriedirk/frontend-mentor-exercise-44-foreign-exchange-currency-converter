import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHydratedStore<T, F>(
  store: (callback: (state: T) => F) => F,
  selector: (state: T) => F,
): F | undefined {
  const result = store(selector);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return isClient ? result : undefined;
}
