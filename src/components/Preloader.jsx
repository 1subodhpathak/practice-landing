import React, { useEffect, useRef, useState } from 'react';

const DURATION = 2200; // ms
const FADE_DURATION = 400; // ms

const Preloader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    const timeout1 = setTimeout(() => setFading(true), DURATION);
    const timeout2 = setTimeout(() => {
      setVisible(false);
      onFinish && onFinish();
    }, DURATION + FADE_DURATION);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [onFinish]);

  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'radial-gradient(ellipse at center, #0a0a0a 60%, #0ff 120%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: `opacity ${FADE_DURATION}ms`,
      opacity: fading ? 0 : 1,
      overflow: 'hidden',
    }}>
      {/* Subtle scanlines overlay */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'repeating-linear-gradient(to bottom, rgba(0,255,220,0.04) 0px, rgba(0,255,220,0.04) 1px, transparent 1px, transparent 4px)',
        mixBlendMode: 'lighten',
        animation: 'scan-move 2s linear infinite',
      }} />
      {/* Animated neon ring */}
      <svg
        ref={ringRef}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ zIndex: 2, filter: 'drop-shadow(0 0 16px #00fff7)' }}
      >
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="#00fff7"
          strokeWidth="4"
          strokeDasharray="300"
          strokeDashoffset="0"
          style={{
            strokeLinecap: 'round',
            filter: 'drop-shadow(0 0 12px #00fff7)',
            animation: 'ring-spin 2.2s cubic-bezier(0.4,0,0.2,1) infinite',
          }}
        />
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="#00fff7"
          strokeWidth="4"
          strokeDasharray="60 240"
          strokeDashoffset="0"
          style={{
            strokeLinecap: 'round',
            opacity: 0.5,
            filter: 'drop-shadow(0 0 8px #00fff7)',
            animation: 'ring-dash 1.1s linear infinite',
          }}
        />
      </svg>
      {/* Minimal loading text */}
      <span style={{
        position: 'absolute',
        bottom: '12%',
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#00fff7',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 18,
        letterSpacing: 2,
        opacity: 0.7,
        zIndex: 2,
        textShadow: '0 0 8px #00fff7',
      }}>
        Initializing System...
      </span>
      {/* Keyframes for scanlines and ring */}
      <style>{`
        @keyframes scan-move {
          0% { background-position-y: 0; }
          100% { background-position-y: 4px; }
        }
        @keyframes ring-spin {
          0% { stroke-dashoffset: 0; transform: rotate(0deg); }
          100% { stroke-dashoffset: 300; transform: rotate(360deg); }
        }
        @keyframes ring-dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 300; }
        }
      `}</style>
    </div>
  );
};

export default Preloader; 