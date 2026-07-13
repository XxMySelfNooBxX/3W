interface WaypointProps {
  depth: string;
  title: string;
  description: string;
}

export default function Waypoint({ depth, title, description }: WaypointProps) {
  return (
    <div className="gsap-reveal w-full px-[10vw] relative z-10 py-8">
      {/* Pulsing node on the tether */}
      <div className="absolute left-[5vw] top-1/2 -translate-y-1/2 -ml-[5px]">
        <div className="w-[10px] h-[10px] rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_12px_var(--color-accent-cyan)]">
          <div className="absolute inset-[-4px] rounded-full border border-[var(--color-accent-cyan)]/50 animate-ping" />
        </div>
      </div>

      {/* Glassmorphism card */}
      <div className="ml-8 md:ml-16 max-w-xl glass-cyan rounded-2xl overflow-hidden">
        {/* Top bar */}
        <div className="h-px w-full bg-gradient-to-r from-[var(--color-accent-cyan)]/60 via-[var(--color-accent-cyan)]/20 to-transparent" />

        <div className="p-6 md:p-8 flex gap-6 items-start">
          {/* Depth number — large mono */}
          <div className="flex-shrink-0 text-right">
            <p className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-accent-cyan)] leading-none">
              {depth.replace(",", ",")}
            </p>
            <p className="font-mono text-[10px] text-[var(--color-accent-cyan)]/60 uppercase tracking-widest mt-1">
              metres
            </p>
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-white/10 flex-shrink-0" />

          {/* Text content */}
          <div>
            <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-widest text-[10px] mb-2">
              {title}
            </p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed font-sans">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
