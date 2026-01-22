import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, TrendingUp, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { TextReveal } from '../components/ui';

const ACHIEVEMENT_CATEGORIES = [
  { id: 'all', name: 'All', icon: Trophy },
  { id: 'milestone', name: 'Milestones', icon: Star },
  { id: 'reading', name: 'Reading', icon: Award },
  { id: 'time', name: 'Time-based', icon: TrendingUp }
];

const mockAchievements = [
  { id: 'first_book', name: 'First Chapter', description: 'Complete your first book', icon: '📖', category: 'milestone', rarity: 'common', earned: true, earnedAt: new Date('2024-01-15'), progress: 100, rewards: { xp: 100, title: 'Reader' } },
  { id: 'week_streak', name: 'Week Warrior', description: 'Read for 7 days straight', icon: '🔥', category: 'time', rarity: 'rare', earned: true, earnedAt: new Date('2024-03-20'), progress: 100, rewards: { xp: 500, title: 'Dedicated Reader' } },
  { id: 'bookworm', name: 'Bookworm', description: 'Read 50 books', icon: '🐛', category: 'milestone', rarity: 'rare', earned: false, progress: 58, rewards: { xp: 2500, title: 'Bookworm' } },
  { id: 'bibliophile', name: 'Bibliophile', description: 'Read 100 books', icon: '📚', category: 'milestone', rarity: 'epic', earned: false, progress: 29, rewards: { xp: 5000, title: 'Bibliophile' } },
  { id: 'speed_reader', name: 'Speed Reader', description: 'Finish a book in 24 hours', icon: '⚡', category: 'time', rarity: 'epic', earned: false, progress: 0, rewards: { xp: 1000, title: 'Speed Reader' } },
  { id: 'night_owl', name: 'Night Owl', description: 'Read past midnight 10 times', icon: '🦉', category: 'time', rarity: 'rare', earned: false, progress: 40, rewards: { xp: 500, title: 'Night Reader' } },
  { id: 'early_bird', name: 'Early Bird', description: 'Read before 8am 10 times', icon: '🐦', category: 'time', rarity: 'rare', earned: false, progress: 20, rewards: { xp: 500, title: 'Morning Reader' } },
  { id: 'genre_explorer', name: 'Genre Explorer', description: 'Read books from 10 genres', icon: '🌍', category: 'reading', rarity: 'rare', earned: false, progress: 70, rewards: { xp: 800, title: 'Explorer' } }
];

const RARITY_COLORS: Record<string, string> = {
  common: 'from-text-tertiary to-text-secondary',
  rare: 'from-accent-violet to-accent-fuchsia',
  epic: 'from-accent-fuchsia to-accent-gold',
  legendary: 'from-accent-gold to-accent-violet'
};

/**
 * Achievements - Ethereal Archive gamification page
 * Features dark glass cards with rarity badges and progress animations
 */
export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [achievements] = useState(mockAchievements);

  const filteredAchievements = achievements.filter(
    (a) => selectedCategory === 'all' || a.category === selectedCategory
  );

  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-accent-gold" />
          <TextReveal as="h1" className="text-display-lg font-display text-text-primary">
            Achievements
          </TextReveal>
        </div>
        <p className="text-text-secondary">Track your reading milestones and earn rewards</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        className="glass-card bg-gradient-to-r from-accent-violet/30 via-graphite to-accent-fuchsia/30 p-8 mb-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Floating particles */}
        <div className="absolute top-4 right-8 w-3 h-3 bg-accent-gold/50 rounded-full animate-float" />
        <div className="absolute bottom-8 left-12 w-2 h-2 bg-accent-violet/50 rounded-full animate-float-slow" />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-2">
              {earnedCount} / {totalCount} Unlocked
            </h2>
            <p className="text-text-secondary">You're on fire! Keep reading to unlock more.</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-display font-bold text-gradient-holographic">{completionPercentage}%</div>
            <div className="text-text-tertiary">Complete</div>
          </div>
        </div>

        <div className="progress-ethereal h-4 relative z-10">
          <motion.div
            className="progress-ethereal-bar h-4"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {ACHIEVEMENT_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-element font-medium transition-all duration-300 ${selectedCategory === category.id
                  ? 'bg-gradient-holographic text-white shadow-glow-sm'
                  : 'glass-button'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              {category.name}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={`glass-card relative overflow-hidden group ${achievement.earned ? 'border-accent-violet/50' : ''
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -4 }}
          >
            {/* Rarity Badge */}
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${RARITY_COLORS[achievement.rarity]}`}>
              {achievement.rarity.toUpperCase()}
            </div>

            <div className="p-6">
              {/* Icon and Status */}
              <div className="flex items-start justify-between mb-4">
                <div className={`text-6xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.earned ? achievement.icon : <Lock className="w-16 h-16 text-text-tertiary" />}
                </div>
                {achievement.earned && (
                  <CheckCircle className="w-6 h-6 text-accent-violet" />
                )}
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                {achievement.name}
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                {achievement.description}
              </p>

              {/* Progress Bar */}
              {!achievement.earned && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-text-tertiary mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{achievement.progress}%</span>
                  </div>
                  <div className="progress-ethereal h-2">
                    <motion.div
                      className="progress-ethereal-bar h-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${achievement.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 * index }}
                    />
                  </div>
                </div>
              )}

              {/* Rewards */}
              <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm font-semibold text-text-secondary">
                    +{achievement.rewards.xp} XP
                  </span>
                </div>
                {achievement.rewards.title && (
                  <div className="text-xs bg-accent-violet/20 text-accent-violet px-2 py-1 rounded-full">
                    {achievement.rewards.title}
                  </div>
                )}
              </div>

              {/* Earned Date */}
              {achievement.earned && achievement.earnedAt && (
                <div className="mt-3 text-xs text-text-tertiary text-center font-accent italic">
                  Unlocked {achievement.earnedAt.toLocaleDateString()}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
