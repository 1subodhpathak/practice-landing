import React from 'react';
import pythonLogo from '../assets/images/python.png';
import sqlLogo from '../assets/images/sql.png';

const technologies = [
  { name: 'Excel', color: 'from-green-600 to-green-800', icon: '📊' },
  { name: 'Python', color: 'from-blue-600 to-blue-800', icon: <img src={pythonLogo} alt="Python" style={{ height: 28, width: 28 }} /> },
  { name: 'PowerBI', color: 'from-yellow-600 to-yellow-800', icon: '📈' },
  { name: 'SQL', color: 'from-orange-600 to-orange-800', icon: <img src={sqlLogo} alt="SQL" style={{ height: 28, width: 28 }} /> },
  { name: 'Tableau', color: 'from-purple-600 to-purple-800', icon: '📋' },
];

const TechnologyBadges = () => {
  return (
    <div className="flex gap-4">
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          className="group relative transform hover:scale-110 transition-all duration-300 animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Badge Container */}
          <div className={`relative w-16 h-16 bg-gradient-to-br ${tech.color} rounded-full border-2 border-cyan-400/50 shadow-lg hover:shadow-xl hover:shadow-cyan-400/30 cursor-pointer overflow-hidden`}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            
            {/* Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl group-hover:scale-110 transition-transform duration-300">
              {tech.icon}
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 border-2 border-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
          </div>

          {/* Label */}
          <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-cyan-400 px-2 py-1 rounded-full text-xs font-medium border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
            {tech.name}
          </div>
        </div>
      ))}
    </div>
  );
};

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default TechnologyBadges;