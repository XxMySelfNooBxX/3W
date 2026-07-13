interface WaypointProps {
  depth: string;
  title: string;
  description: string;
}

export default function Waypoint({ depth, title, description }: WaypointProps) {
  return (
    <div className="flex items-center gsap-reveal w-full max-w-2xl px-[10vw] relative z-10 py-12">
      {/* Node that aligns perfectly with the 5vw Tether */}
      <div className="absolute left-[5vw] -ml-[3px] w-2 h-2 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_10px_var(--color-accent-cyan)]">
        <div className="absolute inset-0 rounded-full border border-[var(--color-accent-cyan)] animate-ping opacity-70"></div>
      </div>
      
      <div className="pl-6 md:pl-12">
        <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-widest text-xs mb-3">
          Depth: {depth} — {title}
        </p>
        <p className="text-gray-300 font-serif text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
