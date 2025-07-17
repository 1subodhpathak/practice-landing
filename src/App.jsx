import React from 'react';
import { Bell, Users, Grid, Zap, BarChart3 } from 'lucide-react';
import CyberpunkBackground from './components/CyberpunkBackground';
import ParticleField from './components/ParticleField';
import HolographicPanel from './components/HolographicPanel';
import FuturisticButton from './components/FuturisticButton';
import TechOrb from './components/TechOrb';
import SoundManager from './components/SoundManager';
import GlitchText from './components/GlitchText';

function App() {
  const [triggerGlitch, setTriggerGlitch] = React.useState(false);

  React.useEffect(() => {
    // Trigger glitch effect on page load
    const timer = setTimeout(() => {
      setTriggerGlitch(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SoundManager>
      <div className="min-h-screen overflow-hidden relative">
      {/* Cyberpunk Background */}
      <CyberpunkBackground />
      <ParticleField />
      
      {/* Top Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg border border-cyan-400/50">
            <span className="text-white font-bold text-xl">DS</span>
          </div>
          <div className="text-white">
            <div className="text-xl font-bold tracking-wide">DATA</div>
            <div className="text-sm text-cyan-400 -mt-1">Sense</div>
            <div className="text-xs text-gray-400 -mt-1">Let the Data Talk</div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative w-12 h-12 bg-gray-800/50 backdrop-blur-lg rounded-full border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-400/10 transition-all duration-300 group">
            <Bell className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </button>

          {/* Join Community Button */}
          <FuturisticButton icon={Users}>
            Join Community
          </FuturisticButton>
        </div>
      </nav>

      {/* Hero Section - Top Center */}
      <div className="relative z-10 text-center pt-4 mb-12">
        <HolographicPanel className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight">
            Welcome To DataSense
          </h1>
          <p className="text-xl text-gray-300 tracking-wide font-light">
            Empowering Data Enthusiasts to Expertise
          </p>
        </HolographicPanel>
      </div>

      {/* Main Navigation Buttons - Center */}
      <div className="relative z-10 flex items-center justify-center gap-8 mb-16">
        <FuturisticButton icon={Zap}>
          Join Live Quizzes
        </FuturisticButton>
        
        <FuturisticButton icon={Grid} variant="dashboard" />
        
        <FuturisticButton icon={BarChart3}>
          Custom Test
        </FuturisticButton>
      </div>

      {/* Technology Orbs - Only Python and SQL */}
      <div className="relative z-10">
        <TechOrb 
          name="Python" 
          icon="🐍" 
          color="#4dd0e1" 
          position={{ x: 25, y: 75 }} 
          size="large"
        />
        <TechOrb 
          name="SQL" 
          icon="🗃️" 
          color="#00d4aa" 
          position={{ x: 75, y: 70 }} 
          size="large"
        />
      </div>

      {/* Holographic UI Elements */}
      <div className="absolute top-20 left-8 z-10">
        <HolographicPanel className="w-48">
          <div className="text-cyan-400 text-sm font-mono">
            <div className="mb-2">SYSTEM STATUS</div>
            <div className="text-green-400">● ONLINE</div>
            <div className="text-cyan-400">● LEARNING MODE</div>
            <div className="text-yellow-400">● QUIZ READY</div>
          </div>
        </HolographicPanel>
      </div>

      <div className="absolute top-20 right-8 z-10">
        <HolographicPanel className="w-52" glowColor="teal" data-active-users>
          <div className="text-teal-400 text-sm font-mono">
            <GlitchText triggerGlitch={triggerGlitch}>
              <div className="mb-2">ACTIVE USERS</div>
              <div className="text-2xl font-bold text-white mb-1">2,847</div>
              <div className="text-xs text-gray-400">Currently Learning</div>
            </GlitchText>
          </div>
        </HolographicPanel>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <HolographicPanel>
          <div className="flex items-center gap-6 text-sm font-mono text-cyan-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>DATASENSE v2.0</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>AI ASSISTANT ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>LEARNING PROTOCOLS ENABLED</span>
            </div>
          </div>
        </HolographicPanel>
      </div>

      {/* Enhanced Ambient Lighting Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-5">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl"></div>
        
        {/* Bottom Center Glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[400px] bg-teal-400/6 rounded-full blur-3xl"></div>
        
        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/4 rounded-full blur-3xl"></div>
        
        {/* Side Glows */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-teal-400/6 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-400/6 rounded-full blur-2xl"></div>
        
        {/* Light Ray Enhancement */}
        <div className="absolute bottom-0 left-1/4 w-2 h-full bg-gradient-to-t from-cyan-400/20 to-transparent blur-sm"></div>
        <div className="absolute bottom-0 right-1/4 w-2 h-full bg-gradient-to-t from-teal-400/20 to-transparent blur-sm"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-full bg-gradient-to-t from-cyan-400/30 to-transparent blur-sm"></div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
    </SoundManager>
  );
}

export default App;