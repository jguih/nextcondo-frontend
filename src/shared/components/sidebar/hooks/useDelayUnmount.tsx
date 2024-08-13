import { useEffect, useState } from "react";

export type UseDelayUnmountProps = {
  open: boolean;
  delay?: number;
};

export const useDelayUnmount = ({ open, delay }: UseDelayUnmountProps) => {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (open && !shouldMount) {
      setShouldMount(true);
    } else if (!open && shouldMount) {
      timeoutId = setTimeout(() => setShouldMount(false), delay);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, open]);

  return { shouldMount };
};
