import React, { useState, useEffect } from 'react';
import {
  Compass,
  Volume2,
  VolumeX,
  Sprout,
  Menu,
  X,
  Cpu,
  ChevronRight,
  Sparkles,
  MapPin,
  Trees,
} from 'lucide-react';
import AiStatusBadge from './AiStatusBadge';

export default function Navbar({
  aiStatus,
  onOpenAiModal,
  totalPoints,
  soundOn,
  onToggleSound,
  onResetToLanding,
  onNavigateBuilder,
  currentView,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (callback) => {
    closeMenu();
    callback?.();
  };

  const scrollToSection = (id) => {
    closeMenu();
    if (currentView !== 'landing') {
      onResetToLanding?.();
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#08120b]/95 backdrop-blur-md border-b border-nature-900/80 shadow-md shadow-black/20'
            : 'bg-[#08120b]/80 backdrop-blur-sm border-b border-nature-900/40'
        }`}
      >
        <div className="page-container h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo (Far Left) */}
          <button
            onClick={() => handleNavClick(onResetToLanding)}
            className="flex items-center gap-3 text-left group focus-visible:ring-2 focus-visible:ring-nature-400 rounded-xl"
            aria-label="TrailMate Home"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-nature-600 to-nature-800 text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                TrailMate<span className="text-emerald-400 font-semibold ml-0.5">AI</span>
              </span>
              <span className="text-[11px] text-stone-400 font-medium hidden md:block -mt-0.5">
                Outdoor Mission Generator
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick(onResetToLanding)}
              type="button"
              className={`px-3.5 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-nature-400 ${
                currentView === 'landing'
                  ? 'text-white bg-white/5 font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick(onNavigateBuilder)}
              type="button"
              className={`px-3.5 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-nature-400 ${
                currentView === 'builder'
                  ? 'text-white bg-white/5 font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Generate Mission
            </button>
            <button
              onClick={() => scrollToSection('missions-showcase')}
              type="button"
              className="px-3.5 py-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-nature-400"
            >
              Missions
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              type="button"
              className="px-3.5 py-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-nature-400"
            >
              How It Works
            </button>
          </nav>

          {/* Desktop Right Controls (Far Right) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Grounding Score */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nature-950/80 border border-nature-700/50 text-xs font-semibold text-emerald-300 shadow-sm"
              title="Accumulated Touch Grass Points"
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>{totalPoints}</span>
              <span className="text-[10px] text-stone-400 font-normal">pts</span>
            </div>

            {/* Compact Local AI Status Badge */}
            <AiStatusBadge aiStatus={aiStatus} onClick={onOpenAiModal} />

            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              type="button"
              className="p-2.5 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-nature-800 transition focus-visible:ring-2 focus-visible:ring-nature-400"
              title={soundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
              aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-emerald-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-500" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Status Badge + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <AiStatusBadge aiStatus={aiStatus} onClick={onOpenAiModal} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-stone-300 hover:text-white bg-nature-950/70 border border-nature-800/80 active:scale-95 transition focus-visible:ring-2 focus-visible:ring-nature-400"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm sm:hidden transition-opacity"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-[#0b1810] border-l border-nature-800/80 p-6 flex flex-col justify-between shadow-2xl sm:hidden transform transition-transform duration-250 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-nature-900/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-nature-800 text-emerald-200">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-white">
                TrailMate<span className="text-emerald-400 ml-0.5">AI</span>
              </span>
            </div>
            <button
              onClick={closeMenu}
              type="button"
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation Links">
            <button
              onClick={() => handleNavClick(onResetToLanding)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl text-left font-medium text-stone-200 hover:bg-nature-900/50 hover:text-white transition"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button
              onClick={() => handleNavClick(onNavigateBuilder)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl text-left font-medium text-emerald-300 hover:bg-nature-900/60 transition bg-nature-950/40 border border-nature-800/40"
            >
              <span>Generate Mission</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={() => scrollToSection('missions-showcase')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl text-left font-medium text-stone-200 hover:bg-nature-900/50 hover:text-white transition"
            >
              <span>Example Missions</span>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl text-left font-medium text-stone-200 hover:bg-nature-900/50 hover:text-white transition"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button
              onClick={() => handleNavClick(onOpenAiModal)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl text-left font-medium text-stone-200 hover:bg-nature-900/50 hover:text-white transition"
            >
              <span>Local Engine Info</span>
              <Cpu className="w-4 h-4 text-stone-400" />
            </button>
          </nav>
        </div>

        {/* Drawer Bottom Status */}
        <div className="space-y-4 pt-6 border-t border-nature-900/80">
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-nature-800/60 text-xs">
            <span className="text-stone-400">Grounding Score</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5" /> {totalPoints} pts
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-nature-800/60 text-xs">
            <span className="text-stone-400">Audio Feedback</span>
            <button
              onClick={onToggleSound}
              type="button"
              className="text-emerald-300 font-medium flex items-center gap-1.5"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
              {soundOn ? 'Enabled' : 'Muted'}
            </button>
          </div>

          <p className="text-[11px] text-stone-500 text-center">
            Private on-device intelligence • Zero tracking
          </p>
        </div>
      </div>
    </>
  );
}
