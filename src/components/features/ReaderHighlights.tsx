import React from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ReaderHighlights - Ethereal Archive story highlights
 * Features glass avatars with holographic borders and smooth animations
 */
const ReaderHighlights: React.FC = () => {
  const highlights = [
    {
      id: 1,
      name: 'Share Story',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      isCreateStory: true
    },
    {
      id: 2,
      name: 'Alex Santer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 3,
      name: 'Albert Flores',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 4,
      name: 'Annette Black',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 5,
      name: 'Arlene Cooper',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    }
  ];

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-[18px] font-display font-semibold text-text-primary mb-4">
        Reader Highlights
      </h2>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.id}
            className="flex-shrink-0 text-center group cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <div className="relative mb-2">
              {/* Holographic ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-holographic opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

              <img
                src={highlight.avatar}
                alt={highlight.name}
                className="w-16 h-16 rounded-full object-cover relative z-10 border-2 border-glass-border group-hover:border-accent-violet/50 transition-all duration-300 img-ethereal"
              />

              {highlight.isCreateStory && (
                <motion.div
                  className="absolute -bottom-1 -right-1 bg-gradient-holographic rounded-full p-1.5 shadow-glow-sm z-20"
                  whileHover={{ scale: 1.2 }}
                >
                  <Plus className="h-3 w-3 text-white" />
                </motion.div>
              )}
            </div>
            <p className="text-[11px] text-text-secondary font-medium max-w-[64px] truncate group-hover:text-text-primary transition-colors duration-300">
              {highlight.name}
            </p>
          </motion.div>
        ))}

        {/* See More Button */}
        <motion.button
          className="flex-shrink-0 flex items-center justify-center w-16 h-16 glass-button rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="h-5 w-5 text-text-secondary" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReaderHighlights;