import React from 'react';
import { Bell, Users, Grid, Zap, BarChart3 } from 'lucide-react';
import CyberpunkBackground from './components/CyberpunkBackground';
import ParticleField from './components/ParticleField';
import HolographicPanel from './components/HolographicPanel';
import FuturisticButton from './components/FuturisticButton';
import TechOrb from './components/TechOrb';
import SoundManager from './components/SoundManager';
import GlitchText from './components/GlitchText';
import Preloader from './components/Preloader';
import logo from './assets/images/logo.png';
import pythonLogo from './assets/images/python.png';
import sqlLogo from './assets/images/sql.png';
import FuturisticGlitchPopup from './components/FuturisticGlitchPopup';
import { useLocation } from 'react-router-dom';
import buttonClickSound from './assets/mp3/button-click.mp3';
// import CircuitOverlay from './components/CircuitOverlay';

function App() {
  const [triggerGlitch, setTriggerGlitch] = React.useState(false);
  const [preloaderDone, setPreloaderDone] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupBadge, setPopupBadge] = React.useState(null); // 'Python' | 'SQL' | null
  const location = useLocation();
  const buttonClickRef = React.useRef(null);

  // Building definitions (move from CyberpunkBackground)
  const buildings = [
    { x: 0, width: 80, height: 300, type: 'tower' },
    { x: 90, width: 60, height: 250, type: 'spire' },
    { x: 170, width: 100, height: 350, type: 'complex' },
    { x: window.innerWidth - 250, width: 90, height: 320, type: 'tower' },
    { x: window.innerWidth - 150, width: 70, height: 280, type: 'spire' },
    { x: window.innerWidth - 80, width: 80, height: 300, type: 'complex' },
  ];
  const [hoveredBuilding, setHoveredBuilding] = React.useState(null);

  React.useEffect(() => {
    // Trigger glitch effect on page load
    const timer = setTimeout(() => {
      setTriggerGlitch(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTechOrbClick = (badge) => {
    if (buttonClickRef.current) {
      buttonClickRef.current.currentTime = 0;
      buttonClickRef.current.play();
    }
    setTimeout(() => {
      setPopupBadge(badge);
      setPopupOpen(true);
    }, 80); // slight delay for sound
  };

  return (
    <>
      {location.pathname === '/' && !preloaderDone && <Preloader onFinish={() => setPreloaderDone(true)} />}
      {(location.pathname !== '/' || preloaderDone) && (
        <SoundManager>
          <div className="min-h-screen overflow-hidden relative">
            {/* Cyberpunk Background */}
            <CyberpunkBackground buildings={buildings} hoveredBuilding={hoveredBuilding} />
            <ParticleField />
            <div className="hack-scanlines hack-flicker"></div>
            {/* <CircuitOverlay /> */}
            
            {/* Top Navigation */}
            <nav className="relative z-20 flex justify-between items-center pt-6">
              {/* Logo Section */}
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-10 md:h-12 rounded-lg shadow-lg" />
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
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4 leading-tight">
                  DataSense Practice Arnea
                </h1>
                <p className="text-xl text-gray-300 tracking-wide font-light">
                  Empowering Data Enthusiasts to Expertise
                </p>
              </div>
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
              <audio ref={buttonClickRef} src={buttonClickSound} preload="auto" />
              <TechOrb 
                name="Python" 
                icon={<img src={pythonLogo} alt="Python" style={{ height: 64, width: 64 }}/>} 
                color="#4dd0e1" 
                position={{ x: 25, y: 70 }} 
                size="large"
                onClick={() => handleTechOrbClick('Python')}
              />
              <TechOrb 
                name="SQL" 
                icon={<img src={sqlLogo} alt="SQL" style={{ height: 64, width: 64 }}/>} 
                color="#00d4aa" 
                position={{ x: 75, y: 70 }} 
                size="large"
                onClick={() => handleTechOrbClick('SQL')}
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

            {/* Overlay interactive divs for each building */}
            {buildings.map((b, i) => (
              <div
                key={i}
                style={{
                  position: 'fixed',
                  left: b.x,
                  top: `calc(100vh - ${b.height}px)` ,
                  width: b.width,
                  height: b.height,
                  zIndex: 10,
                  background: 'transparent',
                  pointerEvents: 'auto',
                }}
                onMouseEnter={() => setHoveredBuilding(i)}
                onMouseLeave={() => setHoveredBuilding(null)}
              />
            ))}

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
            <FuturisticGlitchPopup 
              open={popupOpen} 
              onClose={() => setPopupOpen(false)} 
              badgeType={popupBadge} 
            />
          </div>
        </SoundManager>
      )}
    </>
  );
}

export default App;