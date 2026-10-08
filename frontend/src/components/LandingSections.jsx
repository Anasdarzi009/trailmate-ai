import React from 'react';
import {
  Clock,
  Compass,
  Footprints,
  ShieldCheck,
  Trees,
  Wind,
  Sprout,
  ArrowRight,
  Eye,
  Camera,
  Flame,
  Smartphone,
  ChevronRight,
  Award,
  Cpu,
  WifiOff,
  Sparkles,
} from 'lucide-react';

const SAMPLE_MISSIONS = [
  {
    title: 'The 20-Minute Mindful Reset',
    category: 'Sensory Walk',
    time: '20 Min',
    difficulty: 'Gentle',
    environment: 'Local Park',
    objectives: [
      'Walk 300 steps with eyes tracking high canopy tree branches.',
      'Locate three distinct wild plants with serrated or smooth leaf borders.',
      'Stop by natural greenery and take five slow, grounded breaths.',
    ],
    bonus: 'Bare palm touch on living grass or moss for 30s',
    pts: 125,
  },
  {
    title: 'Twilight Canopy Recon',
    category: 'Exploration',
    time: '45 Min',
    difficulty: 'Moderate',
    environment: 'Neighborhood & Greenways',
    objectives: [
      'Take two unfamiliar right turns to chart a new neighborhood route.',
      'Track the shift of dusk shadows across tree trunks and stone walls.',
      'Find a secluded vantage point and observe evening bird flight.',
    ],
    bonus: 'Kneel and touch earth before nightfall sets in',
    pts: 185,
  },
  {
    title: 'Deep Woods Forest Bathing',
    category: 'Trail Hiking',
    time: '60 Min',
    difficulty: 'Adventurous',
    environment: 'Forest / Nature Reserve',
    objectives: [
      'Hike into deep pine or oak canopy with phone placed in zipped pocket.',
      'Identify two distinct natural scent signatures (pine needles, moist soil).',
      'Follow a natural trail contour without looking at digital navigation.',
    ],
    bonus: 'Sit with back against an ancient tree trunk for 3 minutes',
    pts: 240,
  },
];

