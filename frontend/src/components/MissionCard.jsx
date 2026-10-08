import React, { useState } from 'react';
import {
  Clock,
  Compass,
  Footprints,
  Flame,
  ShieldAlert,
  Quote,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  Cpu,
  Sprout,
  ShieldCheck,
  Smartphone,
  Trees,
} from 'lucide-react';
import { playClickSound, playStartSound } from '../utils/sound';

export default function MissionCard({ mission, onStartMission, onReset }) {
  const [copied, setCopied] = useState(false);

  if (!mission) return null;

  const handleStart = () => {
    playStartSound();
    onStartMission(mission);
  };

  const handleCopy = () => {
    playClickSound();
    const text = `🌿 TrailMate Mission: ${mission.title}\n"${mission.tagline}"\n\n⏱️ Duration: ${mission.duration_minutes} min | Activity: ${mission.activity}\n\nTasks:\n${mission.tasks
      .map((t, idx) => `${idx + 1}. ${t.title}: ${t.description}`)
      .join('\n')}\n\n🌾 Grounding Bonus Challenge:\n${mission.bonus_challenge?.title} — ${mission.bonus_challenge?.description}\n\n(Generated locally with Gemma 3 via TrailMate AI)`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container py-8 sm:py-12 animate-fade-up">
      <div className="glass-panel-highlight rounded-3xl border border-nature-600/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-left">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Mission Overview & Actions (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {mission.duration_minutes} Minutes
              </span>

              <span className="px-3 py-1 rounded-full bg-nature-950/80 border border-nature-700/50 text-stone-200 capitalize flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-nature-400" />
                {mission.activity}
              </span>

              <span className="px-3 py-1 rounded-full bg-nature-950/80 border border-nature-700/50 text-stone-200 capitalize flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {mission.difficulty}
              </span>

              <span className="px-3 py-1 rounded-full bg-nature-950/80 border border-nature-700/50 text-stone-300 capitalize flex items-center gap-1.5">
                <Trees className="w-3 h-3 text-emerald-400" />
                {mission.environment || 'Outdoors'}
              </span>
            </div>

            {/* Mission Title & Tagline */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Compass className="w-4 h-4" /> Mission Briefing
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {mission.title}
              </h2>
              <p className="text-base sm:text-lg text-emerald-200/90 font-medium italic">
                "{mission.tagline}"
              </p>
            </div>

            {/* Mindset Quote Box */}
            {mission.mindset_quote && (
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-nature-800/80 flex items-start gap-3.5 text-stone-300">
                <Quote className="w-5 h-5 text-nature-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm italic leading-relaxed text-stone-200">
                  {mission.mindset_quote}
                </div>
              </div>
            )}

            {/* Potential Points Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-nature-950/80 border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Score Potential</span>
                <p className="font-display font-extrabold text-2xl text-white">
                  +{mission.total_potential_points} Points
                </p>
              </div>
              <Sprout className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>

            {/* Primary Action Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleStart}
                type="button"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-display font-extrabold text-base text-white bg-gradient-to-r from-emerald-600 via-nature-500 to-emerald-500 hover:from-emerald-500 hover:to-nature-400 shadow-xl glow-nature hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
              >
                <span>Start Outdoor Mission</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playClickSound();
                    onReset();
                  }}
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-stone-300 bg-black/40 hover:bg-black/60 border border-nature-800 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Adjust Parameters
                </button>

                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-stone-300 bg-black/40 hover:bg-black/60 border border-nature-800 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Share Briefing'}
                </button>
              </div>
            </div>

            {/* Safety Tip */}
            {mission.safety_tip && (
              <div className="p-3.5 rounded-xl bg-black/30 border border-nature-900 text-xs text-stone-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>Caution:</strong> {mission.safety_tip}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Outdoor Waypoints & Tasks (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-nature-800/80 pb-4">
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <span className="text-emerald-400">✦</span> Sequential Outdoor Waypoints
              </h3>
              <span className="text-xs text-stone-400 font-medium">
                {mission.tasks.length} Checkpoints
              </span>
            </div>

            {/* Tasks List */}
            <div className="space-y-3.5">
              {mission.tasks.map((task, index) => (
                <div
                  key={task.id || index}
                  className="p-4 sm:p-5 rounded-2xl bg-[#0f2115]/80 border border-nature-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-nature-500/60 transition"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-nature-800/90 border border-nature-600/50 text-white font-display font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-base text-white">{task.title}</h4>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1.5 text-[11px]">
                        {task.sensory_focus && (
                          <span className="px-2 py-0.5 rounded-md bg-nature-950 border border-nature-800 text-nature-300">
                            {task.sensory_focus}
                          </span>
                        )}
                        {task.screen_free_tip && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-900/60 text-emerald-300 italic">
                            📴 {task.screen_free_tip}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="self-end sm:self-center flex-shrink-0 text-xs font-semibold text-emerald-400 bg-nature-950 px-2.5 py-1 rounded-lg border border-nature-800">
                    +{task.touch_grass_points} pts
                  </div>
                </div>
              ))}
            </div>

            {/* Bonus Grounding Challenge */}
            {mission.bonus_challenge && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-nature-950/60 to-emerald-950/50 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    Touch Grass Grounding Ritual
                  </span>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                    +{mission.bonus_challenge.points} BONUS PTS
                  </span>
                </div>
                <h4 className="font-bold text-white text-base sm:text-lg">
                  {mission.bonus_challenge.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {mission.bonus_challenge.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
