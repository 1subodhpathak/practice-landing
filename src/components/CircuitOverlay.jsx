import React, { useEffect, useRef } from 'react';

const CircuitOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    // Responsive canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Circuit nodes and lines
    const nodes = [];
    const lines = [];
    const nodeCount = 18;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 3 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2
      });
    }
    // Connect nodes with lines
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() < 0.22) {
          lines.push([i, j]);
        }
      }
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Animate nodes
      nodes.forEach((node, i) => {
        const speed = 0.5 + (i % 3) * 0.2;
        node.x += Math.sin(t / 900 + node.phase) * 0.08 * speed;
        node.y += Math.cos(t / 1100 + node.phase) * 0.08 * speed;
        // Wrap
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;
      });
      // Draw lines
      ctx.save();
      ctx.shadowColor = '#00fff7';
      ctx.shadowBlur = 8;
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = '#00fff7';
      ctx.lineWidth = 2;
      lines.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      });
      ctx.restore();
      // Draw nodes
      nodes.forEach((node) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.shadowColor = '#00fff7';
        ctx.shadowBlur = 16;
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#00fff7';
        ctx.fill();
        ctx.restore();
      });
      animationFrame = requestAnimationFrame(draw);
    };
    animationFrame = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default CircuitOverlay; 