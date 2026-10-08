import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Circle,
  Sprout,
  Smartphone,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Award,
  Wind,
  Footprints,
} from 'lucide-react';
import { playCheckSound, playClickSound } from '../utils/sound';

export default function ActiveMission({ mission, onCompleteMission, onCancel }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Task completion state
  const [completedTaskIds, setCompletedTaskIds] = useState(new Set());
  const [bonusCompleted, setBonusCompleted] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const toggleTask = (taskId) => {
    playCheckSound();
    setCompletedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const toggleBonus = () => {
    playCheckSound();
    setBonusCompleted((prev) => !prev);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const totalTasks = mission.tasks.length;
  const completedCount = completedTaskIds.size;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  // Points calculation
  const taskPointsEarned = mission.tasks
    .filter((t) => completedTaskIds.has(t.id))
    .reduce((acc, t) => acc + (t.touch_grass_points || 25), 0);
  const bonusPointsEarned = bonusCompleted ? (mission.bonus_challenge?.points || 50) : 0;
  const currentTotalPoints = taskPointsEarned + bonusPointsEarned;

  const handleFinish = () => {
    onCompleteMission({
      mission,
      timeSpentSeconds: secondsElapsed,
      completedTaskCount: completedCount,
      totalTaskCount: totalTasks,
      bonusCompleted,
      earnedPoints: currentTotalPoints,
    });
  };

  return (
    <div className="page-container py-6 sm:py-10 animate-fade-up space-y-6">
      {/* Sticky Mobile Timer Bar (visible on mobile only) */}
      <div className="sticky top-16 z-30 sm:hidden -mx-4 px-4 py-3 bg-[#0c1810]/95 backdrop-blur-md border-b border-nature-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-xl font-bold text-emerald-300">
            {formatTime(secondsElapsed)}
          </span>
          <span className="text-xs text-stone-400">({progressPercent}%)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsActive(!isActive)}
            type="button"
            className="p-2 rounded-xl bg-nature-800 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isActive ? 'Pause timer' : 'Resume timer'}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleFinish}
            type="button"
            className="px-3 py-2 rounded-xl bg-emerald-600 font-bold text-xs text-white min-h-[44px] flex items-center gap-1.5"
          >
            <span>Finish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen-Free Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-nature-950/90 to-emerald-950/80 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 flex-shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white">
              Device In Pocket Protocol
            </h3>
            <p className="text-xs text-emerald-200/80">
              Focus eyes forward on the path. Mark off waypoints at natural stopping points.
            </p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-600/40 text-[11px] font-semibold text-emerald-300 flex-shrink-0">
          Real World Mode
        </div>
      </div>

      {/* 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Sticky Timer & Mission Status (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="glass-panel-highlight rounded-3xl border border-nature-600/50 p-6 sm:p-8 space-y-6 text-left shadow-xl">
            {/* Header */}
            <div className="space-y-1 border-b border-nature-800/80 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Active Adventure: {mission.activity}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {mission.title}
              </h2>
            </div>

            {/* Desktop Timer Display */}
            <div className="p-5 rounded-2xl bg-black/50 border border-nature-700/60 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-stone-400">Elapsed Outdoor Time</span>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-300">
                  {formatTime(secondsElapsed)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsActive(!isActive)}
                  type="button"
                  className="p-3 rounded-2xl bg-nature-700 hover:bg-nature-600 text-white transition min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer shadow-md"
                  title={isActive ? 'Pause Timer' : 'Resume Timer'}
                  aria-label={isActive ? 'Pause timer' : 'Resume timer'}
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setSecondsElapsed(0)}
                  type="button"
                  className="p-3 rounded-2xl bg-black/40 hover:bg-black/70 text-stone-400 hover:text-white transition min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
                  title="Reset Timer"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar & Points Tally */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-300">
                  Waypoints: {completedCount} of {totalTasks} ({progressPercent}%)
                </span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Sprout className="w-3.5 h-3.5" />
                  {currentTotalPoints} pts accrued
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-black/50 border border-nature-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-nature-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleFinish}
                type="button"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-display font-extrabold text-base text-white bg-gradient-to-r from-emerald-600 via-nature-500 to-emerald-500 hover:from-emerald-500 hover:to-nature-400 shadow-xl glow-nature hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer min-h-[52px]"
              >
                <Award className="w-5 h-5 text-white" />
                <span>Finish Mission & Claim Score</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to abandon this outdoor mission?')) {
                    onCancel();
                  }
                }}
                type="button"
                className="w-full text-center text-xs font-medium text-stone-500 hover:text-rose-400 transition py-1"
              >
                Abandon Mission
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Checklist & Bonus (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-nature-800/80 pb-3">
            <h3 className="font-display font-bold text-lg text-white">
              Tap Waypoint to Complete
            </h3>
            <span className="text-xs text-stone-400">Large touch targets</span>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {mission.tasks.map((task, idx) => {
              const isDone = completedTaskIds.has(task.id);
              return (
                <div
                  key={task.id || idx}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-start gap-4 min-h-[64px] ${
                    isDone
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md'
                      : 'bg-[#0f2115]/80 border-nature-700/50 hover:border-nature-500/60 hover:bg-[#122819]'
                  }`}
                  role="checkbox"
                  aria-checked={isDone}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleTask(task.id);
                    }
                  }}
                >
                  <div className="mt-0.5 text-nature-400 flex-shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-stone-500 hover:text-emerald-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-bold text-base ${
                          isDone ? 'line-through text-stone-400' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </h4>
                      <span className="text-xs font-semibold text-emerald-400 flex-shrink-0 ml-2">
                        +{task.touch_grass_points} pts
                      </span>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDone ? 'text-stone-500' : 'text-stone-300'
                      }`}
                    >
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
              );
            })}
          </div>

          {/* Bonus Grounding Challenge */}
          {mission.bonus_challenge && (
            <div
              onClick={toggleBonus}
              className={`p-5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-start gap-4 min-h-[64px] ${
                bonusCompleted
                  ? 'bg-emerald-950/70 border-emerald-400 shadow-xl glow-nature'
                  : 'bg-nature-950/60 border-emerald-700/40 hover:border-emerald-500/60'
              }`}
              role="checkbox"
              aria-checked={bonusCompleted}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleBonus();
                }
              }}
            >
              <div className="mt-0.5 text-nature-400 flex-shrink-0">
                {bonusCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                ) : (
                  <Circle className="w-6 h-6 text-stone-500 hover:text-emerald-300" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    Touch Grass Bonus Challenge
                  </span>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                    +{mission.bonus_challenge.points} PTS
                  </span>
                </div>
                <h4 className={`font-bold text-white text-base ${bonusCompleted ? 'text-emerald-200' : ''}`}>
                  {mission.bonus_challenge.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {mission.bonus_challenge.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
