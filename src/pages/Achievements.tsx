import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trophy, Star, Award, TrendingUp, Lock, CheckCircle } from 'lucide-react';
import { fetchAchievements } from '../store/slices/gamificationSlice';
import type { RootState } from '../store';

const ACHIEVEMENT_CATEGORIES = [
  { id: 'all', name: 'All Achievements', icon: Trophy },
  { id: 'milestone', name: 'Milestones', icon: Star },
  { id: 'reading', name: 'Reading', icon: Award },
  { id: 'time', name: 'Time-based', icon: TrendingUp }
];

// Mock achievements data
const mockAchievements = [
  {
    id: 'first_book',
    name: 'First Chapter',
    description: 'Complete your first book',
    icon: '📖',
    category: 'milestone',
    rarity: 'common',
    earned: true,
    earnedAt: new Date('2024-01-15'),
    progress: 100,
    rewards: { xp: 100, title: 'Reader' }
  },
  {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Read for 7 days straight',
    icon: '🔥',
    category: 'time',
    rarity: 'rare',
    earned: true,
    earnedAt: new Date('2024-03-20'),
    progress: 100,
    rewards: { xp: 500, title: 'Dedicated Reader' }
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Read 50 books',
    icon: '🐛',
    category: 'milestone',
    rarity: 'rare',
    earned: false,
    progress: 58,
    rewards: { xp: 2500, title: 'Bookworm' }
  },
  {
    id: 'bibliophile',
    name: 'Bibliophile',
    description: 'Read 100 books',
    icon: '📚',
    category: 'milestone',
    rarity: 'epic',
    earned: false,
    progress: 29,
    rewards: { xp: 5000, title: 'Bibliophile' }
  },
  {
    id: 'speed_reader',
    name: 'Speed Reader',
    description: 'Finish a book in 24 hours',
    icon: '⚡',
    category: 'time',
    rarity: 'epic',
    earned: false,
    progress: 0,
    rewards: { xp: 1000, title: 'Speed Reader' }
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Read past midnight 10 times',
    icon: '🦉',
    category: 'time',
    rarity: 'rare',
    earned: false,
    progress: 40,
    rewards: { xp: 500, title: 'Night Reader' }
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Read before 8am 10 times',
    icon: '🐦',
    category: 'time',
    rarity: 'rare',
    earned: false,
    progress: 20,
    rewards: { xp: 500, title: 'Morning Reader' }
  },
  {
    id: 'genre_explorer',
    name: 'Genre Explorer',
    description: 'Read books from 10 different genres',
    icon: '🌍',
    category: 'reading',
    rarity: 'rare',
    earned: false,
    progress: 70,
    rewards: { xp: 800, title: 'Explorer' }
  }
];

const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-500',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-yellow-600'
};

export default function Achievements() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [achievements, setAchievements] = useState(mockAchievements);

  useEffect(() => {
    // dispatch(fetchAchievements()); // Uncomment when backend is ready
  }, [dispatch]);

  const filteredAchievements = achievements.filter(
    (a) => selectedCategory === 'all' || a.category === selectedCategory
  );

  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🏆 Achievements
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your reading milestones and earn rewards
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {earnedCount} / {totalCount} Unlocked
              </h2>
              <p className="text-purple-100">You're on fire! Keep reading to unlock more.</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{completionPercentage}%</div>
              <div className="text-purple-100">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {ACHIEVEMENT_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative overflow-hidden rounded-2xl shadow-xl border-2 transition-all hover:scale-105 ${
                achievement.earned
                  ? 'bg-white dark:bg-gray-800 border-emerald-500'
                  : 'bg-white/60 dark:bg-gray-800/60 border-gray-300 dark:border-gray-700'
              }`}
            >
              {/* Rarity Badge */}
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${
                  RARITY_COLORS[achievement.rarity]
                }`}
              >
                {achievement.rarity.toUpperCase()}
              </div>

              <div className="p-6">
                {/* Icon and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-6xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.earned ? achievement.icon : <Lock className="w-16 h-16 text-gray-400" />}
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  )}
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {achievement.description}
                </p>

                {/* Progress Bar */}
                {!achievement.earned && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Progress</span>
                      <span className="font-semibold">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Rewards */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      +{achievement.rewards.xp} XP
                    </span>
                  </div>
                  {achievement.rewards.title && (
                    <div className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                      {achievement.rewards.title}
                    </div>
                  )}
                </div>

                {/* Earned Date */}
                {achievement.earned && achievement.earnedAt && (
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Unlocked {achievement.earnedAt.toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
