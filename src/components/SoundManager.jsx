import React, { useEffect, useState } from 'react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
const SoundManager = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [backgroundGain, setBackgroundGain] = useState(null);

  useEffect(() => {
    // Create audio context for better performance
    let audioContext = null;
    
    const initAudioContext = () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      return audioContext;
    };

    // GAMING TREASURE CHEST OPENING SOUND
    const createTreasureOpenSound = () => {
      const ctx = initAudioContext();
      
      // Create multiple layers for rich treasure sound
      const osc1 = ctx.createOscillator(); // Deep resonance
      const osc2 = ctx.createOscillator(); // Mid harmonics
      const osc3 = ctx.createOscillator(); // High sparkle
      const osc4 = ctx.createOscillator(); // Magical shimmer
      const noise = ctx.createOscillator(); // Texture
      
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      const gain4 = ctx.createGain();
      const noiseGain = ctx.createGain();
      const masterGain = ctx.createGain();
      
      // Create sophisticated filtering for treasure effect
      const lowpass = ctx.createBiquadFilter();
      const bandpass = ctx.createBiquadFilter();
      const highpass = ctx.createBiquadFilter();
      const sparkleFilter = ctx.createBiquadFilter();
      
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(800, ctx.currentTime);
      lowpass.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
      lowpass.Q.setValueAtTime(2, ctx.currentTime);
      
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(600, ctx.currentTime);
      bandpass.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.4);
      bandpass.Q.setValueAtTime(3, ctx.currentTime);
      
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(1000, ctx.currentTime);
      
      sparkleFilter.type = 'peaking';
      sparkleFilter.frequency.setValueAtTime(2400, ctx.currentTime);
      sparkleFilter.Q.setValueAtTime(4, ctx.currentTime);
      sparkleFilter.gain.setValueAtTime(8, ctx.currentTime);
      
      // Connect the treasure sound chain
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);
      osc4.connect(gain4);
      noise.connect(noiseGain);
      
      gain1.connect(lowpass);
      gain2.connect(bandpass);
      gain3.connect(highpass);
      gain4.connect(sparkleFilter);
      noiseGain.connect(bandpass);
      
      lowpass.connect(masterGain);
      bandpass.connect(masterGain);
      highpass.connect(masterGain);
      sparkleFilter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // Treasure chest frequencies - deep to magical
      osc1.frequency.setValueAtTime(120, ctx.currentTime); // Deep chest opening
      osc1.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.5);
      
      osc2.frequency.setValueAtTime(300, ctx.currentTime); // Mid resonance
      osc2.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.4);
      
      osc3.frequency.setValueAtTime(800, ctx.currentTime); // Higher harmonics
      osc3.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
      
      osc4.frequency.setValueAtTime(1600, ctx.currentTime); // Magical sparkle
      osc4.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.6);
      
      noise.frequency.setValueAtTime(100, ctx.currentTime);
      
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc3.type = 'sawtooth';
      osc4.type = 'sine';
      noise.type = 'sawtooth';
      
      // Treasure opening envelope - starts deep, builds to magical
      const attackTime = 0.05;
      const peakTime = 0.15;
      const sustainTime = 0.3;
      const releaseTime = 0.4;
      
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.15, ctx.currentTime + attackTime);
      gain1.gain.setValueAtTime(0.15, ctx.currentTime + peakTime);
      gain1.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + peakTime + sustainTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + peakTime + sustainTime + releaseTime);
      
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.12, ctx.currentTime + attackTime + 0.02);
      gain2.gain.setValueAtTime(0.12, ctx.currentTime + peakTime + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + peakTime + sustainTime + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + peakTime + sustainTime + releaseTime);
      
      gain3.gain.setValueAtTime(0, ctx.currentTime);
      gain3.gain.linearRampToValueAtTime(0.08, ctx.currentTime + attackTime + 0.05);
      gain3.gain.setValueAtTime(0.08, ctx.currentTime + peakTime + 0.1);
      gain3.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + peakTime + sustainTime + 0.15);
      gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + peakTime + sustainTime + releaseTime);
      
      gain4.gain.setValueAtTime(0, ctx.currentTime);
      gain4.gain.linearRampToValueAtTime(0.06, ctx.currentTime + attackTime + 0.1);
      gain4.gain.setValueAtTime(0.06, ctx.currentTime + peakTime + 0.2);
      gain4.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + peakTime + sustainTime + 0.2);
      gain4.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + peakTime + sustainTime + releaseTime + 0.2);
      
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + attackTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + peakTime + sustainTime);
      
      const duration = peakTime + sustainTime + releaseTime + 0.2;
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc3.start(ctx.currentTime);
      osc4.start(ctx.currentTime);
      noise.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + duration);
      osc2.stop(ctx.currentTime + duration);
      osc3.stop(ctx.currentTime + duration);
      osc4.stop(ctx.currentTime + duration);
      noise.stop(ctx.currentTime + duration);
    };

    // SCI-FI DECODING SOUND (for button hover)
    const createDecodingSound = () => {
      const ctx = initAudioContext();
      
      // Create decoding sequence with multiple phases
      const osc1 = ctx.createOscillator(); // Base scanning tone
      const osc2 = ctx.createOscillator(); // Digital processing
      const osc3 = ctx.createOscillator(); // High-freq data stream
      const noise = ctx.createOscillator(); // Digital static
      
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      const noiseGain = ctx.createGain();
      const masterGain = ctx.createGain();
      
      // Sci-fi filtering for decoding effect
      const scanner = ctx.createBiquadFilter();
      const processor = ctx.createBiquadFilter();
      const dataStream = ctx.createBiquadFilter();
      
      scanner.type = 'bandpass';
      scanner.frequency.setValueAtTime(400, ctx.currentTime);
      scanner.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
      scanner.Q.setValueAtTime(5, ctx.currentTime);
      
      processor.type = 'highpass';
      processor.frequency.setValueAtTime(600, ctx.currentTime);
      processor.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
      
      dataStream.type = 'peaking';
      dataStream.frequency.setValueAtTime(1800, ctx.currentTime);
      dataStream.Q.setValueAtTime(3, ctx.currentTime);
      dataStream.gain.setValueAtTime(4, ctx.currentTime);
      
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);
      noise.connect(noiseGain);
      
      gain1.connect(scanner);
      gain2.connect(processor);
      gain3.connect(dataStream);
      noiseGain.connect(processor);
      
      scanner.connect(masterGain);
      processor.connect(masterGain);
      dataStream.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // Decoding frequency sequence
      osc1.frequency.setValueAtTime(300, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(500, ctx.currentTime + 0.1);
      osc1.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.2);
      osc1.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.3);
      
      osc2.frequency.setValueAtTime(800, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.15);
      osc2.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.3);
      
      osc3.frequency.setValueAtTime(1600, ctx.currentTime);
      osc3.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 0.2);
      osc3.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 0.3);
      
      noise.frequency.setValueAtTime(200, ctx.currentTime);
      
      osc1.type = 'square';
      osc2.type = 'sawtooth';
      osc3.type = 'triangle';
      noise.type = 'sawtooth';
      
      // Decoding envelope - scanning pattern
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.02);
      gain1.gain.setValueAtTime(0.04, ctx.currentTime + 0.1);
      gain1.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.2);
      gain1.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.25);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.05);
      gain2.gain.setValueAtTime(0.03, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      gain3.gain.setValueAtTime(0, ctx.currentTime);
      gain3.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.08);
      gain3.gain.setValueAtTime(0.025, ctx.currentTime + 0.2);
      gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.02);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc3.start(ctx.currentTime);
      noise.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
      osc3.stop(ctx.currentTime + 0.3);
      noise.stop(ctx.currentTime + 0.15);
    };

    // ROBOTIC TECH ORB SOUND (for Python/SQL buttons)
    const createRoboticTechSound = () => {
      const ctx = initAudioContext();
      
      // Create robotic processing sound
      const osc1 = ctx.createOscillator(); // Robotic base tone
      const osc2 = ctx.createOscillator(); // Harmonic layer
      const osc3 = ctx.createOscillator(); // Digital modulation
      const modulator = ctx.createOscillator(); // LFO for robotic effect
      const noise = ctx.createOscillator(); // Digital texture
      
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      const modGain = ctx.createGain();
      const noiseGain = ctx.createGain();
      const masterGain = ctx.createGain();
      
      // Robotic filtering
      const roboticFilter = ctx.createBiquadFilter();
      const vocoder = ctx.createBiquadFilter();
      const distortion = ctx.createWaveShaper();
      
      roboticFilter.type = 'bandpass';
      roboticFilter.frequency.setValueAtTime(800, ctx.currentTime);
      roboticFilter.Q.setValueAtTime(8, ctx.currentTime);
      
      vocoder.type = 'peaking';
      vocoder.frequency.setValueAtTime(1200, ctx.currentTime);
      vocoder.Q.setValueAtTime(5, ctx.currentTime);
      vocoder.gain.setValueAtTime(6, ctx.currentTime);
      
      // Create distortion curve for robotic effect
      const samples = 44100;
      const curve = new Float32Array(samples);
      const deg = Math.PI / 180;
      for (let i = 0; i < samples; i++) {
        const x = (i * 2) / samples - 1;
        curve[i] = ((3 + 20) * x * 20 * deg) / (Math.PI + 20 * Math.abs(x));
      }
      distortion.curve = curve;
      distortion.oversample = '4x';
      
      // Connect robotic chain
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);
      modulator.connect(modGain);
      noise.connect(noiseGain);
      
      // Modulation routing
      modGain.connect(osc1.frequency);
      modGain.connect(osc2.frequency);
      
      gain1.connect(roboticFilter);
      gain2.connect(vocoder);
      gain3.connect(distortion);
      noiseGain.connect(roboticFilter);
      
      roboticFilter.connect(masterGain);
      vocoder.connect(masterGain);
      distortion.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // Robotic frequencies
      osc1.frequency.setValueAtTime(200, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.2);
      osc1.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.4);
      
      osc2.frequency.setValueAtTime(600, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3);
      
      osc3.frequency.setValueAtTime(1000, ctx.currentTime);
      osc3.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.4);
      
      modulator.frequency.setValueAtTime(8, ctx.currentTime); // 8Hz modulation for robotic effect
      noise.frequency.setValueAtTime(150, ctx.currentTime);
      
      osc1.type = 'square';
      osc2.type = 'sawtooth';
      osc3.type = 'triangle';
      modulator.type = 'sine';
      noise.type = 'sawtooth';
      
      // Robotic envelope
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain1.gain.setValueAtTime(0.08, ctx.currentTime + 0.2);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.08);
      gain2.gain.setValueAtTime(0.06, ctx.currentTime + 0.25);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      gain3.gain.setValueAtTime(0, ctx.currentTime);
      gain3.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
      gain3.gain.setValueAtTime(0.04, ctx.currentTime + 0.3);
      gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      modGain.gain.setValueAtTime(20, ctx.currentTime); // Modulation depth
      
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc3.start(ctx.currentTime);
      modulator.start(ctx.currentTime);
      noise.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 0.4);
      osc2.stop(ctx.currentTime + 0.4);
      osc3.stop(ctx.currentTime + 0.4);
      modulator.stop(ctx.currentTime + 0.4);
      noise.stop(ctx.currentTime + 0.2);
    };

    // ROBOTIC GLITCH SOUND (for Active Users panel)
    const createRoboticGlitchSound = () => {
      const ctx = initAudioContext();
      
      // Create complex robotic glitch sequence
      const osc1 = ctx.createOscillator(); // Base robotic tone
      const osc2 = ctx.createOscillator(); // Glitch layer
      const osc3 = ctx.createOscillator(); // Digital corruption
      const osc4 = ctx.createOscillator(); // High-freq static
      const modulator1 = ctx.createOscillator(); // Primary modulation
      const modulator2 = ctx.createOscillator(); // Secondary modulation
      const noise = ctx.createOscillator(); // Glitch texture
      
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      const gain4 = ctx.createGain();
      const modGain1 = ctx.createGain();
      const modGain2 = ctx.createGain();
      const noiseGain = ctx.createGain();
      const masterGain = ctx.createGain();
      
      // Complex filtering for glitch effect
      const glitchFilter = ctx.createBiquadFilter();
      const roboticVocoder = ctx.createBiquadFilter();
      const digitalCrusher = ctx.createBiquadFilter();
      const staticFilter = ctx.createBiquadFilter();
      
      glitchFilter.type = 'bandpass';
      glitchFilter.frequency.setValueAtTime(600, ctx.currentTime);
      glitchFilter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.3);
      glitchFilter.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.6);
      glitchFilter.Q.setValueAtTime(10, ctx.currentTime);
      
      roboticVocoder.type = 'peaking';
      roboticVocoder.frequency.setValueAtTime(800, ctx.currentTime);
      roboticVocoder.Q.setValueAtTime(6, ctx.currentTime);
      roboticVocoder.gain.setValueAtTime(8, ctx.currentTime);
      
      digitalCrusher.type = 'highpass';
      digitalCrusher.frequency.setValueAtTime(1000, ctx.currentTime);
      digitalCrusher.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 0.4);
      
      staticFilter.type = 'bandpass';
      staticFilter.frequency.setValueAtTime(3000, ctx.currentTime);
      staticFilter.Q.setValueAtTime(4, ctx.currentTime);
      
      // Connect complex routing
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);
      osc4.connect(gain4);
      modulator1.connect(modGain1);
      modulator2.connect(modGain2);
      noise.connect(noiseGain);
      
      // Modulation routing for robotic effect
      modGain1.connect(osc1.frequency);
      modGain1.connect(osc2.frequency);
      modGain2.connect(osc3.frequency);
      modGain2.connect(glitchFilter.frequency);
      
      gain1.connect(glitchFilter);
      gain2.connect(roboticVocoder);
      gain3.connect(digitalCrusher);
      gain4.connect(staticFilter);
      noiseGain.connect(glitchFilter);
      
      glitchFilter.connect(masterGain);
      roboticVocoder.connect(masterGain);
      digitalCrusher.connect(masterGain);
      staticFilter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // Glitch frequency sequence
      osc1.frequency.setValueAtTime(150, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.1);
      osc1.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.2);
      osc1.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.4);
      osc1.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.6);
      
      osc2.frequency.setValueAtTime(500, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.2);
      osc2.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.4);
      osc2.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.6);
      
      osc3.frequency.setValueAtTime(1200, ctx.currentTime);
      osc3.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.3);
      osc3.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.6);
      
      osc4.frequency.setValueAtTime(2400, ctx.currentTime);
      osc4.frequency.linearRampToValueAtTime(3200, ctx.currentTime + 0.2);
      osc4.frequency.linearRampToValueAtTime(2800, ctx.currentTime + 0.6);
      
      modulator1.frequency.setValueAtTime(12, ctx.currentTime); // Fast robotic modulation
      modulator2.frequency.setValueAtTime(6, ctx.currentTime); // Slower glitch modulation
      noise.frequency.setValueAtTime(100, ctx.currentTime);
      
      osc1.type = 'square';
      osc2.type = 'sawtooth';
      osc3.type = 'triangle';
      osc4.type = 'square';
      modulator1.type = 'sine';
      modulator2.type = 'triangle';
      noise.type = 'sawtooth';
      
      // Complex glitch envelope
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain1.gain.setValueAtTime(0.1, ctx.currentTime + 0.15);
      gain1.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.25);
      gain1.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.35);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.08);
      gain2.gain.setValueAtTime(0.08, ctx.currentTime + 0.2);
      gain2.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.3);
      gain2.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.4);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      gain3.gain.setValueAtTime(0, ctx.currentTime);
      gain3.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
      gain3.gain.setValueAtTime(0.06, ctx.currentTime + 0.25);
      gain3.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.35);
      gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      gain4.gain.setValueAtTime(0, ctx.currentTime);
      gain4.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.12);
      gain4.gain.setValueAtTime(0.04, ctx.currentTime + 0.3);
      gain4.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      modGain1.gain.setValueAtTime(30, ctx.currentTime); // Strong modulation
      modGain2.gain.setValueAtTime(50, ctx.currentTime); // Very strong glitch modulation
      
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc3.start(ctx.currentTime);
      osc4.start(ctx.currentTime);
      modulator1.start(ctx.currentTime);
      modulator2.start(ctx.currentTime);
      noise.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 0.6);
      osc2.stop(ctx.currentTime + 0.6);
      osc3.stop(ctx.currentTime + 0.6);
      osc4.stop(ctx.currentTime + 0.6);
      modulator1.stop(ctx.currentTime + 0.6);
      modulator2.stop(ctx.currentTime + 0.6);
      noise.stop(ctx.currentTime + 0.3);
    };

    // ENHANCED ROBOTIC AMBIENT BACKGROUND SOUND
    const createRoboticAmbientBackground = () => {
      if (isMuted) return;
      
      const ctx = initAudioContext();
      
      // Create robotic ambient layers
      const roboticDrone1 = ctx.createOscillator(); // Deep robotic hum
      const roboticDrone2 = ctx.createOscillator(); // Mid-range processing
      const roboticDrone3 = ctx.createOscillator(); // High-freq data flow
      const mechanicalPulse = ctx.createOscillator(); // Mechanical heartbeat
      const digitalStatic = ctx.createOscillator(); // Digital background
      const modulator = ctx.createOscillator(); // LFO for robotic modulation
      
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      const pulseGain = ctx.createGain();
      const staticGain = ctx.createGain();
      const modGain = ctx.createGain();
      const masterGain = ctx.createGain();
      
      // Store master gain for mute control
      setBackgroundGain(masterGain);
      
      // Robotic filtering
      const roboticFilter1 = ctx.createBiquadFilter();
      const roboticFilter2 = ctx.createBiquadFilter();
      const mechanicalFilter = ctx.createBiquadFilter();
      const staticFilter = ctx.createBiquadFilter();
      
      roboticFilter1.type = 'lowpass';
      roboticFilter1.frequency.setValueAtTime(200, ctx.currentTime);
      roboticFilter1.Q.setValueAtTime(2, ctx.currentTime);
      
      roboticFilter2.type = 'bandpass';
      roboticFilter2.frequency.setValueAtTime(400, ctx.currentTime);
      roboticFilter2.Q.setValueAtTime(3, ctx.currentTime);
      
      mechanicalFilter.type = 'peaking';
      mechanicalFilter.frequency.setValueAtTime(80, ctx.currentTime);
      mechanicalFilter.Q.setValueAtTime(4, ctx.currentTime);
      mechanicalFilter.gain.setValueAtTime(6, ctx.currentTime);
      
      staticFilter.type = 'highpass';
      staticFilter.frequency.setValueAtTime(800, ctx.currentTime);
      
      roboticDrone1.connect(gain1);
      roboticDrone2.connect(gain2);
      roboticDrone3.connect(gain3);
      mechanicalPulse.connect(pulseGain);
      digitalStatic.connect(staticGain);
      modulator.connect(modGain);
      
      // Modulation routing for robotic effect
      modGain.connect(roboticDrone1.frequency);
      modGain.connect(roboticDrone2.frequency);
      
      gain1.connect(roboticFilter1);
      gain2.connect(roboticFilter2);
      gain3.connect(staticFilter);
      pulseGain.connect(mechanicalFilter);
      staticGain.connect(staticFilter);
      
      roboticFilter1.connect(masterGain);
      roboticFilter2.connect(masterGain);
      mechanicalFilter.connect(masterGain);
      staticFilter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // Robotic ambient frequencies
      roboticDrone1.frequency.setValueAtTime(45, ctx.currentTime); // Deep robotic hum
      roboticDrone2.frequency.setValueAtTime(90, ctx.currentTime); // Harmonic
      roboticDrone3.frequency.setValueAtTime(135, ctx.currentTime); // Higher harmonic
      mechanicalPulse.frequency.setValueAtTime(1.5, ctx.currentTime); // Slow mechanical pulse
      digitalStatic.frequency.setValueAtTime(60, ctx.currentTime); // Background texture
      modulator.frequency.setValueAtTime(0.3, ctx.currentTime); // Very slow robotic modulation
      
      roboticDrone1.type = 'square'; // More robotic than sine
      roboticDrone2.type = 'sawtooth'; // Harsh robotic texture
      roboticDrone3.type = 'triangle';
      mechanicalPulse.type = 'square'; // Mechanical pulse
      digitalStatic.type = 'sawtooth';
      modulator.type = 'sine';
      
      // Robotic ambient levels
      gain1.gain.setValueAtTime(0.025, ctx.currentTime); // Slightly higher for robotic feel
      gain2.gain.setValueAtTime(0.02, ctx.currentTime);
      gain3.gain.setValueAtTime(0.015, ctx.currentTime);
      pulseGain.gain.setValueAtTime(0.008, ctx.currentTime); // Subtle mechanical heartbeat
      staticGain.gain.setValueAtTime(0.005, ctx.currentTime);
      modGain.gain.setValueAtTime(3, ctx.currentTime); // Subtle modulation depth
      
      masterGain.gain.setValueAtTime(isMuted ? 0 : 1, ctx.currentTime);
      
      roboticDrone1.start(ctx.currentTime);
      roboticDrone2.start(ctx.currentTime);
      roboticDrone3.start(ctx.currentTime);
      mechanicalPulse.start(ctx.currentTime);
      digitalStatic.start(ctx.currentTime);
      modulator.start(ctx.currentTime);
      
      // Keep running indefinitely
      return () => {
        roboticDrone1.stop();
        roboticDrone2.stop();
        roboticDrone3.stop();
        mechanicalPulse.stop();
        digitalStatic.stop();
        modulator.stop();
      };
    };

    // Add event listeners for sound effects
    const addSoundToElements = () => {
      // Regular button click sounds - treasure opening for most buttons
      document.querySelectorAll('button').forEach((button) => {
        // Check if it's a tech orb button (Python/SQL)
        const isTechOrb = button.closest('[data-tech-orb]');
        
        if (isTechOrb) {
          // Special robotic sounds for tech orbs
          button.addEventListener('click', createTreasureOpenSound); // Still treasure for click
          button.addEventListener('mouseenter', createRoboticTechSound); // Robotic hover
        } else {
          // Regular buttons
          button.addEventListener('click', createTreasureOpenSound);
          button.addEventListener('mouseenter', createDecodingSound);
        }
      });

      // Trigger glitch effect on Active Users panel on page load
      const activeUsersPanel = document.querySelector('[data-active-users]');
      if (activeUsersPanel) {
        // Delay the effect slightly after page load
        setTimeout(() => {
          createRoboticGlitchSound();
        }, 1000);
      }
    };

    // Initialize sounds after a short delay to ensure DOM is ready
    const timer = setTimeout(addSoundToElements, 100);

    // Start robotic ambient background
    const stopAmbient = createRoboticAmbientBackground();

    // Re-add sounds when new elements are added
    const observer = new MutationObserver(addSoundToElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (stopAmbient) stopAmbient();
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [isMuted]);

  // Handle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (backgroundGain) {
      backgroundGain.gain.setValueAtTime(isMuted ? 1 : 0, backgroundGain.context.currentTime);
    }
  };

  return (
    <>
      {children}
      
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gray-900/80 backdrop-blur-xl border border-cyan-400/50 rounded-full flex items-center justify-center hover:bg-cyan-400/10 transition-all duration-300 group"
        title={isMuted ? 'Unmute Background' : 'Mute Background'}
      >
        {isMuted ? (
          <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      </button>
    </>
  );
};

export default SoundManager;