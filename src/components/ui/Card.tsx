import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  onClick?: () => void;
  hover?: boolean;
}

/**
 * Card - Ethereal Archive glass panel
 * Features frosted glass, holographic borders on hover, and subtle glow
 */
const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'default',
  onClick,
  hover = true
}) => {
  const baseClasses = 'rounded-card p-6 transition-all duration-400 ease-quintic';

  const variantClasses = {
    default: 'glass-card',
    glass: 'bg-white/[0.02] backdrop-blur-xl border border-glass-border',
    elevated: 'glass-card shadow-ethereal',
  };

  const hoverClasses = hover ? 'hover:shadow-ethereal-hover hover:border-glass-border-highlight' : '';

  return (
    <motion.div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={hover && !onClick ? undefined : { scale: 1.01 }}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
