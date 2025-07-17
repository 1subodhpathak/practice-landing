/*
  # Professional Cyberpunk Background with Interactive Buildings

  This component creates a sophisticated cyberpunk cityscape with:
  1. Interactive buildings with hover effects
  2. Professional subtle animations
  3. Grid light rays with smooth movement
  4. Clean, gaming-inspired aesthetics
*/

import React, { useEffect, useRef, useState } from 'react';

const CyberpunkBackground = () => {
  const canvasRef = useRef(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);

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

    let animationFrame;
    let time = 0;

    // Grid light rays state
    const gridLightRays = [];

    // Building definitions
    const buildings = [
      { x: 50, width: 80, height: 300, type: 'tower' },
      { x: 150, width: 60, height: 250, type: 'spire' },
      { x: 230, width: 100, height: 350, type: 'complex' },
      { x: canvas.width - 250, width: 90, height: 320, type: 'tower' },
      { x: canvas.width - 150, width: 70, height: 280, type: 'spire' },
      { x: canvas.width - 80, width: 80, height: 300, type: 'complex' },
    ];

    // Mouse interaction
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      let foundBuilding = null;
      buildings.forEach((building, index) => {
        const baseY = canvas.height - building.height;
        if (mouseX >= building.x && mouseX <= building.x + building.width &&
            mouseY >= baseY && mouseY <= canvas.height) {
          foundBuilding = index;
        }
      });

      setHoveredBuilding(foundBuilding);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const drawGrid = () => {
      const gridSize = 50;
      const perspective = 0.8;
      const vanishingPointY = canvas.height * 0.7;
      
      ctx.strokeStyle = 'rgba(0, 212, 170, 0.3)';
      ctx.lineWidth = 1;
      
      const horizontalLines = [];
      const verticalLines = [];
      
      // Horizontal lines (perspective)
      for (let i = 0; i < 20; i++) {
        const y = vanishingPointY + (i * gridSize * perspective);
        if (y > canvas.height) break;
        
        const width = canvas.width * (1 - (i * 0.05));
        const x = (canvas.width - width) / 2;
        
        horizontalLines.push({ startX: x, endX: x + width, y });
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
      }
      
      // Vertical lines (perspective)
      const numVerticalLines = 30;
      for (let i = 0; i < numVerticalLines; i++) {
        const x = (canvas.width / numVerticalLines) * i;
        const topY = vanishingPointY;
        const bottomY = canvas.height;
        
        verticalLines.push({ x, startY: topY, endY: bottomY });
        
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.stroke();
      }

      // Create new light rays randomly (less frequent)
      if (Math.random() < 0.015) { // 1.5% chance per frame
        const isHorizontal = Math.random() > 0.5;
        
        if (isHorizontal && horizontalLines.length > 0) {
          const line = horizontalLines[Math.floor(Math.random() * horizontalLines.length)];
          gridLightRays.push({
            startX: line.startX,
            startY: line.y,
            endX: line.endX,
            endY: line.y,
            progress: 0,
            duration: 2500 + Math.random() * 1500, // 2.5-4 seconds
            startTime: time,
            isHorizontal: true
          });
        } else if (!isHorizontal && verticalLines.length > 0) {
          const line = verticalLines[Math.floor(Math.random() * verticalLines.length)];
          gridLightRays.push({
            startX: line.x,
            startY: line.startY,
            endX: line.x,
            endY: line.endY,
            progress: 0,
            duration: 2500 + Math.random() * 1500, // 2.5-4 seconds
            startTime: time,
            isHorizontal: false
          });
        }
      }

      // Draw and update light rays
      gridLightRays.forEach((ray, index) => {
        const elapsed = time - ray.startTime;
        const normalizedTime = Math.min(elapsed / ray.duration, 1);
        
        // Smooth ease-in-out function
        const easeInOut = normalizedTime < 0.5 
          ? 2 * normalizedTime * normalizedTime 
          : 1 - Math.pow(-2 * normalizedTime + 2, 3) / 2;
        
        ray.progress = easeInOut;
        
        if (ray.progress >= 1) {
          gridLightRays.splice(index, 1);
          return;
        }
        
        // Calculate current position
        const currentX = ray.startX + (ray.endX - ray.startX) * ray.progress;
        const currentY = ray.startY + (ray.endY - ray.startY) * ray.progress;
        
        // Draw light ray with trail effect
        const trailLength = 60;
        const gradient = ctx.createLinearGradient(
          currentX - (ray.isHorizontal ? trailLength : 0),
          currentY - (ray.isHorizontal ? 0 : trailLength),
          currentX,
          currentY
        );
        
        gradient.addColorStop(0, 'rgba(0, 212, 170, 0)');
        gradient.addColorStop(0.3, 'rgba(77, 208, 225, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 212, 170, 0.9)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        if (ray.isHorizontal) {
          ctx.moveTo(Math.max(currentX - trailLength, ray.startX), currentY);
          ctx.lineTo(currentX, currentY);
        } else {
          ctx.moveTo(currentX, Math.max(currentY - trailLength, ray.startY));
          ctx.lineTo(currentX, currentY);
        }
        ctx.stroke();
        
        // Add glow effect at the tip
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 170, 0.9)';
        ctx.fill();
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(77, 208, 225, 0.4)';
        ctx.fill();
      });
    };

    const drawBuildings = () => {
      buildings.forEach((building, buildingIndex) => {
        const baseY = canvas.height - building.height;
        const isHovered = hoveredBuilding === buildingIndex;
        
        // Building silhouette with enhanced gradient for hover
        const gradient = ctx.createLinearGradient(
          building.x, baseY, 
          building.x + building.width, baseY + building.height
        );
        
        if (isHovered) {
          gradient.addColorStop(0, 'rgba(30, 50, 90, 0.95)');
          gradient.addColorStop(0.5, 'rgba(40, 60, 100, 0.9)');
          gradient.addColorStop(1, 'rgba(25, 45, 80, 0.95)');
        } else {
          gradient.addColorStop(0, 'rgba(20, 30, 60, 0.9)');
          gradient.addColorStop(0.5, 'rgba(30, 40, 80, 0.8)');
          gradient.addColorStop(1, 'rgba(15, 25, 50, 0.9)');
        }
        
        ctx.fillStyle = gradient;
        const buildingElement = ctx.canvas;
        buildingElement.setAttribute('data-building', 'true');
        ctx.fillRect(building.x, baseY, building.width, building.height);
        
        // Enhanced building outline for hover
        ctx.strokeStyle = isHovered ? 'rgba(0, 212, 170, 0.8)' : 'rgba(0, 212, 170, 0.4)';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.strokeRect(building.x, baseY, building.width, building.height);
        
        // Professional window pattern
        const windowRows = Math.floor(building.height / 25);
        const windowCols = Math.floor(building.width / 15);
        
        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowCols; col++) {
            const shouldHaveWindow = (row + col) % 3 === 0 || (row % 2 === 0 && col % 2 === 1);
            
            if (shouldHaveWindow) {
              const windowX = building.x + col * 15 + 3;
              const windowY = baseY + row * 25 + 3;
              const windowWidth = 8;
              const windowHeight = 18;
              
              // Enhanced window glow on hover
              const windowOpacity = isHovered ? 0.7 : 0.4;
              ctx.fillStyle = `rgba(0, 212, 170, ${windowOpacity})`;
              ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
              
              ctx.strokeStyle = `rgba(77, 208, 225, ${windowOpacity + 0.2})`;
              ctx.lineWidth = 0.5;
              ctx.strokeRect(windowX, windowY, windowWidth, windowHeight);
            }
          }
        }

        // Hover effects
        if (isHovered) {
          // Holographic outline
          ctx.strokeStyle = 'rgba(0, 212, 170, 0.6)';
          ctx.lineWidth = 2;
          ctx.strokeRect(building.x - 3, baseY - 3, building.width + 6, building.height + 6);
          
          // Corner accents
          const cornerSize = 15;
          ctx.strokeStyle = 'rgba(77, 208, 225, 0.8)';
          ctx.lineWidth = 3;
          
          // Top corners
          ctx.beginPath();
          ctx.moveTo(building.x - 3, baseY - 3 + cornerSize);
          ctx.lineTo(building.x - 3, baseY - 3);
          ctx.lineTo(building.x - 3 + cornerSize, baseY - 3);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(building.x + building.width + 3 - cornerSize, baseY - 3);
          ctx.lineTo(building.x + building.width + 3, baseY - 3);
          ctx.lineTo(building.x + building.width + 3, baseY - 3 + cornerSize);
          ctx.stroke();
          
          // Bottom corners
          ctx.beginPath();
          ctx.moveTo(building.x - 3, baseY + building.height + 3 - cornerSize);
          ctx.lineTo(building.x - 3, baseY + building.height + 3);
          ctx.lineTo(building.x - 3 + cornerSize, baseY + building.height + 3);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.moveTo(building.x + building.width + 3 - cornerSize, baseY + building.height + 3);
          ctx.lineTo(building.x + building.width + 3, baseY + building.height + 3);
          ctx.lineTo(building.x + building.width + 3, baseY + building.height + 3 - cornerSize);
          ctx.stroke();

          // Scanning effect
          const scanProgress = (time * 0.002) % 1;
          const scanY = baseY + building.height * scanProgress;
          
          const scanGradient = ctx.createLinearGradient(building.x, scanY, building.x + building.width, scanY);
          scanGradient.addColorStop(0, 'rgba(0, 212, 170, 0)');
          scanGradient.addColorStop(0.5, 'rgba(0, 212, 170, 0.6)');
          scanGradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
          
          ctx.fillStyle = scanGradient;
          ctx.fillRect(building.x, scanY - 2, building.width, 4);
        }

        // Subtle ambient animation for non-hovered buildings
        if (!isHovered) {
          const ambientCycle = (time * 0.0005 + buildingIndex * 0.7) % 4;
          
          if (ambientCycle < 1) {
            // Subtle glow pulse
            const pulseIntensity = Math.sin(ambientCycle * Math.PI) * 0.2;
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.2 + pulseIntensity})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(building.x, baseY, building.width, building.height);
          }
        }
        
        // Building top accent
        if (building.type === 'spire') {
          const spireGlow = 0.6 + Math.sin(time * 0.003) * 0.2;
          ctx.fillStyle = `rgba(0, 212, 170, ${spireGlow})`;
          ctx.fillRect(building.x + building.width/2 - 2, baseY - 20, 4, 20);
          
          ctx.beginPath();
          ctx.arc(building.x + building.width/2, baseY - 20, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 170, ${spireGlow})`;
          ctx.fill();
        }
      });
    };

    const drawLightRays = () => {
      const rayCount = 8;
      
      for (let i = 0; i < rayCount; i++) {
        const x = (canvas.width / rayCount) * i + (canvas.width / rayCount) / 2;
        const baseY = canvas.height;
        const topY = canvas.height * 0.3;
        
        const intensity = (Math.sin(time * 0.001 + i * 0.5) + 1) / 2;
        const opacity = 0.08 + intensity * 0.15;
        
        const rayGradient = ctx.createLinearGradient(x, baseY, x, topY);
        rayGradient.addColorStop(0, `rgba(0, 212, 170, ${opacity})`);
        rayGradient.addColorStop(0.5, `rgba(77, 208, 225, ${opacity * 0.7})`);
        rayGradient.addColorStop(1, 'rgba(0, 212, 170, 0)');
        
        ctx.fillStyle = rayGradient;
        
        ctx.beginPath();
        ctx.moveTo(x - 1.5, baseY);
        ctx.lineTo(x + 1.5, baseY);
        ctx.lineTo(x + 1, topY);
        ctx.lineTo(x - 1, topY);
        ctx.closePath();
        ctx.fill();
      }
    };

    const drawFloatingElements = () => {
      const elements = 8;
      for (let i = 0; i < elements; i++) {
        const x = (canvas.width / elements) * i + Math.sin(time * 0.0008 + i) * 20;
        const y = 100 + Math.cos(time * 0.0005 + i * 0.7) * 30;
        const size = 0.8 + Math.sin(time * 0.0008 + i) * 0.3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${0.3 + Math.sin(time * 0.0008 + i) * 0.2})`;
        ctx.fill();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Professional gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.3, '#1a1a2e');
      gradient.addColorStop(0.7, '#16213e');
      gradient.addColorStop(1, '#0f1419');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawLightRays();
      drawBuildings();
      drawGrid();
      drawFloatingElements();
      
      time += 16; // Approximately 60fps timing
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [hoveredBuilding]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 cursor-crosshair"
    />
  );
};

export default CyberpunkBackground;