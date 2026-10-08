import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MissionForm from './components/MissionForm';
import MissionCard from './components/MissionCard';
import ActiveMission from './components/ActiveMission';
import MissionComplete from './components/MissionComplete';
import AiStatusModal from './components/AiStatusModal';
import LandingSections from './components/LandingSections';
import {
  getStoredPoints,
  addStoredPoints,
  recordCompletedMission,
} from './utils/storage';
import { isSoundEnabled, toggleSound } from './utils/sound';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'builder' | 'briefing' | 'active' | 'complete'
  const [aiStatus, setAiStatus] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentMission, setCurrentMission] = useState(null);
  const [missionSummary, setMissionSummary] = useState(null);

  const [totalPoints, setTotalPoints] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  // Load points and check health on mount
  useEffect(() => {
    setTotalPoints(getStoredPoints());
    setSoundOn(isSoundEnabled());
    fetchAiStatus();
  }, []);

  const fetchAiStatus = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setAiStatus(data);
      } else {
        setAiStatus({
          ollama_online: false,
          model_available: false,
          selected_model: 'gemma3:4b',
          message: 'Backend API reachable, but local AI check failed.',
        });
      }
    } catch (err) {
      setAiStatus({
        ollama_online: false,
        model_available: false,
        selected_model: 'gemma3:4b',
        message: 'Could not connect to TrailMate backend server.',
      });
    }
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleGenerateMission = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/missions/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const detail = errorData.detail || {};
        throw new Error(
          detail.message ||
            detail.guide ||
            `Generation failed (HTTP ${res.status}). Ensure Ollama is running.`
        );
      }

      const missionData = await res.json();
      setCurrentMission(missionData);
      setView('briefing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Generation error:', err);
      setError({ message: err.message });
      // Also refresh AI status to see if Ollama died or model was uninstalled
      fetchAiStatus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartMission = (mission) => {
    setCurrentMission(mission);
    setView('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteMission = (summaryData) => {
    const newTotal = addStoredPoints(summaryData.earnedPoints);
    setTotalPoints(newTotal);
    recordCompletedMission(summaryData.mission, summaryData.earnedPoints);

    setMissionSummary(summaryData);
    setView('complete');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateAnother = () => {
    setCurrentMission(null);
    setMissionSummary(null);
    setError(null);
    setView('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToLanding = () => {
    if (view === 'active') {
      if (!window.confirm('Leave active mission and return to home?')) return;
    }
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBuilder = () => {
    if (view === 'active') {
      if (!window.confirm('Leave active mission and generate a new one?')) return;
    }
    setView('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08120b] text-[#e3efe6]">
      {/* Top Navbar */}
      <Navbar
        aiStatus={aiStatus}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        totalPoints={totalPoints}
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
        onResetToLanding={handleResetToLanding}
        onNavigateBuilder={handleNavigateBuilder}
        currentView={view}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {view === 'landing' && (
          <div className="w-full">
            <Hero onStartCreating={handleNavigateBuilder} />
            <LandingSections
              onNavigateBuilder={handleNavigateBuilder}
              onOpenAiModal={() => setIsAiModalOpen(true)}
            />
          </div>
        )}

        {view === 'builder' && (
          <MissionForm
            onSubmit={handleGenerateMission}
            isLoading={isLoading}
            error={error}
            onOpenAiModal={() => setIsAiModalOpen(true)}
          />
        )}

        {view === 'briefing' && currentMission && (
          <MissionCard
            mission={currentMission}
            onStartMission={handleStartMission}
            onReset={() => setView('builder')}
          />
        )}

        {view === 'active' && currentMission && (
          <ActiveMission
            mission={currentMission}
            onCompleteMission={handleCompleteMission}
            onCancel={() => setView('briefing')}
          />
        )}

        {view === 'complete' && missionSummary && (
          <MissionComplete
            summary={missionSummary}
            onGenerateAnother={handleGenerateAnother}
          />
        )}
      </main>

      {/* AI Diagnostics Modal */}
      <AiStatusModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        aiStatus={aiStatus}
        onRefresh={fetchAiStatus}
      />
    </div>
  );
}
