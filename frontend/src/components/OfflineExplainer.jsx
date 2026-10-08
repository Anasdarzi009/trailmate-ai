import React from 'react';
import { ShieldCheck, Cpu, WifiOff, Trees, Compass, ArrowUpRight } from 'lucide-react';

export default function OfflineExplainer({ onNavigateBuilder, onOpenAiModal }) {
  return (
    <section id="architecture-section" className="scroll-mt-20 border-t border-nature-900/80 bg-black/20 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nature-950 border border-nature-800 text-xs font-semibold text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Local AI Architecture</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Engineered for Privacy, Independence & the Open Air
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            TrailMate AI runs entirely on your own device using Google's open-weight Gemma 3 4B model through Ollama.
            No cloud accounts, no subscriptions, and zero tracking.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          <div className="p-6 rounded-2xl bg-[#0e1d14]/80 border border-nature-800/80 space-y-3 hover:border-nature-600/50 transition">
            <div className="p-2.5 rounded-xl bg-nature-900/60 text-emerald-300 w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Google Gemma 3 4B</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              State-of-the-art open weights with deep contextual reasoning, fast local execution, and creative outdoor synthesis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1d14]/80 border border-nature-800/80 space-y-3 hover:border-nature-600/50 transition">
            <div className="p-2.5 rounded-xl bg-nature-900/60 text-emerald-300 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Zero Cloud Telemetry</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Your location, schedule, and personal habits never leave localhost. Complete cryptographic privacy by design.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1d14]/80 border border-nature-800/80 space-y-3 hover:border-nature-600/50 transition">
            <div className="p-2.5 rounded-xl bg-nature-900/60 text-emerald-300 w-fit">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Trail-Ready Offline</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Generate missions at a remote trailhead, national forest campsite, or off-grid cabin without cellular towers or Wi-Fi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e1d14]/80 border border-nature-800/80 space-y-3 hover:border-nature-600/50 transition">
            <div className="p-2.5 rounded-xl bg-nature-900/60 text-emerald-300 w-fit">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Unplugged Philosophy</h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Most digital apps compete for screen time. TrailMate AI measures its success by how quickly you close your device and go outside.
            </p>
          </div>
        </div>

        {/* Product Footer */}
        <footer className="pt-10 border-t border-nature-900/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-nature-900 text-emerald-300">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-sm text-white">
              TrailMate AI
            </span>
            <span className="text-stone-500">|</span>
            <span>Autonomous Outdoor Mission Generator</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-stone-400">
            <button
              onClick={onNavigateBuilder}
              type="button"
              className="hover:text-emerald-300 transition"
            >
              Mission Generator
            </button>
            <button
              onClick={onOpenAiModal}
              type="button"
              className="hover:text-emerald-300 transition"
            >
              Gemma 3 Engine
            </button>
            <span className="text-emerald-400 font-medium">
              100% On-Device AI • No Cloud Keys
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
