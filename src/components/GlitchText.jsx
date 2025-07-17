import React, { useEffect, useState } from 'react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {boolean} [props.triggerGlitch]
 */
const GlitchText = ({ 
  children, 
  className = '', 
  triggerGlitch = false 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (triggerGlitch) {
      setIsGlitching(true);
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 2000); // 2 second glitch duration

      return () => clearTimeout(timer);
    }
  }, [triggerGlitch]);

  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <div className={`relative z-10 ${isGlitching ? 'animate-glitch-main' : ''}`}>
        {children}
      </div>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          {/* Red glitch layer */}
          <div 
            className="absolute inset-0 z-5 text-red-500 animate-glitch-red"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
          >
            {children}
          </div>
          
          {/* Blue glitch layer */}
          <div 
            className="absolute inset-0 z-5 text-blue-500 animate-glitch-blue"
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
          >
            {children}
          </div>
          
          {/* Cyan glitch layer */}
          <div 
            className="absolute inset-0 z-5 text-cyan-400 animate-glitch-cyan"
            style={{ clipPath: 'polygon(0 20%, 100% 20%, 100% 80%, 0 80%)' }}
          >
            {children}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-main {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(2px, -1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(1px, -2px); }
          50% { transform: translate(-2px, -1px); }
          60% { transform: translate(2px, 1px); }
          70% { transform: translate(-1px, -2px); }
          80% { transform: translate(1px, 2px); }
          90% { transform: translate(-2px, 1px); }
        }
        
        @keyframes glitch-red {
          0%, 100% { transform: translate(0); opacity: 0.8; }
          10% { transform: translate(-3px, 2px); opacity: 0.9; }
          20% { transform: translate(3px, -2px); opacity: 0.7; }
          30% { transform: translate(-2px, 3px); opacity: 0.8; }
          40% { transform: translate(2px, -3px); opacity: 0.9; }
          50% { transform: translate(-3px, -2px); opacity: 0.6; }
          60% { transform: translate(3px, 2px); opacity: 0.8; }
          70% { transform: translate(-2px, -3px); opacity: 0.9; }
          80% { transform: translate(2px, 3px); opacity: 0.7; }
          90% { transform: translate(-3px, 2px); opacity: 0.8; }
        }
        
        @keyframes glitch-blue {
          0%, 100% { transform: translate(0); opacity: 0.8; }
          15% { transform: translate(2px, -3px); opacity: 0.9; }
          25% { transform: translate(-2px, 3px); opacity: 0.7; }
          35% { transform: translate(3px, -2px); opacity: 0.8; }
          45% { transform: translate(-3px, 2px); opacity: 0.9; }
          55% { transform: translate(2px, 3px); opacity: 0.6; }
          65% { transform: translate(-2px, -3px); opacity: 0.8; }
          75% { transform: translate(3px, 2px); opacity: 0.9; }
          85% { transform: translate(-3px, -2px); opacity: 0.7; }
          95% { transform: translate(2px, -3px); opacity: 0.8; }
        }
        
        @keyframes glitch-cyan {
          0%, 100% { transform: translate(0); opacity: 0.6; }
          12% { transform: translate(1px, -2px); opacity: 0.8; }
          24% { transform: translate(-1px, 2px); opacity: 0.5; }
          36% { transform: translate(2px, -1px); opacity: 0.7; }
          48% { transform: translate(-2px, 1px); opacity: 0.8; }
          60% { transform: translate(1px, 2px); opacity: 0.4; }
          72% { transform: translate(-1px, -2px); opacity: 0.7; }
          84% { transform: translate(2px, 1px); opacity: 0.8; }
          96% { transform: translate(-2px, -1px); opacity: 0.6; }
        }
        
        .animate-glitch-main {
          animation: glitch-main 0.3s infinite linear;
        }
        
        .animate-glitch-red {
          animation: glitch-red 0.4s infinite linear;
        }
        
        .animate-glitch-blue {
          animation: glitch-blue 0.35s infinite linear;
        }
        
        .animate-glitch-cyan {
          animation: glitch-cyan 0.45s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default GlitchText;