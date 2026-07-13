"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/components/HeroSection";
import MechanismSection from "@/components/MechanismSection";
import TelemetrySection from "@/components/TelemetrySection";
import AbyssSection from "@/components/AbyssSection";
import MarineSnow from "@/components/MarineSnow";
import Tether from "@/components/Tether";
import Waypoint from "@/components/Waypoint";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Zone color hex values (GSAP cannot read CSS vars)
const COLORS = {
  surface:  "#1E90FF",
  twilight: "#4B0082",
  bathyal:  "#120524",
  abyss:    "#0a0a0f",
};

const ZONES = [
  { depth: "0m",     label: "Epipelagic" },
  { depth: "500m",   label: "Mesopelagic" },
  { depth: "1500m",  label: "Bathypelagic" },
  { depth: "4000m+", label: "Abyssopelagic" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hudDepthRef = useRef<HTMLSpanElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const [zoneIndex, setZoneIndex] = useState(0);

  useEffect(() => {
    // ── Transition 1: Surface to Twilight (500m) ──
    const tlTwilight = gsap.timeline({
      scrollTrigger: {
        trigger: "#waypoint-twilight",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
    tlTwilight
      .to("#bg-twilight", { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1 }, 0)
      .to("#text-twilight", { opacity: 1, scale: 1, ease: "power2.out", duration: 0.3 }, 0)
      .to("#text-twilight", { scale: 20, opacity: 0, ease: "power2.in", duration: 0.7 }, 0.3);

    // ── Transition 2: Twilight to Bathyal (1500m) ──
    const tlBathyal = gsap.timeline({
      scrollTrigger: {
        trigger: "#waypoint-bathyal",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
    tlBathyal
      .to("#bg-bathyal", { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1 }, 0)
      .to("#text-bathyal", { opacity: 1, scale: 1, ease: "power2.out", duration: 0.3 }, 0)
      .to("#text-bathyal", { scale: 20, opacity: 0, ease: "power2.in", duration: 0.7 }, 0.3);

    // ── Transition 3: Bathyal to Abyss (3500m) ──
    const tlAbyss = gsap.timeline({
      scrollTrigger: {
        trigger: "#waypoint-abyss",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
    tlAbyss
      .to("#bg-abyss", { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1 }, 0)
      .to("#text-abyss", { opacity: 1, scale: 1, ease: "power2.out", duration: 0.3 }, 0)
      .to("#text-abyss", { scale: 20, opacity: 0, ease: "power2.in", duration: 0.7 }, 0.3);

    // ── Track zone transitions for HUD ──
    ScrollTrigger.create({
      trigger: "#zone-twilight",
      start: "top center",
      onEnter: () => setZoneIndex(1),
      onLeaveBack: () => setZoneIndex(0),
    });
    ScrollTrigger.create({
      trigger: "#zone-bathyal",
      start: "top center",
      onEnter: () => setZoneIndex(2),
      onLeaveBack: () => setZoneIndex(1),
    });
    ScrollTrigger.create({
      trigger: "#zone-abyss",
      start: "top center",
      onEnter: () => setZoneIndex(3),
      onLeaveBack: () => setZoneIndex(2),
    });

    // ── Depth HUD counter (scrub 0–4000) ──
    if (hudDepthRef.current && hudBarRef.current) {
      const proxy = { depth: 0 };
      gsap.to(proxy, {
        depth: 4000,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          // @ts-ignore: GSAP JS supports string selectors here, but TS definitions are outdated
          snap: {
            snapTo: ".snap-target",
            duration: { min: 0.2, max: 1.0 },
            delay: 0.2,
            ease: "power2.inOut"
          },
          onUpdate: () => {
            if (hudDepthRef.current) {
              hudDepthRef.current.textContent = `${Math.round(proxy.depth).toLocaleString()}m`;
            }
          },
        },
      });
      gsap.to(hudBarRef.current, {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    // ── Element reveals ──
    const revealEls = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
    revealEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 48 },
        {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full">

      {/* ── Fixed Background Wipes (z-[-1]) ── */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[#1E90FF]" id="bg-surface" />
        <div className="absolute inset-0 bg-[#4B0082]" id="bg-twilight" style={{ clipPath: "circle(0% at 50% 50%)" }} />
        <div className="absolute inset-0 bg-[#120524]" id="bg-bathyal" style={{ clipPath: "circle(0% at 50% 50%)" }} />
        <div className="absolute inset-0 bg-[#0a0a0f]" id="bg-abyss" style={{ clipPath: "circle(0% at 50% 50%)" }} />
      </div>

      {/* ── Cinematic Typography (z-10) ── */}
      <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
        <h1 id="text-twilight" className="text-[25vw] font-black text-stroke opacity-0 scale-50 absolute">500M</h1>
        <h1 id="text-bathyal" className="text-[25vw] font-black text-stroke opacity-0 scale-50 absolute">1500M</h1>
        <h1 id="text-abyss" className="text-[25vw] font-black text-stroke opacity-0 scale-50 absolute">3500M</h1>
      </div>

      {/* ── Fixed 3D Canvas Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
          <fog attach="fog" args={["#0a0a0f", 8, 35]} />
          <ambientLight intensity={0.6} />
          <MarineSnow count={1800} zoneIndex={zoneIndex} />
        </Canvas>
      </div>

      {/* ── Visual Overlays ── */}
      {/* Vignette Overlay (Abyss) */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-1000 ease-in-out"
        style={{ 
          opacity: zoneIndex === 3 ? 1 : 0,
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.95) 100%)" 
        }} 
      />
      {/* Sonar Ping (Midnight) */}
      {zoneIndex === 2 && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="w-[30vh] h-[30vh] rounded-full border border-[var(--color-accent-cyan)] animate-sonar opacity-0" />
        </div>
      )}

      {/* ── Fixed Depth HUD (top-right) ── */}
      <div className="fixed top-8 right-8 z-50 flex items-start gap-3 pointer-events-none">
        {/* Pressure bar */}
        <div className="w-[2px] h-24 bg-white/10 rounded-full overflow-hidden flex-shrink-0 relative">
          <div
            ref={hudBarRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00FFFF] to-[#4B0082] rounded-full"
            style={{ height: "100%", transform: "scaleY(0)", transformOrigin: "top" }}
          />
        </div>
        {/* Text */}
        <div>
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Depth</p>
          <span ref={hudDepthRef} className="font-mono text-lg text-[#00FFFF] font-bold leading-none">0m</span>
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
            {ZONES[zoneIndex].label}
          </p>
        </div>
      </div>

      {/* ── Descent Tether ── */}
      <Tether />

      {/* ── Sections ── */}
      <div id="zone-surface" className="zone-section snap-target">
        <HeroSection />
      </div>

      <div className="min-h-[60vh] flex items-center py-12 snap-target" id="waypoint-twilight">
        <Waypoint
          depth="500"
          title="The Twilight Zone"
          description="Light penetration < 1%. Photosynthesis ceases here. The biological pump relies entirely on gravity — 'marine snow' begins its century-long fall."
        />
      </div>

      <div id="zone-twilight" className="zone-section snap-target">
        <MechanismSection />
      </div>

      <div className="min-h-[60vh] flex items-center py-12 snap-target" id="waypoint-bathyal">
        <Waypoint
          depth="1,500"
          title="The Midnight Zone"
          description="Temperatures drop to 4°C. Pressure reaches 150 ATM. Organic carbon reaching this depth is effectively locked away from the atmosphere for centuries."
        />
      </div>

      <div id="zone-bathyal" className="zone-section snap-target">
        <TelemetrySection />
      </div>

      <div className="min-h-[60vh] flex items-center py-12 snap-target" id="waypoint-abyss">
        <Waypoint
          depth="3,500"
          title="The Abyssal Plain"
          description="Long-term storage begins. Only 0.1% of the carbon produced at the sunlit surface survives the journey to be buried in sediment for geological timescales."
        />
      </div>

      <div id="zone-abyss" className="zone-section pb-20 snap-target">
        <AbyssSection />
      </div>
    </main>
  );
}
