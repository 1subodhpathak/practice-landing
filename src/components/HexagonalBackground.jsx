import React, { useEffect, useRef } from 'react';

const HexagonalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Hexagon parameters
    const hexSize = 40;
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    const vertDistance = hexHeight * 0.75;
    const horizDistance = hexWidth;

    // Animation parameters
    let animationFrame;
    let time = 0;

    const drawHexagon = (x, y, size, opacity) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hexX = x + size * Math.cos(angle);
        const hexY = y + size * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(hexX, hexY);
        } else {
          ctx.lineTo(hexX, hexY);
        }
      }
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
      gradient.addColorStop(0, `rgba(0, 212, 170, ${opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(77, 208, 225, ${opacity * 0.6})`);
      
      ctx.strokeStyle = `rgba(0, 212, 170, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      if (opacity > 0.3) {
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;
      
      const cols = Math.ceil(canvas.width / horizDistance) + 2;
      const rows = Math.ceil(canvas.height / vertDistance) + 2;
      
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * horizDistance + (row % 2) * (horizDistance / 2);
          const y = row * vertDistance;
          
          // Create wave effect
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(time + distance * 0.01) * 0.5 + 0.5;
          const opacity = Math.max(0.1, wave * 0.8);
          
          drawHexagon(x, y, hexSize * (0.8 + wave * 0.2), opacity);
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
    />
  );
};

export default HexagonalBackground;