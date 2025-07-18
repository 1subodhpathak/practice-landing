import React from 'react';
import CyberpunkBackground from './CyberpunkBackground';
import ParticleField from './ParticleField';
// import CircuitOverlay from './CircuitOverlay';
import HolographicPanel from './HolographicPanel';
import GlitchText from './GlitchText';
import FuturisticButton from './FuturisticButton';
import SoundManager from './SoundManager';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const RobotHead = () => (
  <div className="relative flex items-center justify-center mb-8 animate-floatRobot">
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
      <ellipse cx="48" cy="56" rx="32" ry="28" fill="#101c24" stroke="#00fff7" strokeWidth="3" />
      <ellipse cx="48" cy="56" rx="28" ry="24" fill="#0a232e" stroke="#00d4aa" strokeWidth="2" />
      <ellipse cx="48" cy="56" rx="18" ry="14" fill="#16213e" stroke="#4dd0e1" strokeWidth="2" />
      <ellipse cx="48" cy="56" rx="7" ry="7" fill="#00fff7" className="animate-pulse" />
      <rect x="36" y="32" width="24" height="8" rx="4" fill="#00fff7" opacity="0.12" />
      <rect x="28" y="70" width="40" height="8" rx="4" fill="#00fff7" opacity="0.08" />
      <circle cx="32" cy="48" r="4" fill="#00fff7" opacity="0.5" />
      <circle cx="64" cy="48" r="4" fill="#00fff7" opacity="0.5" />
      <rect x="44" y="62" width="8" height="4" rx="2" fill="#00fff7" opacity="0.5" />
      <rect x="40" y="80" width="16" height="4" rx="2" fill="#00fff7" opacity="0.2" />
    </svg>
    {/* Flicker overlay */}
    <div className="absolute inset-0 pointer-events-none animate-flickerRobot" style={{background: 'radial-gradient(ellipse at center, #00fff722 60%, transparent 100%)'}} />
  </div>
);

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <SoundManager>
      <div className="min-h-screen w-full overflow-hidden relative flex flex-col items-center justify-center">
        {/* Animated Background */}
        <CyberpunkBackground />
        <ParticleField />
        {/* <CircuitOverlay /> */}
        <div className="hack-scanlines hack-flicker"></div>

        {/* Header */}
        <nav className="relative z-20 flex justify-between items-center w-full pt-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 rounded-lg shadow-lg" />
          </div>
          {/* <FuturisticButton onClick={() => window.location.href = '/'} className="animate-pulseHome">
            Home
          </FuturisticButton> */}
        </nav>

        {/* Center Panel */}
        <div className="flex flex-1 items-center justify-center w-full z-20">
          <HolographicPanel className="w-[650px] max-w-[95vw] min-h-[400px] p-14 flex flex-col items-center relative animate-glitch-popup animate-floatPanel">
            <RobotHead />
            <GlitchText triggerGlitch={true} className="text-5xl font-bold text-cyan-300 text-center mb-4 select-none">
              Coming Soon
            </GlitchText>
            <GlitchText triggerGlitch={true} className="text-lg font-mono text-cyan-200 text-center mb-8 select-none" style={{animationDelay: '1s'}}>
              Our AI system is almost online.<br />
              Prepare for a next-gen, robotic experience.
            </GlitchText>
            {/* Holographic scanline */}
            <div className="absolute left-0 right-0 top-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-60 animate-scanline" />
            {/* Centered Back to Home Button */}
            <div className="flex flex-1 items-end justify-center w-full mt-8">
              <FuturisticButton onClick={() => navigate('/')} className="px-10 py-4 text-xl animate-pulseHome">
                Back to Home
              </FuturisticButton>
            </div>
            <style jsx>{`
              @keyframes glitch-popup {
                0% { filter: blur(8px) brightness(1.2); opacity: 0; transform: scale(0.95) skewX(-8deg); }
                10% { filter: blur(2px) brightness(1.1); opacity: 0.7; transform: scale(1.02) skewX(2deg); }
                20% { filter: blur(0.5px) brightness(1.05); opacity: 1; transform: scale(1) skewX(-1deg); }
                100% { filter: none; opacity: 1; transform: none; }
              }
              .animate-glitch-popup {
                animation: glitch-popup 0.5s cubic-bezier(0.4,0,0.2,1);
              }
              @keyframes scanline {
                0% { opacity: 0.2; }
                50% { opacity: 0.7; }
                100% { opacity: 0.2; }
              }
              .animate-scanline {
                animation: scanline 2.5s infinite linear;
              }
              @keyframes floatPanel {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
              .animate-floatPanel {
                animation: floatPanel 4s ease-in-out infinite;
              }
              @keyframes floatRobot {
                0%, 100% { transform: translateY(0px) scale(1.01); }
                50% { transform: translateY(-16px) scale(1.04); }
              }
              .animate-floatRobot {
                animation: floatRobot 3.2s ease-in-out infinite;
              }
              @keyframes flickerRobot {
                0%, 100% { opacity: 0.7; }
                10% { opacity: 0.3; }
                20% { opacity: 0.9; }
                30% { opacity: 0.5; }
                40% { opacity: 0.8; }
                50% { opacity: 0.4; }
                60% { opacity: 1; }
                70% { opacity: 0.6; }
                80% { opacity: 0.2; }
                90% { opacity: 0.8; }
              }
              .animate-flickerRobot {
                animation: flickerRobot 1.7s infinite steps(1);
              }
              @keyframes pulseHome {
                0%, 100% { box-shadow: 0 0 0 0 #00fff7aa; }
                50% { box-shadow: 0 0 24px 8px #00fff744; }
              }
              .animate-pulseHome {
                animation: pulseHome 2.2s infinite;
              }
            `}</style>
          </HolographicPanel>
        </div>
      </div>
    </SoundManager>
  );
};

export default ComingSoon; 