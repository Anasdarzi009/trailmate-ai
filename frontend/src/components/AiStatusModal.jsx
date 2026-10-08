import React, { useState } from 'react';
import { X, Cpu, Terminal, ShieldCheck, Check, RefreshCw, AlertTriangle, ExternalLink } from 'lucide-react';

export default function AiStatusModal({ isOpen, onClose, aiStatus, onRefresh }) {
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  if (!isOpen) return null;

  const isOnline = aiStatus?.ollama_online && aiStatus?.model_available;
  const isModelMissing = aiStatus?.ollama_online && !aiStatus?.model_available;
  const commandToRun = isModelMissing
    ? `ollama pull ${aiStatus?.selected_model || 'gemma3:4b'}`
    : `ollama serve`;

  const copyCommand = (cmd) => {
    navigator.clipboard?.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl border border-nature-600/30 bg-[#0e1d14] text-stone-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-nature-900/60 bg-gradient-to-r from-[#14281c] to-[#0e1d14]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-nature-900/80 border border-nature-700/40 text-nature-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Local AI Diagnostics</h3>
              <p className="text-xs text-nature-300/80">Ollama & Google Gemma 3 Open-Weight Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status Box */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              isOnline
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : isModelMissing
                ? 'bg-amber-950/40 border-amber-500/30 text-amber-200'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
            }`}
          >
            {isOnline ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : isModelMissing ? (
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="space-y-1 text-sm">
              <p className="font-semibold text-white">
                {isOnline
                  ? `Fully Operational with Gemma 3 (${aiStatus?.selected_model})`
                  : isModelMissing
                  ? `Ollama is active, but ${aiStatus?.selected_model} is missing`
                  : 'Ollama service is unreachable'}
              </p>
              <p className="text-xs text-stone-300 leading-relaxed">
                {aiStatus?.message || 'Checking local AI status...'}
              </p>
            </div>
          </div>

          {/* Details Table */}
          <div className="rounded-xl border border-nature-800/60 bg-black/30 p-4 space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-nature-900/80">
              <span className="text-stone-400">Endpoint URL:</span>
              <span className="font-mono text-emerald-300">{aiStatus?.ollama_base_url || 'http://127.0.0.1:11434'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-nature-900/80">
              <span className="text-stone-400">Target Model:</span>
              <span className="font-mono text-emerald-300 font-semibold">{aiStatus?.selected_model || 'gemma3:4b'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-nature-900/80">
              <span className="text-stone-400">Installed Models:</span>
              <span className="font-mono text-stone-300">
                {aiStatus?.installed_models?.length
                  ? aiStatus.installed_models.join(', ')
                  : 'None detected yet'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-stone-400">Cloud API Telemetry:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 0% (Strictly Local)
              </span>
            </div>
          </div>

          {/* Terminal Command Helper */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-nature-200 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-nature-400" />
              Quick Command:
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-nature-800/80 font-mono text-xs text-emerald-300">
              <code>{commandToRun}</code>
              <button
                onClick={() => copyCommand(commandToRun)}
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-nature-800 hover:bg-nature-700 text-white font-sans text-xs transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-300" /> : null}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Why Open-Weights Matters */}
          <div className="p-4 rounded-xl border border-nature-800/40 bg-nature-950/30 space-y-2 text-xs text-stone-300 leading-relaxed">
            <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm">
              <span className="text-base">🌾</span> Why Local Gemma Matters
            </h4>
            <p>
              TrailMate AI runs entirely on your local machine using Google's open-weight <strong>Gemma 3 4B</strong> architecture through <strong>Ollama</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 text-stone-400">
              <li><strong>Zero Cloud Telemetry:</strong> Your prompts and locations are never sent to third-party proprietary APIs.</li>
              <li><strong>True Offline Capability:</strong> Once the model is on your disk, you can generate missions even in the deepest woods without cell reception.</li>
              <li><strong>Sustainable Tech:</strong> Open weights ensure software independence and long-term durability.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-nature-900/80 bg-black/40 flex items-center justify-between">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-nature-900/80 hover:bg-nature-800 border border-nature-700/40 text-nature-200 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Status
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-nature-600 hover:bg-nature-500 text-white transition shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
