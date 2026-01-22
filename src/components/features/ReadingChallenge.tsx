import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadingChallengeProps {
  year?: number;
  booksCompleted?: number;
  goal?: number;
  onViewChallenge?: () => void;
}

/**
 * ReadingChallenge - Ethereal Archive constellation streak widget
 * Features holographic gradients, animated stars, and glass styling
 */
const ReadingChallenge: React.FC<ReadingChallengeProps> = ({
  year = 2025,
  booksCompleted = 12,
  goal = 50,
  onViewChallenge
}) => {
  const percentage = Math.round((booksCompleted / goal) * 100);
  const remaining = goal - booksCompleted;

  // Generate constellation stars based on books completed
  const stars = Array.from({ length: Math.min(booksCompleted, 15) }, (_, i) => ({
    id: i,
    x: 10 + (i % 5) * 18 + Math.random() * 10,
    y: 10 + Math.floor(i / 5) * 25 + Math.random() * 10,
    delay: i * 0.1,
  }));

  return (
    <motion.div 
      className="glass-card bg-gradient-to-br from-accent-violet/20 via-graphite to-accent-fuchsia/10 p-6 relative overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Constellation Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
          {stars.map((star, i) => (
            <motion.circle
              key={star.id}
              cx={star.x}
              cy={star.y}
              r="1"
              fill="#FFD700"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: star.delay, duration: 0.5 }}
            />
          ))}
          {/* Connect stars with lines */}
          {stars.slice(0, -1).map((star, i) => (
            <motion.line
              key={`line-${i}`}
              x1={star.x}
              y1={star.y}
              x2={stars[i + 1]?.x}
              y2={stars[i + 1]?.y}
              stroke="rgba(255, 215, 0, 0.3)"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: star.delay + 0.2, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-accent-gold/50 rounded-full animate-float" />
      <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-accent-violet/50 rounded-full animate-float-slow" />
      <div className="absolute top-1/2 right-8 w-1 h-1 bg-accent-fuchsia/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-display-md font-display text-text-primary leading-none group-hover:text-gradient-holographic transition-all duration-300">
              {year}
            </h2>
            <p className="text-text-secondary text-[12px] font-medium tracking-widest uppercase mt-1">
              Reading Challenge
            </p>
          </div>
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Sparkles className="h-8 w-8 text-accent-gold" />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-[28px] font-display font-bold text-text-primary leading-none">
              {booksCompleted}
            </span>
            <span className="text-text-secondary text-[14px]">Books Read</span>
          </div>
          <p className="text-[12px] text-text-tertiary">
            {remaining} more to complete your {year} goal
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="progress-ethereal h-2 mb-2">
            <motion.div 
              className="progress-ethereal-bar h-2"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-text-tertiary">
            <span>{percentage}% complete</span>
            <span>Goal: {goal} books</span>
          </div>
        </div>

        {/* CTA */}
        <button
          className="text-accent-violet text-[12px] font-medium hover:text-accent-fuchsia transition-all duration-300 flex items-center gap-1 group/btn"
          onClick={onViewChallenge}
        >
          <span>View Challenge</span>
          <motion.span
            className="inline-block"
            whileHover={{ x: 4 }}
          >
            →
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReadingChallenge;