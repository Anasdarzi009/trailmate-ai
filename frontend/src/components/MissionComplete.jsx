import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sprout,
  Clock,
  CheckCircle2,
  Share2,
  RotateCcw,
  Sparkles,
  Trees,
  Footprints,
  Copy,
  Check,
  Award,
} from 'lucide-react';
import { playClickSound, playSuccessChime } from '../utils/sound';

function getGrassRank(points) {
  if (points >= 250) return { title: 'Ancient Forest Warden', emoji: '🌲' };
  if (points >= 180) return { title: 'Wildwood Pathfinder', emoji: '⛰️' };
  if (points >= 120) return { title: 'Green Earth Pilgrim', emoji: '🌾' };
  if (points >= 70) return { title: 'Sprout Scout', emoji: '🌱' };
  return { title: 'Grass Toucher Initiate', emoji: '🌿' };
}

export default function MissionComplete({ summary, onGenerateAnother }) {
  const [copied, setCopied] = useState(false);
  const {
    mission,
    timeSpentSeconds,
    completedTaskCount,
    totalTaskCount,
    bonusCompleted,
    earnedPoints,
  } = summary;

  const rank = getGrassRank(earnedPoints);
  const minutesSpent = Math.max(1, Math.round(timeSpentSeconds / 60));

  useEffect(() => {
    playSuccessChime();

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3d9954', '#63b578', '#97d1a5', '#d5bfa0', '#facc15'],
      });
    } catch {}
  }, []);

  const handleCopyCard = () => {
    playClickSound();
    const shareText = `🏆 TrailMate AI — Outdoor Mission Accomplished!\n\nMission: "${mission.title}"\n🌱 Touch Grass Score: ${earnedPoints} Points\n🎖️ Outdoor Rank: ${rank.emoji} ${rank.title}\n⏱️ Time Outside: ${minutesSpent} minutes\n✅ Tasks Completed: ${completedTaskCount}/${totalTaskCount}\n🌾 Grounding Ritual: ${bonusCompleted ? 'Completed!' : 'Skipped'}\n\n#TouchGrass #TrailMateAI #OutdoorExploration #OpenSourceAI`;
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container py-10 sm:py-14 animate-fade-up">
      <div className="glass-panel-highlight rounded-3xl border border-nature-500/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-8">
        {/* Glow Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Celebration Trophy & Badge */}
        <div className="space-y-3 relative z-10">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-nature-500 to-emerald-600 p-4 shadow-xl glow-nature flex items-center justify-center text-white">
            <Trophy className="w-10 h-10 text-emerald-100" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-xs font-bold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mission Complete • Real World Grounding</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            You Touched Grass!
          </h2>
          <p className="text-sm sm:text-base text-emerald-200/90 max-w-lg mx-auto leading-relaxed">
            You stepped away from the screen, engaged your senses, and reconnected with the physical earth.
          </p>
        </div>

        {/* Touch Grass Score Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f2115]/90 border border-emerald-500/40 shadow-xl space-y-4 relative z-10 max-w-xl mx-auto">
          <div className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Official Grounding Score
          </div>

          <div className="flex items-center justify-center gap-3">
            <Sprout className="w-10 h-10 text-emerald-400 animate-pulse" />
            <span className="font-display font-extrabold text-5xl sm:text-7xl text-white">
              {earnedPoints}
            </span>
            <span className="text-xl font-bold text-emerald-400 self-end mb-2">PTS</span>
          </div>

          {/* Earned Rank */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 border border-nature-700/60 text-sm font-bold text-stone-200">
            <span className="text-lg">{rank.emoji}</span>
            <span>Outdoor Rank: {rank.title}</span>
          </div>
        </div>

        {/* Breakdown Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left relative z-10">
          <div className="p-5 rounded-2xl bg-black/35 border border-nature-800/80 space-y-1">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Clock className="w-3.5 h-3.5 text-nature-400" />
              <span>Time Outside</span>
            </div>
            <div className="font-display font-bold text-2xl text-white">
              {minutesSpent} Minutes
            </div>
            <div className="text-[11px] text-emerald-400">Screen-free exploration</div>
          </div>

          <div className="p-5 rounded-2xl bg-black/35 border border-nature-800/80 space-y-1">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-nature-400" />
              <span>Waypoints Cleared</span>
            </div>
            <div className="font-display font-bold text-2xl text-white">
              {completedTaskCount} of {totalTaskCount}
            </div>
            <div className="text-[11px] text-emerald-400">Sensory tasks done</div>
          </div>

          <div className="p-5 rounded-2xl bg-black/35 border border-nature-800/80 space-y-1">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Sprout className="w-3.5 h-3.5 text-nature-400" />
              <span>Grounding Ritual</span>
            </div>
            <div className="font-display font-bold text-2xl text-white">
              {bonusCompleted ? 'Completed' : 'Skipped'}
            </div>
            <div className="text-[11px] text-emerald-400">
              {bonusCompleted ? '+50 Grounding bonus' : 'Next adventure!'}
            </div>
          </div>
        </div>

        {/* Retrospective Tagline */}
        <div className="p-4 rounded-2xl bg-[#0f2115]/50 border border-nature-800 text-xs text-stone-300 italic relative z-10">
          "{mission.tagline}"
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button
            onClick={handleCopyCard}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs sm:text-sm font-semibold text-stone-200 bg-black/40 hover:bg-black/60 border border-nature-700/60 transition min-h-[48px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Card Copied to Clipboard!' : 'Share Grounding Card'}</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onGenerateAnother();
            }}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-display font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-nature-500 to-emerald-500 hover:from-emerald-500 hover:to-nature-400 shadow-xl glow-nature hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer min-h-[48px]"
          >
            <RotateCcw className="w-5 h-5 text-white" />
            <span>Generate Another Mission</span>
          </button>
        </div>
      </div>
    </div>
  );
}
