"use client";

import { useEffect, useRef } from "react";
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

// Prevent GSAP issues in SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Background color transition based on scroll
    ScrollTrigger.create({
      trigger: "#zone-twilight",
      start: "top center",
      end: "bottom center",
      onEnter: () => gsap.to("body", { backgroundColor: "var(--color-twilight)", duration: 1 }),
      onLeaveBack: () => gsap.to("body", { backgroundColor: "var(--color-surface)", duration: 1 })
    });

    ScrollTrigger.create({
      trigger: "#zone-bathyal",
      start: "top center",
      end: "bottom center",
      onEnter: () => gsap.to("body", { backgroundColor: "var(--color-bathyal)", duration: 1 }),
      onLeaveBack: () => gsap.to("body", { backgroundColor: "var(--color-twilight)", duration: 1 })
    });

    ScrollTrigger.create({
      trigger: "#zone-abyss",
      start: "top center",
      onEnter: () => gsap.to("body", { backgroundColor: "var(--color-abyss)", duration: 1 }),
      onLeaveBack: () => gsap.to("body", { backgroundColor: "var(--color-bathyal)", duration: 1 })
    });

    // Text & element reveals
    const revealElements = gsap.utils.toArray(".gsap-reveal");
    revealElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full">
      {/* 3D Background - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-transparent">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <fog attach="fog" args={['#0a0a0f', 5, 30]} />
          <ambientLight intensity={0.5} />
          <MarineSnow count={2000} />
        </Canvas>
      </div>

      <Tether />

      {/* Foreground Sections */}
      <div id="zone-surface" className="zone-section">
        <HeroSection />
      </div>
      
      <div className="min-h-[50vh] flex items-center pt-20">
        <Waypoint 
          depth="500m" 
          title="The Twilight Zone" 
          description="Light penetration < 1%. Photosynthesis ceases here. The biological pump relies entirely on gravity to pull 'marine snow' deeper into the dark."
        />
      </div>
      
      <div id="zone-twilight" className="zone-section">
        <MechanismSection />
      </div>
      
      <div className="min-h-[50vh] flex items-center pt-20">
        <Waypoint 
          depth="1,500m" 
          title="The Midnight Zone" 
          description="Temperatures drop to 4°C. High pressure and freezing temperatures. Organic carbon reaching this depth is effectively locked away from the atmosphere for centuries."
        />
      </div>
      
      <div id="zone-bathyal" className="zone-section">
        <TelemetrySection />
      </div>
      
      <div className="min-h-[50vh] flex items-center pt-20">
        <Waypoint 
          depth="3,500m" 
          title="Abyssal Plain" 
          description="Long-Term Storage. Only 0.1% of the carbon produced at the sunlit surface eventually reaches the seafloor to be buried for geological timescales."
        />
      </div>
      
      <div id="zone-abyss" className="zone-section pb-20">
        <AbyssSection />
      </div>
    </main>
  );
}
