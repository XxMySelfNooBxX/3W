export default function MechanismSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[10vw] items-end text-right relative z-10">
      <div className="max-w-4xl flex flex-col items-end">
        <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-wider text-sm mb-4">
          Depth: 200m — Mesopelagic Transition
        </p>
        <h2 className="text-5xl md:text-7xl font-serif italic mb-6 gsap-reveal drop-shadow-lg">
          The Biological Pump
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 gsap-reveal leading-relaxed">
          Phytoplankton absorb CO₂ at the surface. When they die, they form 'marine snow'—a continuous shower of organic carbon falling into the deep.
        </p>
        
        {/* Data Grid UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 border-t border-white/20 pt-8 mt-4 gsap-reveal max-w-2xl w-full">
          <div className="flex flex-col items-end">
            <p className="font-mono text-4xl md:text-5xl text-[var(--color-accent-green)] mb-3">2.5B Tons</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Sequestered Annually</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-mono text-4xl md:text-5xl text-[var(--color-accent-green)] mb-3">10-100m</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Daily Sink Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
