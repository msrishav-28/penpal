import {
  getUserAchievements,
  awardXP
} from '../services/gamificationService.js';
import User from '../models/User.js';

/**
 * Get user achievements
 * GET /api/gamification/achievements
 */
export const getAchievements = async (req, res) => {
  try {
    const achievements = await getUserAchievements(req.user.id);
    res.json(achievements);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Failed to get achievements' });
  }
};

/**
 * Get user gamification profile
 * GET /api/gamification/profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('gamification stats');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const xpToNextLevel = calculateXPToNextLevel(user.gamification.xp);

    res.json({
      level: user.gamification.level,
      xp: user.gamification.xp,
      xpToNextLevel,
      rank: user.gamification.rank,
      badges: user.gamification.badges,
      stats: user.stats
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to get gamification profile' });
  }
};

/**
 * Get leaderboard
 * GET /api/gamification/leaderboard
 */
export const getLeaderboard = async (req, res) => {
  try {
    const { type = 'xp', period = 'all-time', limit = 50 } = req.query;

    let sortField = {};
    
    switch (type) {
      case 'xp':
        sortField = { 'gamification.xp': -1 };
        break;
      case 'books':
        sortField = { 'stats.totalBooksRead': -1 };
        break;
      case 'pages':
        sortField = { 'stats.totalPagesRead': -1 };
        break;
      case 'streak':
        sortField = { 'stats.readingStreak': -1 };
        break;
      default:
        sortField = { 'gamification.xp': -1 };
    }

    const users = await User.find()
      .select('name avatar gamification stats')
      .sort(sortField)
      .limit(parseInt(limit));

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      name: user.name,
      avatar: user.avatar,
      level: user.gamification.level,
      xp: user.gamification.xp,
      rank: user.gamification.rank,
      booksRead: user.stats.totalBooksRead,
      pagesRead: user.stats.totalPagesRead,
      streak: user.stats.readingStreak
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Failed to get leaderboard' });
  }
};

/**
 * Calculate XP needed for next level
 */
const calculateXPToNextLevel = (currentXP) => {
  const currentLevel = Math.floor(Math.sqrt(currentXP / 100)) + 1;
  const nextLevelXP = Math.pow(currentLevel, 2) * 100;
  return nextLevelXP - currentXP;
};

export default {
  getAchievements,
  getProfile,
  getLeaderboard
};
