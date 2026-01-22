import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Vote } from 'lucide-react';

/**
 * GoodreadsAwards - Ethereal Archive awards widget (renamed to PenPal Awards)
 * Features holographic gradient with animated decorative elements
 */
const GoodreadsAwards: React.FC = () => {
  return (
    <motion.div
      className="glass-card bg-gradient-to-br from-accent-violet/30 via-graphite to-accent-fuchsia/20 p-6 relative overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Animated glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-accent-fuchsia/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-accent-gold/40 rounded-full animate-float blur-[1px]" />
      <div className="absolute top-12 right-8 w-2 h-2 bg-accent-violet/40 rounded-full animate-float-slow" />
      <div className="absolute bottom-8 right-6 w-2 h-2 bg-accent-fuchsia/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-accent-gold" />
          <span className="text-[12px] font-medium text-text-secondary tracking-wider uppercase">
            Readers' Choice Awards
          </span>
        </div>

        {/* Branding */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent-violet" />
            <span className="text-[18px] font-display font-bold text-gradient-holographic">
              PenPal
            </span>
          </div>
          <div className="text-[11px] text-text-tertiary font-medium tracking-widest uppercase">
            Choice Awards
          </div>
          <motion.div
            className="text-display-md font-display font-bold text-text-primary leading-none mt-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            2024
          </motion.div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-[14px] font-medium text-text-primary leading-tight">
            Announcing the Readers'
          </p>
          <p className="text-[14px] font-medium text-text-primary leading-tight">
            Favorite Books of 2024
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          className="glass-button px-4 py-2 rounded-element text-[12px] font-medium mb-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See The Winners
        </motion.button>

        {/* Stats */}
        <div className="flex items-center gap-1 text-[11px] text-text-tertiary">
          <Vote className="w-3 h-3" />
          <span>6,261,936 Votes Cast</span>
        </div>
      </div>

      {/* Corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
    </motion.div>
  );
};

export default GoodreadsAwards;