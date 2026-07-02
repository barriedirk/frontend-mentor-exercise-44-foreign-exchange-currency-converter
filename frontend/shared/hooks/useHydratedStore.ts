import { useEffect, useState } from "react";

export function useHydratedStore<T, F>(
  store: (callback: (state: T) => F) => F,
  selector: (state: T) => F,
): F | undefined {
  const result = store(selector);
  const [hydratedResult, setHydratedResult] = useState<F>();

  useEffect(() => {
    setHydratedResult(result);
  }, [result]);

  return hydratedResult;
}
