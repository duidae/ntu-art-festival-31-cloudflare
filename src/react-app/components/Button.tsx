import React from 'react';
import { THEME_COLORS } from '@/react-app/constants';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'action';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "px-6 py-3 font-bold transition-all active:translate-y-1 relative group overflow-hidden border-2 border-zinc-900 select-none";
  
  const variants = {
    primary: `text-zinc-900`, 
    secondary: "bg-zinc-900 text-[#e8e8e6] hover:bg-zinc-800",
    ghost: "bg-transparent text-zinc-900 hover:bg-white/50",
    action: "bg-zinc-900 text-[#4dff88] hover:text-white"
  };

  const styles = {
    primary: { backgroundColor: THEME_COLORS.DarkGray },
    secondary: { backgroundColor: THEME_COLORS.Red },
    action: { backgroundColor: THEME_COLORS.Brown },
    ghost: { backgroundColor: THEME_COLORS.Green }
  };

  const hoverClasses = {
    primary: "hover:opacity-30",
    secondary: "hover:opacity-30",
    action: "hover:opacity-30 hover:text-white",
    ghost: "hover:text-white"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      style={styles[variant]}
      className={`${baseStyle} ${variants[variant]} ${hoverClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span className="absolute top-1 right-1 w-1 h-1 bg-current opacity-50"></span>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};
