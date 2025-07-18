import React, { useEffect, useRef, useState } from 'react';

const DURATION = 2200; // ms
const FADE_DURATION = 400; // ms
const GLYPHS = '0123456789ABCDEF';
const GLYPH_COUNT = 18;

const Preloader = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [glyphs, setGlyphs] = useState(Array(GLYPH_COUNT).fill('0'));
  const canvasRef = useRef(null);
  const animRef = useRef();

  // Animate glyphs
  useEffect(() => {
    if (!visible) return;
    let running = true;
    function animateGlyphs() {
      setGlyphs(g => g.map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]));
      if (running) setTimeout(animateGlyphs, 60);
    }
    animateGlyphs();
    return () => { running = false; };
  }, [visible]);

  // Canvas animation
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 220, height = 220;
    let dpr = window.devicePixelRatio || 1;
    function resize() {
      width = 220; height = 220;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);
    let t0 = performance.now();
    function draw(now) {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, width, height);
      // Central core
      ctx.save();
      ctx.translate(width/2, height/2);
      // Pulsing core
      ctx.beginPath();
      ctx.arc(0, 0, 22 + Math.sin(t*2)*2, 0, 2*Math.PI);
      ctx.fillStyle = 'rgba(0,255,247,0.18)';
      ctx.shadowColor = '#00fff7';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();
      // Rotating rings
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(width/2, height/2);
        ctx.rotate(t * (0.4 + i*0.2) + i);
        ctx.beginPath();
        ctx.arc(0, 0, 48 + i*18, Math.PI*0.1, Math.PI*1.9);
        ctx.strokeStyle = `rgba(0,255,247,${0.13 + 0.07*i})`;
        ctx.lineWidth = 2 + i;
        ctx.shadowColor = '#4dd0e1';
        ctx.shadowBlur = 8 + i*2;
        ctx.stroke();
        ctx.restore();
      }
      // Rotating arc segments
      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.translate(width/2, height/2);
        ctx.rotate(t * 1.2 + i * Math.PI/2);
        ctx.beginPath();
        ctx.arc(0, 0, 80, Math.PI*0.05, Math.PI*0.22);
        ctx.strokeStyle = 'rgba(0,255,247,0.22)';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#4dd0e1';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }
      // Scan line
      ctx.save();
      ctx.translate(width/2, height/2);
      const scanAngle = (t*1.1) % (2*Math.PI);
      ctx.rotate(scanAngle);
      ctx.beginPath();
      ctx.arc(0, 0, 70, -0.08, 0.08);
      ctx.strokeStyle = 'rgba(0,255,247,0.32)';
      ctx.lineWidth = 8;
      ctx.shadowColor = '#00fff7';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();
      // Data streams (moving packets)
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(width/2, height/2);
        ctx.rotate(t * (0.7 + i*0.3) + i*1.1);
        const packetAngle = ((t*1.5 + i*0.7) % 1) * 2 * Math.PI;
        const r = 48 + i*18;
        ctx.beginPath();
        ctx.arc(Math.cos(packetAngle)*r, Math.sin(packetAngle)*r, 6, 0, 2*Math.PI);
        ctx.fillStyle = 'rgba(0,255,247,0.7)';
        ctx.shadowColor = '#4dd0e1';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
      }
      // Subtle grid overlay
      ctx.save();
      ctx.globalAlpha = 0.13;
      ctx.strokeStyle = '#00fff7';
      for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(width/2, height/2, i*22, 0, 2*Math.PI);
        ctx.stroke();
      }
      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [visible]);

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
      flexDirection: 'column',
    }}>
      {/* Canvas HUD animation */}
      <canvas
        ref={canvasRef}
        width={220}
        height={220}
        style={{
          zIndex: 2,
          width: 220,
          height: 220,
          background: 'transparent',
          filter: 'drop-shadow(0 0 16px #00fff7)',
        }}
      />
      {/* Minimal loading text */}
      <span style={{
        marginTop: 18,
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
      {/* Fast-changing glyphs/numbers */}
      <div style={{
        marginTop: 10,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 16,
        color: '#00fff7',
        letterSpacing: 2,
        opacity: 0.55,
        textShadow: '0 0 8px #00fff7',
        zIndex: 2,
        userSelect: 'none',
      }}>
        {glyphs.join(' ')}
      </div>
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
      {/* Keyframes for scanlines */}
      <style>{`
        @keyframes scan-move {
          0% { background-position-y: 0; }
          100% { background-position-y: 4px; }
        }
      `}</style>
    </div>
  );
};

export default Preloader; 