import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Loading - Ethereal Archive loading spinner
 * Features violet glow and pulsing animation
 */
const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <motion.div
        className={clsx(
          sizeClasses[size],
          'rounded-full border-2 border-glass-border border-t-accent-violet'
        )}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear'
        }}
      />
      <motion.p
        className="mt-4 text-text-secondary text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>

      {/* Subtle glow effect */}
      <div className="absolute w-32 h-32 bg-accent-violet/10 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default Loading;