export default function LandingSections({ onNavigateBuilder, onOpenAiModal }) {
  return (
    <div className="w-full space-y-20 sm:space-y-28 py-16 sm:py-24">
      {/* 1. HOW TRAILMATE WORKS */}
      <section id="how-it-works" className="w-full scroll-mt-24">
        <div className="page-container space-y-12">
          {/* Section Header */}
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
              <span>Simple Workflow</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              How TrailMate Works
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Designed around one core rule: the screen should be the shortest part of the experience.
              In under a minute, you're outside.
            </p>
          </div>

          {/* 3-Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-nature-800/80 space-y-4 hover-card relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-display font-extrabold text-sm flex items-center justify-center">
                  01
                </div>
                <Clock className="w-5 h-5 text-stone-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Choose Your Window</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Got 15 minutes before your next meeting or 90 minutes on a Sunday afternoon? Select your available time,
                activity pace, and whether you're solo or walking a dog.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-nature-800/80 space-y-4 hover-card relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-display font-extrabold text-sm flex items-center justify-center">
                  02
                </div>
                <Compass className="w-5 h-5 text-stone-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Receive Your Field Mission</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Our private on-device intelligence synthesizes non-screen sensory waypoints: noticing wind shifts,
                inspecting leaf veins, and charting uncharted side streets.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-nature-800/80 space-y-4 hover-card relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-display font-extrabold text-sm flex items-center justify-center">
                  03
                </div>
                <Sprout className="w-5 h-5 text-stone-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Pocket Device & Explore</h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Put your phone away. Walk your route, complete physical grounding checkpoints,
                and return to claim your Touch Grass Grounding Score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION SHOWCASE */}
      <section id="missions-showcase" className="w-full scroll-mt-24">
        <div className="page-container space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-nature-900/80 pb-6 text-left">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                <span>Field Examples</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Sample Outdoor Missions
              </h2>
              <p className="text-sm text-stone-300">
                Every generated quest is customized to your time and terrain. Here are three examples.
              </p>
            </div>

            <button
              onClick={onNavigateBuilder}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition self-start md:self-auto cursor-pointer"
            >
              <span>Build Custom Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            {SAMPLE_MISSIONS.map((m, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-nature-800/80 space-y-5 hover-card flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-nature-950 border border-nature-800 text-stone-300 font-medium">
                      {m.category}
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">{m.time}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-white">{m.title}</h3>
                    <p className="text-xs text-stone-400 flex items-center gap-1.5">
                      <Trees className="w-3.5 h-3.5 text-emerald-400" />
                      {m.environment} • {m.difficulty}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-nature-900/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Waypoints:</span>
                    <ul className="space-y-2 text-xs text-stone-300">
                      {m.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold text-[11px] mt-0.5">•</span>
                          <span className="leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-nature-900/80 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Grounding Bonus</span>
                  <span className="font-bold text-emerald-400">+{m.pts} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY PRIVATE & OFFLINE INTELLIGENCE */}
      <section id="engine" className="w-full scroll-mt-24">
        <div className="page-container space-y-10">
          <div className="p-8 sm:p-12 rounded-3xl glass-panel-highlight border border-nature-700/50 text-left space-y-10">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline & Sovereign Architecture</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Intelligence That Operates in the Deep Woods
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Most AI products require an active fiber-optic uplink to silicon valley data centers.
                TrailMate runs locally on your machine—making it trail-ready and radically private.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-black/40 border border-nature-800/80 space-y-2">
                <div className="p-2.5 rounded-xl bg-nature-900 text-emerald-300 w-fit">
                  <WifiOff className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">Zero Cell Signal Needed</h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  Generate missions at remote trailheads or off-grid mountain cabins.
                  Once the weights are on your drive, no connection is required.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-nature-800/80 space-y-2">
                <div className="p-2.5 rounded-xl bg-nature-900 text-emerald-300 w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">Absolute Privacy</h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  Your daily habits, walking locations, and schedules never leave your laptop.
                  Zero telemetry, zero ads, zero surveillance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-nature-800/80 space-y-2">
                <div className="p-2.5 rounded-xl bg-nature-900 text-emerald-300 w-fit">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">Anti-Dopamine Design</h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  Unlike chatbots designed to keep you scrolling in an infinite feedback loop,
                  TrailMate's purpose is to prompt you once and send you outdoors.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-nature-800/70">
              <p className="text-xs text-stone-400">
                Curious about the technical implementation? Inspect our local Ollama integration.
              </p>
              <button
                onClick={onOpenAiModal}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-nature-900/90 hover:bg-nature-800 text-stone-200 text-xs font-semibold border border-nature-700/50 transition cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Engine Status</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOUCH GRASS SCORE & GROUNDING RANKS */}
      <section className="w-full">
        <div className="page-container space-y-12">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
              <Award className="w-3.5 h-3.5" />
              <span>Gamified Grounding</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              The Touch Grass Score
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Earn real-world Grounding Points for actual outdoor minutes spent unplugged.
              Track your cumulative milestones and advance through outdoor ranks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl glass-panel border border-nature-800/80 space-y-2">
              <span className="text-2xl">🌱</span>
              <div className="font-display font-bold text-base text-white">Sprout Scout</div>
              <p className="text-[11px] text-stone-400">0 – 100 Points</p>
              <p className="text-xs text-stone-500">First steps off the pavement.</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-nature-800/80 space-y-2">
              <span className="text-2xl">🌾</span>
              <div className="font-display font-bold text-base text-white">Earth Pilgrim</div>
              <p className="text-[11px] text-stone-400">100 – 180 Points</p>
              <p className="text-xs text-stone-500">Regular outdoor grounding habit.</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-nature-800/80 space-y-2">
              <span className="text-2xl">⛰️</span>
              <div className="font-display font-bold text-base text-white">Wildwood Pathfinder</div>
              <p className="text-[11px] text-stone-400">180 – 250 Points</p>
              <p className="text-xs text-stone-500">Adept sensory awareness.</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-nature-800/80 space-y-2">
              <span className="text-2xl">🌲</span>
              <div className="font-display font-bold text-base text-white">Ancient Forest Warden</div>
              <p className="text-[11px] text-stone-400">250+ Points</p>
              <p className="text-xs text-stone-500">Deep nature connection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="w-full">
        <div className="page-container">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-nature-950 to-emerald-950/80 border border-emerald-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                Your Next Adventure Is Outside Your Door.
              </h2>
              <p className="text-sm sm:text-base text-stone-300">
                Close the screen. Take a breath. Discover what happens when you step into the physical world.
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={onNavigateBuilder}
                type="button"
                className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl font-display font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-nature-500 to-emerald-500 hover:from-emerald-500 hover:to-nature-400 shadow-xl glow-nature hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <Compass className="w-5 h-5 text-white" />
                <span>Generate Your Mission Now</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPREHENSIVE PRODUCT FOOTER */}
      <footer className="w-full border-t border-nature-900/80 pt-12 pb-16">
        <div className="page-container space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-nature-900/80 pb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-nature-600 to-nature-800 text-white shadow-sm">
                <Compass className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <span className="font-display font-extrabold text-lg text-white">
                  TrailMate<span className="text-emerald-400 ml-0.5">AI</span>
                </span>
                <p className="text-xs text-stone-400">
                  Personalized outdoor missions powered by private on-device intelligence.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-400">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition">
                Home
              </button>
              <button onClick={onNavigateBuilder} className="hover:text-white transition">
                Generate Mission
              </button>
              <a href="#missions-showcase" className="hover:text-white transition">
                Missions
              </a>
              <a href="#how-it-works" className="hover:text-white transition">
                How It Works
              </a>
              <button onClick={onOpenAiModal} className="hover:text-white transition">
                Local Engine
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>
              Built to help you spend less time looking at screens.
            </p>
            <p className="text-emerald-400/90 font-medium">
              100% On-Device Inference • Zero Telemetry
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
