"use client";

import TerminalFeed from "./TerminalFeed";

const nodes = [
  { id: "BSN-01", depth: "2,847m", carbon: "4.21 µg/L", signal: "98%", status: "ACTIVE" },
  { id: "BSN-02", depth: "3,102m", carbon: "5.87 µg/L", signal: "91%", status: "ACTIVE" },
  { id: "BSN-03", depth: "1,903m", carbon: "2.14 µg/L", signal: "76%", status: "SYNCING" },
  { id: "BSN-04", depth: "4,411m", carbon: "8.33 µg/L", signal: "84%", status: "ACTIVE" },
];

const statusColor = (s: string) =>
  s === "ACTIVE" ? "text-[var(--color-accent-green)]" : "text-yellow-400";

export default function TelemetrySection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-[10vw] relative z-10 py-24">
      <div className="w-full flex flex-col gap-16">

        {/* Header */}
        <div className="gsap-reveal">
          <p className="font-mono text-[var(--color-accent-cyan)] uppercase tracking-[0.3em] text-xs mb-4">
            Depth: 3,000m — Bathyal Telemetry Grid
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-serif leading-tight">
              Deep-Water<br />Telemetry
            </h2>
            <p className="text-white/55 text-base max-w-md leading-relaxed font-sans">
              Traditional RF signals fail below 20m. Bathyal uses a mesh of acoustic modems to relay carbon density readings from the edge — in real time.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 gsap-reveal">

          {/* LEFT: Node Status Grid */}
          <div className="flex-1 flex flex-col gap-4">
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">
              ◉ Live Sensor Network — 4 Active Nodes
            </p>
            {nodes.map((node, i) => (
              <div key={i} className="glass rounded-xl p-4 grid grid-cols-4 gap-4 items-center group hover:bg-white/[0.06] transition-colors duration-300">
                <div>
                  <p className="font-mono text-[var(--color-accent-cyan)] text-sm font-bold">{node.id}</p>
                  <p className={`font-mono text-[10px] uppercase tracking-widest mt-1 ${statusColor(node.status)}`}>
                    {node.status}
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Depth</p>
                  <p className="font-mono text-white text-sm mt-1">{node.depth}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Carbon</p>
                  <p className="font-mono text-[var(--color-accent-green)] text-sm mt-1">{node.carbon}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Signal</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--color-accent-cyan)] rounded-full"
                        style={{ width: node.signal }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-white/60">{node.signal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Terminal Feed */}
          <div className="w-full lg:w-[380px] flex flex-col gap-4 flex-shrink-0">
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">
              ◉ Encrypted Telemetry Stream
            </p>
            <TerminalFeed />

            {/* Pressure Gauge */}
            <div className="glass rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Pressure</p>
                <p className="font-mono text-[var(--color-accent-cyan)] text-sm">301 ATM</p>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full animate-pulse-glow"
                  style={{
                    width: "75%",
                    background: "linear-gradient(to right, #00FFFF, #00FF7F)"
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[9px] text-white/25">1 ATM</span>
                <span className="font-mono text-[9px] text-white/25">400 ATM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
