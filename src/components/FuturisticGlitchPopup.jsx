import React, { useEffect, useRef, useState } from 'react';
import HolographicPanel from './HolographicPanel';
import GlitchText from './GlitchText';
import FuturisticButton from './FuturisticButton';
import buttonClickSound from '../assets/mp3/button-click.mp3';
// import glitchSound from '../assets/mp3/glitch.mp3';

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {'Python'|'SQL'} props.badgeType
 */
const FuturisticGlitchPopup = ({ open, onClose, badgeType }) => {
  const [show, setShow] = useState(open);
  const [triggerGlitch, setTriggerGlitch] = useState(false);
  const audioRef = useRef(null);
  const buttonClickRef = useRef(null);

  useEffect(() => {
    if (open) {
      setShow(true);
      setTriggerGlitch(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      setTimeout(() => setShow(false), 400); // allow exit animation
    }
  }, [open]);

  const handleButtonClick = (action) => {
    if (buttonClickRef.current) {
      buttonClickRef.current.currentTime = 0;
      buttonClickRef.current.play();
    }
    setTimeout(action, 80); // slight delay for sound
  };

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-400 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
         onClick={onClose}>
      {/* <audio ref={audioRef} src={glitchSound} preload="auto" /> */}
      <div onClick={e => e.stopPropagation()}>
        <audio ref={buttonClickRef} src={buttonClickSound} preload="auto" />
        <HolographicPanel className={`w-[800px] max-w-[90vw] min-h-[400px] p-12 relative animate-glitch-popup`}>
          <GlitchText triggerGlitch={triggerGlitch} className="text-4xl font-bold text-cyan-300 text-center mb-8 select-none">
            {`Let's Get Started`}
          </GlitchText>
          <div className="text-center text-white text-xl font-mono mb-12 leading-relaxed px-4">
            What would you like to do next? Practice questions, attempt a quiz or take a mock test?
          </div>
          <div className="flex justify-center gap-12 mb-8 flex-wrap">
            <FuturisticButton onClick={() => handleButtonClick(() => { window.location.href = '/coming-soon'; })} className="min-w-[200px] px-8 py-4 text-lg">
              Mock Quiz
            </FuturisticButton>
            <FuturisticButton onClick={() => handleButtonClick(() => { /* TODO: handle practice questions */ })} className="min-w-[200px] px-8 py-4 text-lg">
              Practice Questions
            </FuturisticButton>
          </div>
          {/* <button 
            onClick={onClose}
            className="absolute top-1 right- w-12 h-12 flex items-center justify-center rounded-full text-cyan-400 hover:text-cyan-200 hover:bg-cyan-400/10 text-3xl font-bold bg-transparent border-none cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Close popup"
          >
            ×
          </button> */}
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
          `}</style>
        </HolographicPanel>
      </div>
    </div>
  );
};

export default FuturisticGlitchPopup;