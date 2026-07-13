"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import HeroSection from "@/components/HeroSection";
import MechanismSection from "@/components/MechanismSection";
import TelemetrySection from "@/components/TelemetrySection";
import AbyssSection from "@/components/AbyssSection";
import MarineSnow from "@/components/MarineSnow";
import Tether from "@/components/Tether";
import Waypoint from "@/components/Waypoint";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

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
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const [zoneIndex, setZoneIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── TRANSITION 1: "The Light Break" (Surface → Twilight 500m) ──────────
      // Organic turbulence dissolve — the edge of the surface zone MELTS like
      // light scattering in water, not a clean circle wipe.
      const tlLightBreak = gsap.timeline({
        scrollTrigger: {
          trigger: "#waypoint-twilight",
          start: "top 85%",
          end: "bottom -10%",
          scrub: 1.5,
        },
      });

      // Step 1: Ramp up SVG turbulence distortion on the bg-surface layer
      // This makes the surface color "melt" organically at its edges
      tlLightBreak
        .to("#bg-surface", {
          filter: "url(#liquid-dissolve)",
          scale: 1.05,
          ease: "none",
          duration: 0.4,
        }, 0)
        // Step 2: Animate the turbulence scale from 0 → 120 via JS attribute
        .to({ val: 0 }, {
          val: 120,
          ease: "power1.in",
          duration: 0.5,
          onUpdate: function () {
            const el = document.getElementById("turbulence-fe") as SVGFETurbulenceElement | null;
            const disp = document.getElementById("displacement-fe") as SVGFEDisplacementMapElement | null;
            if (el) el.setAttribute("baseFrequency", `0.008 ${0.008 + this.targets()[0].val * 0.0003}`);
            if (disp) disp.setAttribute("scale", String(this.targets()[0].val));
          },
        }, 0.1)
        // Step 3: Reveal twilight zone color underneath via clip-path expanding from center
        .fromTo("#bg-twilight", 
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(150% at 50% 50%)", ease: "power2.inOut", duration: 0.7 },
          0.3
        )
        // Step 4: Reset turbulence and surface filter
        .to({ val: 120 }, {
          val: 0,
          ease: "power2.out",
          duration: 0.3,
          onUpdate: function () {
            const el = document.getElementById("turbulence-fe") as SVGFETurbulenceElement | null;
            const disp = document.getElementById("displacement-fe") as SVGFEDisplacementMapElement | null;
            if (el) el.setAttribute("baseFrequency", `0.008 ${0.008 + this.targets()[0].val * 0.0003}`);
            if (disp) disp.setAttribute("scale", String(this.targets()[0].val));
          },
        }, 0.7)
        .to("#bg-surface", { filter: "none", scale: 1, ease: "none", duration: 0.3 }, 0.7);


      // ── TRANSITION 2: "The Pressure Crush" (Twilight → Midnight 1500m) ─────
      // The viewport iris-crushes inward from all 4 corners simultaneously,
      // like pressure physically compressing the screen. New color bleeds from center.
      const tlPressureCrush = gsap.timeline({
        scrollTrigger: {
          trigger: "#waypoint-bathyal",
          start: "top 85%",
          end: "bottom -10%",
          scrub: 1.5,
        },
      });

      tlPressureCrush
        // Iris closes inward — twilight zone gets crushed to a point
        .to(".iris-crush-layer", {
          clipPath: "inset(0% 0% 0% 0% round 0%)",
          ease: "power3.in",
          duration: 0.5,
        }, 0)
        // Bathyal color punches in from center as iris finishes closing
        .fromTo("#bg-bathyal",
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(150% at 50% 50%)", ease: "power2.out", duration: 0.6 },
          0.4
        )
        // Iris reopens (now invisible against bathyal background)
        .to(".iris-crush-layer", {
          clipPath: "inset(50% 50% 50% 50% round 50%)",
          ease: "power3.out",
          duration: 0.3,
        }, 0.8);

      // Telemetry section cards slide in from the right (horizontal ping effect)
      ScrollTrigger.create({
        trigger: "#zone-bathyal",
        start: "top 90%",
        onEnter: () => {
          gsap.fromTo(".telemetry-node-card",
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.2 }
          );
        },
        once: true,
      });


      // ── TRANSITION 3: "The Abyss Dissolve" (Midnight → Abyss 3500m) ───────
      // The world decays into static grain before total darkness swallows it.
      // A heavy blur vignette collapses inward. Nothing is clean.
      const tlAbyssDissolve = gsap.timeline({
        scrollTrigger: {
          trigger: "#waypoint-abyss",
          start: "top 85%",
          end: "bottom -10%",
          scrub: 1.5,
        },
      });

      tlAbyssDissolve
        // Heavy grain + vignette collapses over the screen
        .to(".abyss-dissolve-layer", {
          opacity: 1,
          ease: "power2.in",
          duration: 0.5,
        }, 0)
        // Blur the entire page content during the dissolve
        .to("#main-content-wrapper", {
          filter: "blur(8px) brightness(0.3)",
          ease: "power2.in",
          duration: 0.5,
        }, 0)
        // Abyss color expands from absolute black center
        .fromTo("#bg-abyss",
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 0.6 },
          0.35
        )
        // Content restores clarity in abyss
        .to("#main-content-wrapper", {
          filter: "blur(0px) brightness(1)",
          ease: "power2.out",
          duration: 0.4,
        }, 0.7)
        .to(".abyss-dissolve-layer", {
          opacity: 0,
          ease: "power2.out",
          duration: 0.3,
        }, 0.8);


      // ── Zone index tracking for HUD & MarineSnow ──────────────────────────
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


      // ── Depth HUD scrub 0–4000m ───────────────────────────────────────────
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

      // ── Generic reveals for any remaining .gsap-reveal elements ──────────
      const revealEls = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full grain-overlay">

      {/* ── SVG Filter Definitions (invisible, global) ── */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="liquid-dissolve" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence
              id="turbulence-fe"
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              id="displacement-fe"
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Fixed Background Layers (stacked, z-[-1]) ── */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[#0A3D6B]" id="bg-surface" />
        <div className="absolute inset-0 bg-[#4B0082]" id="bg-twilight" style={{ clipPath: "circle(0% at 50% 50%)" }} />
        <div className="absolute inset-0 bg-[#120524]" id="bg-bathyal" style={{ clipPath: "circle(0% at 50% 50%)" }} />
        <div className="absolute inset-0 bg-[#0a0a0f]" id="bg-abyss" style={{ clipPath: "circle(0% at 50% 50%)" }} />
      </div>

      {/* ── Iris Crush Layer (Midnight Zone transition) ── */}
      <div className="iris-crush-layer" />

      {/* ── Abyss Dissolve Layer ── */}
      <div className="abyss-dissolve-layer" />

      {/* ── Fixed 3D Canvas ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 12], fov: 55 }}>
          {/* Deep blue fog to match surface zone color, fades to black by abyss */}
          <fog attach="fog" args={["#0A3D6B", 8, 35]} />
          <ambientLight intensity={0.6} />
          <MarineSnow count={1800} zoneIndex={zoneIndex} />
        </Canvas>
      </div>

      {/* ── Visual Overlays ── */}
      <div
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: zoneIndex === 3 ? 1 : 0,
          background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.95) 100%)"
        }}
      />
      {zoneIndex === 2 && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="w-[30vh] h-[30vh] rounded-full border border-[var(--color-accent-cyan)] animate-sonar opacity-0" />
        </div>
      )}

      {/* ── Fixed Depth HUD ── */}
      <div className="fixed top-8 right-8 z-50 flex items-start gap-3 pointer-events-none">
        <div className="w-[2px] h-24 bg-white/10 rounded-full overflow-hidden flex-shrink-0 relative">
          <div
            ref={hudBarRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00FFFF] to-[#4B0082] rounded-full"
            style={{ height: "100%", transform: "scaleY(0)", transformOrigin: "top" }}
          />
        </div>
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

      {/* ── Main scrollable content ── */}
      <div id="main-content-wrapper">

        <div id="zone-surface" className="zone-section">
          <HeroSection />
        </div>

        <div className="min-h-[80vh] flex items-center py-16" id="waypoint-twilight">
          <Waypoint
            depth="500"
            title="The Twilight Zone"
            description="Light penetration < 1%. Photosynthesis ceases here. The biological pump relies entirely on gravity — 'marine snow' begins its century-long fall."
          />
        </div>

        <div id="zone-twilight" className="zone-section">
          <MechanismSection />
        </div>

        <div className="min-h-[80vh] flex items-center py-16" id="waypoint-bathyal">
          <Waypoint
            depth="1,500"
            title="The Midnight Zone"
            description="Temperatures drop to 4°C. Pressure reaches 150 ATM. Organic carbon reaching this depth is effectively locked away from the atmosphere for centuries."
          />
        </div>

        <div id="zone-bathyal" className="zone-section">
          <TelemetrySection />
        </div>

        <div className="min-h-[80vh] flex items-center py-16" id="waypoint-abyss">
          <Waypoint
            depth="3,500"
            title="The Abyssal Plain"
            description="Long-term storage begins. Only 0.1% of the carbon produced at the sunlit surface survives the journey to be buried in sediment for geological timescales."
          />
        </div>

        <div id="zone-abyss" className="zone-section pb-20">
          <AbyssSection />
        </div>

      </div>
    </main>
  );
}
