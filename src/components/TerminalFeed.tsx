"use client";

import { useState, useEffect, useRef } from "react";

const generateLog = (index: number) => {
  const depth = 2100 + Math.floor(Math.random() * 50);
  const poc = (4.0 + Math.random() * 0.5).toFixed(2);
  const status = Math.random() > 0.1 ? "Encrypted" : "Syncing...";
  return `[LIVE] Node-${index.toString().padStart(2, '0')}: Depth ${depth}m | POC: ${poc} µg/L | Status: ${status}`;
};

export default function TerminalFeed() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial logs
    const initialLogs = Array.from({ length: 5 }, (_, i) => generateLog(i));
    setLogs(initialLogs);

    const interval = setInterval(() => {
      setLogs((prevLogs) => {
        const newLogs = [...prevLogs, generateLog(prevLogs.length)];
        // Keep only the last 15 logs to prevent memory bloat
        return newLogs.slice(-15);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-xl p-4 md:p-6 w-full shadow-2xl h-64 overflow-hidden flex flex-col font-mono text-xs md:text-sm">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-gray-400 uppercase tracking-widest text-[10px]">Deep-Water Telemetry</span>
      </div>
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2 flex flex-col gap-2 scroll-smooth custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className="text-[var(--color-accent-cyan)] opacity-90 leading-relaxed">
            <span className="text-gray-500 mr-2">{'>'}</span>{log}
          </div>
        ))}
      </div>
    </div>
  );
}
