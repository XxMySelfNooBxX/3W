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
    // ── Background color transitions (using hex — GSAP can't resolve CSS vars) ──
    ScrollTrigger.create({
      trigger: "#zone-twilight",
      start: "top center",
      onEnter:    () => gsap.to("body", { backgroundColor: COLORS.twilight, duration: 1.2 }),
      onLeaveBack:() => gsap.to("body", { backgroundColor: COLORS.surface,  duration: 1.2 }),
    });
    ScrollTrigger.create({
      trigger: "#zone-bathyal",
      start: "top center",
      onEnter:    () => { gsap.to("body", { backgroundColor: COLORS.bathyal, duration: 1.2 }); setZoneIndex(2); },
      onLeaveBack:() => { gsap.to("body", { backgroundColor: COLORS.twilight, duration: 1.2 }); setZoneIndex(1); },
    });
    ScrollTrigger.create({
      trigger: "#zone-abyss",
      start: "top center",
      onEnter:    () => { gsap.to("body", { backgroundColor: COLORS.abyss, duration: 1.2 }); setZoneIndex(3); },
      onLeaveBack:() => { gsap.to("body", { backgroundColor: COLORS.bathyal, duration: 1.2 }); setZoneIndex(2); },
    });
    // Track zone transitions for HUD
    ScrollTrigger.create({
      trigger: "#zone-twilight",
      start: "top center",
      onEnter:    () => setZoneIndex(1),
      onLeaveBack:() => setZoneIndex(0),
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

      {/* ── Fixed 3D Canvas Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
          <fog attach="fog" args={["#0a0a0f", 8, 35]} />
          <ambientLight intensity={0.6} />
          <MarineSnow count={1800} />
        </Canvas>
      </div>

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
      <div id="zone-surface" className="zone-section">
        <HeroSection />
      </div>

      <div className="min-h-[60vh] flex items-center py-12">
        <Waypoint
          depth="500"
          title="The Twilight Zone"
          description="Light penetration < 1%. Photosynthesis ceases here. The biological pump relies entirely on gravity — 'marine snow' begins its century-long fall."
        />
      </div>

      <div id="zone-twilight" className="zone-section">
        <MechanismSection />
      </div>

      <div className="min-h-[60vh] flex items-center py-12">
        <Waypoint
          depth="1,500"
          title="The Midnight Zone"
          description="Temperatures drop to 4°C. Pressure reaches 150 ATM. Organic carbon reaching this depth is effectively locked away from the atmosphere for centuries."
        />
      </div>

      <div id="zone-bathyal" className="zone-section">
        <TelemetrySection />
      </div>

      <div className="min-h-[60vh] flex items-center py-12">
        <Waypoint
          depth="3,500"
          title="The Abyssal Plain"
          description="Long-term storage begins. Only 0.1% of the carbon produced at the sunlit surface survives the journey to be buried in sediment for geological timescales."
        />
      </div>

      <div id="zone-abyss" className="zone-section pb-20">
        <AbyssSection />
      </div>
    </main>
  );
}
