import { useLayoutEffect, type RefObject } from "react";

export function useResizeObserver(
  target: RefObject<Element>,
  cb: (entry: ResizeObserverEntry) => unknown
) {
  useLayoutEffect(() => {
    const elem = target.current;
    if (!elem) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      cb(entries[0]);
    });
    resizeObserver.observe(elem);

    return () => {
      resizeObserver.unobserve(elem);
    };
  }, [target, cb]);
}
