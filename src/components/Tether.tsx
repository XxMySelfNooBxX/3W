"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Tether() {
  useEffect(() => {
    let ctx: gsap.Context;
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      ctx = gsap.context(() => {
        gsap.fromTo(".tether-fill",
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: true
            }
          }
        );
      });
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="fixed left-[5vw] top-0 bottom-0 w-px bg-white/10 z-0 pointer-events-none">
      <div className="tether-fill w-full bg-[var(--color-accent-cyan)] shadow-[0_0_10px_var(--color-accent-cyan)]" />
    </div>
  );
}
