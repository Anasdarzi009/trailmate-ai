import React from 'react';
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Trees,
  Wind,
  Clock,
  Sparkles,
  Smartphone,
  Sprout,
  Eye,
  MapPin,
  ChevronDown,
} from 'lucide-react';

export default function Hero({ onStartCreating }) {
  const scrollToHowItWorks = () => {
    const elem = document.getElementById('how-it-works');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-nature-900/60">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-nature-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="page-container">
        {/* Full-Width Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8 text-left animate-fade-up">
            {/* Small Product Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-semibold text-emerald-300 shadow-inner">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Outdoor Micro-Adventure Generator</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-[1.05]">
                Close your laptop. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-nature-300 to-amber-200">
                  Go touch grass.
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
                TrailMate turns a few free minutes into a real-world micro-adventure.
                Tell it how much time you have, and get a personalized outdoor mission
                designed to get you away from screens and into the wild.
              </p>
            </div>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                onClick={onStartCreating}
                type="button"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-display font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-nature-500 to-emerald-500 hover:from-emerald-500 hover:to-nature-400 shadow-xl glow-nature hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Compass className="w-5 h-5 text-white" />
                <span>Create Outdoor Mission</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={scrollToHowItWorks}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm text-stone-300 hover:text-white bg-black/40 hover:bg-black/60 border border-nature-800/80 hover:border-nature-600 transition focus-visible:ring-2 focus-visible:ring-nature-400"
              >
                <span>How It Works</span>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Original Product Ethos Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-nature-950/60 border border-nature-800/70 text-xs sm:text-sm text-stone-300 space-y-1.5 max-w-xl">
              <div className="font-semibold text-emerald-300 flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Built for the moments that happen beyond the screen.</span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                60 seconds to configure, hours to explore. Pocket your device, observe the shift in canopy light,
                and complete tactile grounding rituals.
              </p>
            </div>

            {/* Trust Badges Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-400 border-t border-nature-900/80">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Screen-Free by Design</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" />
                <span>Works 100% Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Outdoor Field Mission Card */}
          <div className="lg:col-span-5 xl:col-span-5 w-full">
            <div className="relative hover-card">
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-nature-600/20 rounded-3xl blur-xl opacity-75" />

              {/* Field Mission Card Frame */}
              <div className="relative rounded-3xl bg-[#0d1d12]/95 border border-nature-600/40 p-5 sm:p-7 shadow-2xl space-y-5 text-left">
                {/* Card Top Row */}
                <div className="flex items-center justify-between border-b border-nature-800/70 pb-3.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-emerald-400 tracking-wider">
                      FIELD MISSION #042
                    </span>
                    <span className="text-stone-600">•</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 30 Min
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-nature-950 border border-nature-800 text-[11px] text-stone-300 capitalize">
                    Walking • Easy
                  </span>
                </div>

                {/* Mission Header */}
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    Canopy & Creek Recon
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200/90 italic">
                    "Trade artificial blue light for the shifting shadows of autumn leaves."
                  </p>
                </div>

                {/* Mission Objectives */}
                <div className="space-y-2.5 text-xs">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                    Mission Objectives
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-nature-800/60 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-nature-800 text-white font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      01
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-white">Uncharted Trailhead</p>
                      <p className="text-stone-400 text-[11px]">Walk 500 paces along an unfamiliar outdoor path.</p>
                      <span className="inline-block mt-1 text-[10px] text-emerald-300 font-medium bg-nature-950 px-2 py-0.5 rounded border border-nature-800">
                        Sight: Shifting Canopy Light
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-nature-800/60 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-nature-800 text-white font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      02
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-white">Botanical Texture Hunt</p>
                      <p className="text-stone-400 text-[11px]">Find three distinct wild plant leaves and examine their vein patterns.</p>
                      <span className="inline-block mt-1 text-[10px] text-emerald-300 font-medium bg-nature-950 px-2 py-0.5 rounded border border-nature-800">
                        Touch: Rough Bark & Veins
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-nature-800/60 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-nature-800 text-white font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                      03
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-white">Acoustic Stillness</p>
                      <p className="text-stone-400 text-[11px]">Stop for 2 uninterrupted minutes. Close your eyes and listen.</p>
                      <span className="inline-block mt-1 text-[10px] text-emerald-300 font-medium bg-nature-950 px-2 py-0.5 rounded border border-nature-800">
                        Sound: Wind in Birch Branches
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grounding Ritual Card */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-900/60 text-emerald-300">
                      <Sprout className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Touch Grass Ritual</p>
                      <p className="text-[11px] text-stone-400">Place bare hand on living soil or grass for 30s</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-600/50">
                    +50 PTS
                  </span>
                </div>

                {/* Card Footer */}
                <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-nature-800/70">
                  <span className="flex items-center gap-1.5 text-emerald-300 font-medium text-[11px]">
                    <Smartphone className="w-3.5 h-3.5 text-stone-400" />
                    Pocket your phone. Start exploring.
                  </span>
                  <span className="text-stone-400 text-[11px]">180 Potential Pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
