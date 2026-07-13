export default function AbyssSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-[10vw] relative z-10">
      <div className="max-w-4xl flex flex-col items-center">
        <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-wider text-sm mb-4">
          Depth: 4,000m+ — The Abyss
        </p>
        <h2 className="text-6xl md:text-8xl font-serif font-bold mb-6 gsap-reveal drop-shadow-2xl leading-tight">
          Total Silence.<br />Total Impact.
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 gsap-reveal leading-relaxed">
          Understanding the deep ocean is the missing variable in global climate models.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 gsap-reveal">
          <button className="bg-[var(--color-accent-cyan)] hover:bg-white text-black font-mono uppercase tracking-widest text-sm py-4 px-8 rounded transition-all duration-300 ease-out shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] cursor-pointer">
            Join the Network
          </button>
          <button className="bg-transparent border border-white/30 hover:border-white text-white font-mono uppercase tracking-widest text-sm py-4 px-8 rounded transition-all duration-300 ease-out cursor-pointer">
            View Open Source
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center opacity-50 gsap-reveal">
        <p className="font-mono text-xs uppercase tracking-widest">
          Aligned with UN Sustainable Development Goals 13 & 14
        </p>
      </div>
    </section>
  );
}
