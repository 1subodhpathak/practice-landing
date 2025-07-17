import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {React.ComponentType} [props.icon]
 * @param {'primary'|'secondary'|'dashboard'} [props.variant]
 * @param {function} [props.onClick]
 * @param {string} [props.className]
 */
const FuturisticButton = ({
  children,
  icon: Icon,
  variant = 'primary',
  onClick,
  className = ''
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-cyan-500/50';
      case 'secondary':
        return 'bg-gray-900/50 border-2 border-cyan-400/50 text-cyan-400 shadow-cyan-400/30';
      case 'dashboard':
        return 'bg-gray-900/70 border-2 border-cyan-400/60 text-cyan-400 shadow-cyan-400/40 w-16 h-16 rounded-full';
      default:
        return 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-cyan-500/50';
    }
  };

  return (
    <button
      onClick={onClick}
      className={
        `group relative overflow-hidden backdrop-blur-xl
        ${variant === 'dashboard' ? 'rounded-full' : 'rounded-lg px-8 py-3'}
        ${getVariantStyles()}
        font-semibold text-lg shadow-lg hover:shadow-xl
        transform hover:scale-105 transition-all duration-300
        ${className}`
      }
    >
      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Scanning effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
        style={{ transform: 'skewX(-12deg)' }}
      />
      
      {/* Content */}
      <div className={`relative flex items-center ${variant === 'dashboard' ? 'justify-center' : 'gap-2'}`}>
        {Icon && <Icon className={`${variant === 'dashboard' ? 'w-8 h-8' : 'w-5 h-5'} group-hover:animate-pulse`} />}
        {variant !== 'dashboard' && children}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </button>
  );
};

export default FuturisticButton;