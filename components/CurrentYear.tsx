"use client";

import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

/** The visitor's current year. Blank in the prerendered HTML: reading the
    clock while prerendering would freeze the build year into the page. */
export default function CurrentYear() {
  return useSyncExternalStore(
    noSubscribe,
    () => String(new Date().getFullYear()),
    () => ""
  );
}
