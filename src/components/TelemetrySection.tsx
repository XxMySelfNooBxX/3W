"use client";

import Spline from '@splinetool/react-spline';
import TerminalFeed from './TerminalFeed';

export default function TelemetrySection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[10vw] relative z-10 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Content Side */}
        <div className="w-full lg:w-1/2 max-w-2xl">
          <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-wider text-sm mb-4">
            Depth: 3,000m — Telemetry Grid
          </p>
          <h2 className="text-5xl md:text-7xl font-serif mb-6 gsap-reveal drop-shadow-lg">
            Deep-Water Telemetry
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 gsap-reveal leading-relaxed">
            Traditional RF signals fail underwater. Bathyal utilizes a mesh network of acoustic modems to process carbon density data at the edge.
          </p>
          
          <div className="gsap-reveal w-full">
            <TerminalFeed />
          </div>
        </div>

        {/* 3D Spline Side */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative gsap-reveal">
          {/* Using mix-blend-screen can help integrate 3D backgrounds onto dark sites */}
          <div className="absolute inset-0 flex items-center justify-center opacity-90 pointer-events-auto">
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          </div>
        </div>
      </div>
    </section>
  );
}
