import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/** True once the page is scrolled more than `px` down; false while prerendering. */
export function useScrolledPast(px: number) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > px,
    () => false
  );
}
