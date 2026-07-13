"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const vaultStats = [
  { value: "1,000", unit: "Years", label: "Deep carbon stays locked away" },
  { value: "3,800", unit: "Metres", label: "Average depth of Earth's oceans" },
  { value: "71%", unit: "of Earth", label: "Covered by ocean surface" },
];

export default function AbyssSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(SplitText, ScrollTrigger);

    // "Total Silence. Total Impact." — each word materializes from absolute blur/darkness
    // This simulates something solidifying from the black, lightless abyss
    const splitHeadline = SplitText.create(headlineRef.current!, {
      type: "words",
    });

    ScrollTrigger.create({
      trigger: headlineRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          splitHeadline.words,
          {
            opacity: 0,
            filter: "blur(24px)",
            y: 30,
            color: "rgba(255,255,255,0)",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            color: "rgba(255,255,255,1)",
            stagger: {
              each: 0.12,
              from: "start",
            },
            duration: 1.4,
            ease: "power2.out",
            onComplete: () => splitHeadline.revert(),
          }
        );
      },
      once: true,
    });

    // Quote fades in with a slow breath
    ScrollTrigger.create({
      trigger: quoteRef.current,
      start: "top 88%",
      onEnter: () => {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }
        );
      },
      once: true,
    });

    // Vault stat numbers count up from 0 as they enter view
    gsap.utils.toArray<HTMLElement>(".vault-stat-value").forEach((el) => {
      const endVal = parseFloat(el.dataset.value || "0");
      const isPercent = el.dataset.unit === "%";
      const proxy = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => {
          gsap.to(proxy, {
            val: endVal,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = isPercent
                ? `${Math.round(proxy.val)}%`
                : proxy.val >= 1000
                  ? Math.round(proxy.val).toLocaleString()
                  : `${Math.round(proxy.val)}`;
            },
          });
        },
        once: true,
      });
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-[10vw] relative z-10 py-24">

      <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-[0.3em] text-xs mb-8 gsap-reveal">
        Depth: 4,000m+ — The Abyss
      </p>

      <h2
        ref={headlineRef}
        className="text-[clamp(3rem,9vw,7rem)] font-serif font-bold mb-6 drop-shadow-2xl leading-[1.0] tracking-tight"
      >
        Total Silence.<br />
        <span className="italic font-normal">Total Impact.</span>
      </h2>

      <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-20 gsap-reveal leading-relaxed">
        Understanding the deep ocean is the missing variable in every global climate model. Without it, our predictions are blind.
      </p>

      {/* Vault Stats with counting numbers */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-stretch justify-center gap-0 mb-20">
        {vaultStats.map((stat, i) => {
          const numericVal = parseFloat(stat.value.replace(/,/g, ""));
          return (
            <div
              key={i}
              className={`flex-1 flex flex-col items-center justify-center py-10 px-8 relative gsap-reveal
                ${i < vaultStats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""}
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-32 h-32 rounded-full bg-[var(--color-accent-cyan)] blur-3xl" />
              </div>
              <p
                className="vault-stat-value font-mono text-5xl md:text-6xl font-bold text-white mb-1 relative z-10"
                data-value={numericVal}
                data-unit={stat.unit.includes("%") ? "%" : ""}
              >
                0
              </p>
              <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-widest text-xs mb-3 relative z-10">
                {stat.unit}
              </p>
              <p className="text-white/40 text-sm font-mono max-w-[150px] relative z-10">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quote */}
      <blockquote className="max-w-2xl mb-16">
        <p
          ref={quoteRef}
          className="text-xl md:text-2xl font-serif italic text-white/70 leading-relaxed opacity-0"
        >
          "The deep ocean is the largest carbon reservoir on Earth — and the least understood."
        </p>
        <cite className="block mt-4 font-mono text-[10px] text-white/30 uppercase tracking-widest not-italic gsap-reveal">
          — Woods Hole Oceanographic Institution
        </cite>
      </blockquote>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-5 gsap-reveal mb-16">
        <button className="relative group bg-[var(--color-accent-cyan)] text-black font-mono uppercase tracking-widest text-xs py-4 px-10 rounded-full cursor-pointer animate-pulse-glow hover:scale-105 transition-transform duration-300">
          <span className="relative z-10">Join the Network</span>
        </button>
        <button className="glass text-white font-mono uppercase tracking-widest text-xs py-4 px-10 rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-300 border border-white/20">
          View Open Source
        </button>
      </div>

      {/* Footer Tags */}
      <div className="flex flex-wrap justify-center gap-4 gsap-reveal">
        {["UN SDG 13: Climate Action", "UN SDG 14: Life Below Water", "Open Data Initiative"].map((tag) => (
          <span key={tag} className="glass rounded-full px-4 py-1.5 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
