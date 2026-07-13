"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: "50×", label: "More carbon stored vs. atmosphere", color: "var(--color-accent-cyan)" },
  { value: "30%", label: "Of all human CO₂ absorbed annually", color: "var(--color-accent-green)" },
  { value: "38,000", label: "Gigatons dissolved in the ocean", color: "var(--color-accent-cyan)" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Stagger the stat cards in
    gsap.fromTo(".hero-stat-card",
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center px-[10vw] relative z-10 overflow-hidden"
    >
      {/* Faint depth-ring background element */}
      <div className="absolute right-[-10vw] top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-[-5vw] top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-[0vw] top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full border border-white/[0.07] pointer-events-none" />

      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT: Editorial Headline */}
        <div className="flex-1 max-w-2xl">
          <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-[0.3em] text-xs mb-6">
            Depth: 0m — Epipelagic Zone
          </p>
          <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-bold font-serif mb-6 drop-shadow-2xl gsap-reveal leading-[1.05] tracking-tight">
            The Ocean<br />Breathes.<br />
            <span className="italic font-normal opacity-80">We Should</span><br />
            Listen.
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-lg mb-10 gsap-reveal leading-relaxed">
            Bathyal is a decentralized telemetry network—monitoring Earth's carbon heartbeat from the twilight zone to the abyss.
          </p>

          {/* Scroll CTA */}
          <div className="flex flex-col items-start gap-2 gsap-reveal">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent-cyan)]">
              Initiate Descent
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent-cyan)] to-transparent animate-pulse" />
          </div>
        </div>

        {/* RIGHT: Stat Cards Stack */}
        <div className="flex flex-col gap-4 w-full max-w-xs lg:max-w-sm">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="hero-stat-card glass rounded-2xl p-5 relative overflow-hidden group cursor-default"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Scan line effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-cyan)] to-transparent animate-[scan-line_2s_linear_infinite]" />
              </div>

              <p
                className="font-mono text-4xl font-bold mb-2 tracking-tight"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest font-mono leading-relaxed">
                {stat.label}
              </p>

              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-2xl opacity-60"
                style={{ background: stat.color }}
              />
            </div>
          ))}

          {/* Source tag */}
          <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest pl-1">
            Source: WHOI Ocean Acidification Research, 2024
          </p>
        </div>
      </div>
    </section>
  );
}
