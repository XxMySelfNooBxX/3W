"use client";

const vaultStats = [
  { value: "1,000", unit: "Years", label: "Deep carbon stays locked away" },
  { value: "3,800", unit: "Metres", label: "Average depth of Earth's oceans" },
  { value: "71%", unit: "of Earth", label: "Covered by ocean surface" },
];

export default function AbyssSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-[10vw] relative z-10 py-24">

      {/* Zone Label */}
      <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-[0.3em] text-xs mb-8 gsap-reveal">
        Depth: 4,000m+ — The Abyss
      </p>

      {/* Main Headline */}
      <h2 className="text-[clamp(3rem,9vw,7rem)] font-serif font-bold mb-6 gsap-reveal drop-shadow-2xl leading-[1.0] tracking-tight">
        Total Silence.<br />
        <span className="italic font-normal">Total Impact.</span>
      </h2>

      <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-20 gsap-reveal leading-relaxed">
        Understanding the deep ocean is the missing variable in every global climate model. Without it, our predictions are blind.
      </p>

      {/* Vault Stats Row */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-stretch justify-center gap-0 mb-20 gsap-reveal">
        {vaultStats.map((stat, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col items-center justify-center py-10 px-8 relative
              ${i < vaultStats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""}
            `}
          >
            {/* Glow blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-32 h-32 rounded-full bg-[var(--color-accent-cyan)] blur-3xl" />
            </div>
            <p className="font-mono text-5xl md:text-6xl font-bold text-white mb-1 relative z-10">
              {stat.value}
            </p>
            <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-widest text-xs mb-3 relative z-10">
              {stat.unit}
            </p>
            <p className="text-white/40 text-sm font-mono max-w-[150px] relative z-10">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="max-w-2xl mb-16 gsap-reveal">
        <p className="text-xl md:text-2xl font-serif italic text-white/70 leading-relaxed">
          "The deep ocean is the largest carbon reservoir on Earth — and the least understood."
        </p>
        <cite className="block mt-4 font-mono text-[10px] text-white/30 uppercase tracking-widest not-italic">
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
