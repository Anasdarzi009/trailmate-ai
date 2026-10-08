import React, { useState, useEffect } from 'react';
import {
  Clock,
  Compass,
  Flame,
  Users,
  TreePine,
  Sparkles,
  AlertCircle,
  Footprints,
  Camera,
  Bike,
  Wind,
  Eye,
  Check,
  Cpu,
  ShieldCheck,
  Sprout,
  ArrowRight,
} from 'lucide-react';
import { playClickSound } from '../utils/sound';

const TIME_OPTIONS = [
  { value: 15, label: '15 min', sub: 'Quick Reset' },
  { value: 30, label: '30 min', sub: 'Classic Stroll' },
  { value: 45, label: '45 min', sub: 'Micro-Expedition' },
  { value: 60, label: '60 min', sub: 'Deep Nature' },
  { value: 90, label: '90 min', sub: 'Wild Roam' },
];

const ACTIVITY_OPTIONS = [
  { id: 'walking', label: 'Walking', icon: Footprints, desc: 'Casual stroll & observation' },
  { id: 'hiking', label: 'Hiking', icon: TreePine, desc: 'Trail exploration & incline' },
  { id: 'urban exploring', label: 'Urban Exploring', icon: Compass, desc: 'Uncharted paths & geometry' },
  { id: 'relaxing', label: 'Nature Relaxing', icon: Wind, desc: 'Quiet sitting & open sky' },
  { id: 'photography', label: 'Photography', icon: Camera, desc: 'Framing light & wild textures' },
  { id: 'mindfulness', label: 'Mindful Sensing', icon: Eye, desc: 'Birdsong, breath, tactility' },
  { id: 'cycling', label: 'Cycling / Jog', icon: Bike, desc: 'Active wind & steady cadence' },
];

const DIFFICULTY_OPTIONS = [
  { id: 'easy', label: 'Easy & Gentle', desc: 'Flat paths, low exertion, mindful pace' },
  { id: 'moderate', label: 'Moderate', desc: 'Steady stride, mild inclines, active discovery' },
  { id: 'adventurous', label: 'Adventurous', desc: 'Curious detours, high sensory immersion' },
];

const COMPANION_OPTIONS = [
  { id: 'solo', label: 'Solo Explorer', desc: 'Just you, your senses, and nature' },
  { id: 'friends', label: 'With Friends', desc: 'Shared offline curiosity & conversation' },
  { id: 'family', label: 'Family / Kids', desc: 'Engaging scavenger steps & discovery' },
  { id: 'dog', label: 'With Dog', desc: 'Canine pacing & mutual outdoor rhythm' },
];

const ENVIRONMENT_OPTIONS = [
  { id: 'any', label: 'Any Green Space' },
  { id: 'park', label: 'City Park / Arboretum' },
  { id: 'neighborhood', label: 'Neighborhood Streets' },
  { id: 'woods', label: 'Woods & Nature Trail' },
  { id: 'waterfront', label: 'Waterfront / Lake / River' },
];

const LOADING_TIPS = [
  "Planning your outdoor mission with local Gemma 3...",
  "Synthesizing offline sensory prompts & natural waypoints...",
  "Calibrating real-world tasks for your time window...",
  "Formulating your physical Touch Grass grounding ritual...",
  "Almost ready — remember to pocket your phone once outside!",
];

