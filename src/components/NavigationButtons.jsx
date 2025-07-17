import React from 'react';
import { Grid, Zap, BarChart3 } from 'lucide-react';

const NavigationButtons = () => {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Join Live Quizzes Button */}
      <button className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center gap-2">
          <Zap className="w-5 h-5 group-hover:animate-pulse" />
          Join Live Quizzes
        </div>
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
      </button>

      {/* Dashboard Button */}
      <button className="group relative w-16 h-16 bg-gray-900 rounded-full border-2 border-cyan-400 shadow-lg hover:shadow-cyan-400/50 transform hover:scale-110 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        <Grid className="w-8 h-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:rotate-90 transition-transform duration-300" />
        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      </button>

      {/* Custom Test Button */}
      <button className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center gap-2">
          <BarChart3 className="w-5 h-5 group-hover:animate-pulse" />
          Custom Test
        </div>
        <div className="absolute inset-0 bg-white/20 translate-x-[100%] group-hover:translate-x-[-100%] transition-transform duration-700 skew-x-12"></div>
      </button>
    </div>
  );
};

export default NavigationButtons;