"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: "50×", label: "More carbon stored vs. atmosphere", color: "var(--color-accent-cyan)" },
  { value: "30%", label: "Of all human CO₂ absorbed annually", color: "var(--color-accent-green)" },
  { value: "38,000", label: "Gigatons dissolved in the ocean", color: "var(--color-accent-cyan)" },
];

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(SplitText, ScrollTrigger);

    // Word-by-word reveal — each word slides up from a clip mask
    // This gives the "text materialising from the ocean surface" feel
    const splitHeadline = SplitText.create(headlineRef.current!, {
      type: "words,lines",
      linesClass: "overflow-hidden pb-[0.1em]",
    });

    gsap.fromTo(
      splitHeadline.words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.3,
        onComplete: () => splitHeadline.revert(),
      }
    );

    // Subtitle: fade in with a soft blur (like looking through water)
    gsap.fromTo(
      subRef.current,
      { opacity: 0, filter: "blur(12px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.4, ease: "power3.out", delay: 0.8 }
    );

    // Stat cards slide in from the right with stagger
    gsap.fromTo(".hero-stat-card",
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.7
      }
    );
  }, []);

  return (
    <section className="min-h-screen flex items-center px-[10vw] relative z-10 overflow-hidden">
      {/* Depth ring decorations */}
      <div className="absolute right-[-10vw] top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-[-5vw] top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-[0vw] top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full border border-white/[0.07] pointer-events-none" />

      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT */}
        <div className="flex-1 max-w-2xl">
          <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-[0.3em] text-xs mb-6">
            Depth: 0m — Epipelagic Zone
          </p>
          <h1
            ref={headlineRef}
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold font-serif mb-6 drop-shadow-2xl leading-[1.05] tracking-tight"
          >
            The Ocean<br />Breathes.<br />
            <span className="italic font-normal opacity-80">We Should</span><br />
            Listen.
          </h1>
          <p
            ref={subRef}
            className="text-lg md:text-xl text-white/70 max-w-lg mb-10 leading-relaxed"
          >
            Bathyal is a decentralized telemetry network—monitoring Earth's carbon heartbeat from the twilight zone to the abyss.
          </p>

          <div className="flex flex-col items-start gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent-cyan)]">
              Initiate Descent
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent-cyan)] to-transparent animate-pulse" />
          </div>
        </div>

        {/* RIGHT: Stat Cards */}
        <div className="flex flex-col gap-4 w-full max-w-xs lg:max-w-sm">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="hero-stat-card glass rounded-2xl p-5 relative overflow-hidden group cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)] to-transparent animate-[scan-line_2s_linear_infinite]" />
              </div>
              <p className="font-mono text-4xl font-bold mb-2 tracking-tight" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest font-mono leading-relaxed">
                {stat.label}
              </p>
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-2xl opacity-60" style={{ background: stat.color }} />
            </div>
          ))}
          <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest pl-1">
            Source: WHOI Ocean Acidification Research, 2024
          </p>
        </div>
      </div>
    </section>
  );
}
