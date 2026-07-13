export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[10vw] relative z-10">
      <div className="max-w-4xl">
        <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-wider text-sm mb-4">
          Depth: 0m — Epipelagic Zone
        </p>
        <h1 className="text-6xl md:text-8xl font-bold font-serif mb-6 drop-shadow-2xl gsap-reveal leading-tight">
          The Ocean Breathes.<br />We Should Listen.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 gsap-reveal leading-relaxed">
          Bathyal: The decentralized telemetry network monitoring Earth's carbon heartbeat.
        </p>
        
        {/* Bento Box UI */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 border-l-[3px] border-l-[var(--color-accent-cyan)] p-6 md:p-8 rounded-xl max-w-md gsap-reveal shadow-2xl">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-3">Carbon Sink Data</p>
          <p className="text-2xl md:text-3xl font-serif">
            Absorbs ~30% of global human-made CO₂
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-[10vw] flex flex-col items-start animate-pulse">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-cyan)] mb-2">Initiate Descent</span>
        <span className="text-[var(--color-accent-cyan)] text-2xl font-mono">↓</span>
      </div>
    </section>
  );
}
