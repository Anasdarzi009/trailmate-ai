import React from 'react';
import { Cpu } from 'lucide-react';

export default function AiStatusBadge({ aiStatus, onClick }) {
  const isOnline = aiStatus?.ollama_online && aiStatus?.model_available;
  const isModelMissing = aiStatus?.ollama_online && !aiStatus?.model_available;

  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border cursor-pointer hover:border-emerald-500/60 active:scale-95 glass-panel"
      style={{
        borderColor: isOnline
          ? 'rgba(61, 153, 84, 0.35)'
          : isModelMissing
          ? 'rgba(217, 119, 6, 0.4)'
          : 'rgba(239, 68, 68, 0.4)',
        backgroundColor: isOnline
          ? 'rgba(16, 38, 24, 0.6)'
          : isModelMissing
          ? 'rgba(42, 28, 10, 0.6)'
          : 'rgba(42, 16, 16, 0.6)',
      }}
      title={isOnline ? `Local Intelligence Ready (${aiStatus?.selected_model})` : 'Check Engine Status'}
      aria-label="Local AI status"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isOnline ? 'bg-emerald-400' : isModelMissing ? 'bg-amber-400' : 'bg-rose-400'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isOnline ? 'bg-emerald-500' : isModelMissing ? 'bg-amber-500' : 'bg-rose-500'
          }`}
        />
      </span>

      <span className="text-stone-300 font-medium">
        {isOnline ? (
          <span>Local AI</span>
        ) : isModelMissing ? (
          <span className="text-amber-300">Model Setup</span>
        ) : (
          <span className="text-rose-300">Offline</span>
        )}
      </span>
    </button>
  );
}
