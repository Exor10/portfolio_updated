"use client";

import { useCallback, useState } from "react";
import FlipTitle from "./FlipTitle";
import GlitchName from "./GlitchName";

/** The name and the flipping title: the flips wait until the name has decoded. */
export default function HeroHeading() {
  const [introDone, setIntroDone] = useState(false);
  const onIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <GlitchName onIntroDone={onIntroDone} />
      <FlipTitle start={introDone} />
    </>
  );
}
