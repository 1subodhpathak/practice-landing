import React from 'react';

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.icon
 * @param {string} props.color
 * @param {{x: number, y: number}} props.position
 * @param {'small'|'medium'|'large'} [props.size]
 * @param {function} [props.onClick]
 */
const TechOrb = ({ 
  name, 
  icon, 
  color, 
  position, 
  size = 'medium',
  onClick
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-16 text-xl';
      case 'medium':
        return 'w-20 h-20 text-2xl';
      case 'large':
        return 'w-24 h-24 text-3xl';
      default:
        return 'w-20 h-20 text-2xl';
    }
  };

  return (
    <div
      className="absolute group cursor-pointer transform hover:scale-110 transition-all duration-500"
      data-tech-orb
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        animation: 'float 6s ease-in-out infinite'
      }}
      onClick={onClick}
    >
      {/* Outer glow ring */}
      <div className={`${getSizeClasses()} rounded-full absolute animate-pulse`}>
        <div 
          className="w-full h-full rounded-full border-2 opacity-60"
          style={{ 
            borderColor: color,
            boxShadow: `0 0 30px ${color}40`
          }}
        />
      </div>
      
      {/* Main orb */}
      <div 
        className={
          `${getSizeClasses()} rounded-full relative
          bg-gray-900/80 backdrop-blur-xl border-2
          flex items-center justify-center
          shadow-2xl group-hover:shadow-3xl
          transition-all duration-300`
        }
        style={{ 
          borderColor: color,
          boxShadow: `0 0 20px ${color}30, inset 0 0 20px ${color}10`
        }}
      >
        {/* Inner glow */}
        <div 
          className="absolute inset-2 rounded-full opacity-20"
          style={{ 
            background: `radial-gradient(circle, ${color}40, transparent)`
          }}
        />
        
        {/* Icon */}
        <span className="relative z-10 filter drop-shadow-lg">
          {icon}
        </span>
        
        {/* Holographic scan line */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-white/20 to-transparent h-1"
          style={{ animation: 'orbScan 3s linear infinite' }}
        />
      </div>
      
      {/* Label */}
      <div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                   bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full
                   border border-cyan-400/30 text-xs font-medium text-white
                   opacity-0 group-hover:opacity-100 transition-all duration-300
                   whitespace-nowrap"
      >
        {name}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(-5px) rotate(-2deg); }
        }
        
        @keyframes orbScan {
          0% { top: -2px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TechOrb;