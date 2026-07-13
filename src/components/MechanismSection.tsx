"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Surface Capture",
    depth: "0–200m",
    body: "Phytoplankton absorb CO₂ at the sunlit surface through photosynthesis, converting it into organic carbon compounds—the foundation of all marine life.",
  },
  {
    num: "02",
    title: "Marine Snow Falls",
    depth: "200–1,000m",
    body: "When organisms die, they clump into 'marine snow'—a continuous shower of organic particles. Each flake carries locked carbon away from the atmosphere.",
  },
  {
    num: "03",
    title: "Deep Storage",
    depth: "1,000m+",
    body: "Carbon reaching below 1,000m is effectively sequestered from the atmosphere for centuries to millennia. Only 0.1% of surface carbon reaches the seafloor.",
  },
];

const particles = [0, 1, 2, 3, 4, 5, 6];

export default function MechanismSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(SplitText, ScrollTrigger);

    // Character-by-character tumble — each letter falls like a piece of marine snow
    // rotateX gives a 3D tumble effect as characters land
    const splitHeadline = SplitText.create(headlineRef.current!, {
      type: "chars,words",
    });

    ScrollTrigger.create({
      trigger: headlineRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          splitHeadline.chars,
          {
            y: -80,
            opacity: 0,
            rotateX: -90,
            transformOrigin: "0% 50% -20px",
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: {
              each: 0.04,
              from: "random",
            },
            duration: 0.9,
            ease: "back.out(1.7)",
            onComplete: () => splitHeadline.revert(),
          }
        );
      },
      once: true,
    });

    // Each step line reveals from left with a sweep
    const stepEls = stepsRef.current?.querySelectorAll(".mechanism-step");
    stepEls?.forEach((el, i) => {
      gsap.fromTo(
        el,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-[10vw] relative z-10 py-24">
      <div className="w-full flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

        {/* LEFT */}
        <div className="flex-1 max-w-xl">
          <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-[0.3em] text-xs mb-6">
            Depth: 200m — Mesopelagic Transition
          </p>
          <h2
            ref={headlineRef}
            className="text-[clamp(2.5rem,6vw,5rem)] font-serif italic mb-4 drop-shadow-lg leading-tight"
            style={{ perspective: "600px" }}
          >
            The Biological<br />Pump
          </h2>
          <p className="text-white/60 text-sm font-mono uppercase tracking-widest mb-10 gsap-reveal">
            Earth's most powerful carbon capture mechanism
          </p>

          <div ref={stepsRef} className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={i} className="mechanism-step flex gap-6 group">
                <div className="flex flex-col items-center pt-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border border-[var(--color-accent-cyan)]/40 flex items-center justify-center group-hover:border-[var(--color-accent-cyan)] transition-colors duration-500">
                    <span className="font-mono text-[10px] text-[var(--color-accent-cyan)]">{step.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 min-h-[60px] bg-gradient-to-b from-[var(--color-accent-cyan)]/30 to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-10">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-white font-serif text-xl">{step.title}</h3>
                    <span className="font-mono text-[10px] text-[var(--color-accent-green)] uppercase tracking-widest">{step.depth}</span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Animated Carbon Flow Diagram */}
        <div className="flex-1 flex flex-col items-center gap-6 gsap-reveal lg:pt-16">
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="glass-cyan rounded-xl p-5 text-center">
              <p className="font-mono text-3xl text-[var(--color-accent-green)] font-bold mb-1">2.5B</p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-mono">Tons/year sequestered</p>
            </div>
            <div className="glass-cyan rounded-xl p-5 text-center">
              <p className="font-mono text-3xl text-[var(--color-accent-cyan)] font-bold mb-1">10–100m</p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-mono">Daily sink rate</p>
            </div>
            <div className="glass-cyan rounded-xl p-5 text-center">
              <p className="font-mono text-3xl text-[var(--color-accent-green)] font-bold mb-1">70%</p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-mono">Global O₂ from ocean</p>
            </div>
            <div className="glass-cyan rounded-xl p-5 text-center">
              <p className="font-mono text-3xl text-[var(--color-accent-cyan)] font-bold mb-1">0.1%</p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-mono">Reaches the seafloor</p>
            </div>
          </div>

          <div className="relative w-[2px] h-64 bg-gradient-to-b from-[var(--color-accent-cyan)]/40 via-[var(--color-accent-green)]/20 to-transparent rounded-full overflow-visible">
            {particles.map((_, i) => (
              <div
                key={i}
                className="carbon-particle left-1/2 -translate-x-1/2"
                style={{
                  animationDelay: `${i * 0.35}s`,
                  animationDuration: `${2 + Math.random()}s`,
                  width: `${3 + Math.random() * 4}px`,
                  height: `${3 + Math.random() * 4}px`,
                }}
              />
            ))}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_12px_var(--color-accent-cyan)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-accent-green)] shadow-[0_0_8px_var(--color-accent-green)]" />
          </div>

          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest text-center">
            Carbon particle descent simulation
          </p>
        </div>
      </div>
    </section>
  );
}
