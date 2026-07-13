"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,       // Lower = slower, silkier. 0.075 is premium
        duration: 1.4,     // Base duration
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