export default function MissionForm({
  onSubmit,
  isLoading,
  error,
  onOpenAiModal,
}) {
  const [time, setTime] = useState(30);
  const [activity, setActivity] = useState('walking');
  const [difficulty, setDifficulty] = useState('easy');
  const [companion, setCompanion] = useState('solo');
  const [environment, setEnvironment] = useState('any');
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    playClickSound();
    onSubmit({
      time_minutes: time,
      activity,
      difficulty,
      companion,
      environment,
    });
  };

  const selectedActivityObj = ACTIVITY_OPTIONS.find((a) => a.id === activity);
  const selectedDiffObj = DIFFICULTY_OPTIONS.find((d) => d.id === difficulty);
  const selectedEnvObj = ENVIRONMENT_OPTIONS.find((e) => e.id === environment);

  return (
    <div id="mission-builder" className="page-container py-8 sm:py-12 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Main Form Column (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-3xl border border-nature-700/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-left">
            {/* Header */}
            <div className="mb-8 space-y-2 border-b border-nature-800/80 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nature-950/90 border border-nature-700/60 text-xs font-semibold text-emerald-300">
                <Compass className="w-3.5 h-3.5 text-nature-400" />
                <span>Mission Parameter Setup</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Configure Your Outdoor Mission
              </h2>
              <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
                Choose your outdoor conditions. Gemma 3 will formulate an original, screen-free
                adventure tailored to your physical surroundings.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Local AI Notice</p>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      {error.message?.includes('Ollama') || error.message?.includes('connect')
                        ? "Local AI isn't available right now. Ensure the Ollama daemon is running locally."
                        : error.message || "Local AI isn't available right now."}
                    </p>
                    <p className="text-[11px] text-stone-300">
                      To start Ollama, run in your terminal: <code className="px-1.5 py-0.5 rounded bg-black/60 text-emerald-300 font-mono text-[11px]">ollama serve</code>
                    </p>
                  </div>
                </div>
                {onOpenAiModal && (
                  <button
                    onClick={onOpenAiModal}
                    type="button"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-900/90 hover:bg-rose-800 text-white transition self-end sm:self-auto flex-shrink-0 border border-rose-700/60"
                  >
                    View Diagnostics
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. Time Available */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Available Time
                  </span>
                  <span className="text-xs font-normal text-stone-400">Total outdoor duration</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {TIME_OPTIONS.map((opt) => {
                    const isSelected = time === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setTime(opt.value);
                        }}
                        className={`p-3 sm:p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-nature-600 border-nature-400 text-white shadow-lg glow-nature scale-[1.01]'
                            : 'bg-[#102216]/60 border-nature-800/60 text-stone-300 hover:border-nature-600/50 hover:bg-[#14291c]/80'
                        }`}
                      >
                        <div className="font-display font-extrabold text-base sm:text-lg">{opt.label}</div>
                        <div className={`text-[11px] ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Activity Type */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Footprints className="w-4 h-4 text-emerald-400" />
                    Activity Type
                  </span>
                  <span className="text-xs font-normal text-stone-400">Outdoor focus</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {ACTIVITY_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = activity === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setActivity(opt.id);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-nature-700/90 border-nature-400 text-white shadow-md'
                            : 'bg-[#102216]/60 border-nature-800/60 text-stone-300 hover:border-nature-600/50 hover:bg-[#14291c]/80'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-xl flex-shrink-0 ${isSelected ? 'bg-nature-500/40 text-white' : 'bg-nature-950 text-emerald-300'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-white">{opt.label}</div>
                            <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">{opt.desc}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Difficulty & Companion Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Difficulty */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Difficulty Level
                  </label>
                  <div className="space-y-2">
                    {DIFFICULTY_OPTIONS.map((opt) => {
                      const isSelected = difficulty === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setDifficulty(opt.id);
                          }}
                          className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-nature-800/90 border-nature-400 text-white'
                              : 'bg-[#102216]/50 border-nature-800/60 text-stone-300 hover:border-nature-600/50'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-white">{opt.label}</div>
                            <div className="text-[11px] text-stone-400">{opt.desc}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-300 flex-shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Companion */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    Companionship
                  </label>
                  <div className="space-y-2">
                    {COMPANION_OPTIONS.map((opt) => {
                      const isSelected = companion === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setCompanion(opt.id);
                          }}
                          className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-nature-800/90 border-nature-400 text-white'
                              : 'bg-[#102216]/50 border-nature-800/60 text-stone-300 hover:border-nature-600/50'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-white">{opt.label}</div>
                            <div className="text-[11px] text-stone-400">{opt.desc}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-300 flex-shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Preferred Environment */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-emerald-400" />
                  Target Setting / Surroundings
                </label>
                <div className="flex flex-wrap gap-2">
                  {ENVIRONMENT_OPTIONS.map((env) => {
                    const isSelected = environment === env.id;
                    return (
                      <button
                        key={env.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setEnvironment(env.id);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                          isSelected
                            ? 'bg-nature-600 border-nature-400 text-white'
                            : 'bg-[#102216]/60 border-nature-800/60 text-stone-300 hover:border-nature-600/50'
                        }`}
                      >
                        {env.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-2xl font-display font-bold text-base sm:text-lg text-white transition-all flex items-center justify-center gap-3 shadow-xl ${
                    isLoading
                      ? 'bg-nature-900/80 text-stone-400 cursor-not-allowed border border-nature-700/50'
                      : 'bg-gradient-to-r from-emerald-600 via-nature-500 to-emerald-500 hover:from-emerald-500 hover:to-nature-400 glow-nature hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <span>Planning your outdoor mission...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-200" />
                      <span>Generate Outdoor Mission</span>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </>
                  )}
                </button>

                {/* Animated Loading Status */}
                {isLoading && (
                  <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-nature-800/60 text-center animate-fadeIn space-y-1">
                    <p className="text-xs text-emerald-300 font-mono flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      {LOADING_TIPS[tipIndex]}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Executing on-device open-weight inference via Ollama
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Sticky Sidebar Column (4 cols on desktop) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5 text-left">
          {/* Blueprint Card */}
          <div className="glass-panel p-6 rounded-3xl border border-nature-700/50 space-y-5 shadow-xl">
            <div className="space-y-1 border-b border-nature-800/80 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live Summary</span>
              <h3 className="font-display font-bold text-lg text-white">Your Mission Blueprint</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-nature-900/80">
                <span className="text-stone-400">Target Duration:</span>
                <span className="font-semibold text-white">{time} Minutes</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-nature-900/80">
                <span className="text-stone-400">Activity:</span>
                <span className="font-semibold text-white capitalize">{selectedActivityObj?.label}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-nature-900/80">
                <span className="text-stone-400">Difficulty:</span>
                <span className="font-semibold text-amber-300 capitalize">{selectedDiffObj?.label}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-nature-900/80">
                <span className="text-stone-400">Setting:</span>
                <span className="font-semibold text-white">{selectedEnvObj?.label}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-stone-400">Est. Grounding Points:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5" /> ~{Math.round(time * 3 + 75)} pts
                </span>
              </div>
            </div>

            {/* AI Diagnostics Pill */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-nature-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-nature-400" /> Engine:
                </span>
                <span className="font-mono text-emerald-300 font-semibold">Gemma 3 4B</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>Inference Location:</span>
                <span className="text-stone-300">100% Localhost</span>
              </div>
            </div>

            {/* Pre-Trip Checklist */}
            <div className="p-3.5 rounded-2xl bg-nature-950/40 border border-nature-800/60 text-xs text-stone-300 space-y-1.5">
              <p className="font-semibold text-emerald-300">🎒 Before Heading Out:</p>
              <ul className="space-y-1 text-stone-400 text-[11px]">
                <li>• Put your smartphone on Do Not Disturb</li>
                <li>• Wear comfortable outdoor shoes</li>
                <li>• Grab water if venturing past 30 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
