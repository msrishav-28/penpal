import User from '../models/User.js';
import { ACHIEVEMENTS } from '../models/Achievement.js';
import Notification from '../models/Notification.js';

/**
 * Award XP to user and check for level up
 */
export const awardXP = async (userId, xpAmount, reason) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const oldLevel = user.gamification.level;
    const newXP = user.gamification.xp + xpAmount;
    const newLevel = calculateLevel(newXP);

    user.gamification.xp = newXP;
    user.gamification.level = newLevel;

    // Update rank based on level
    user.gamification.rank = getRank(newLevel);

    await user.save();

    // Check if leveled up
    if (newLevel > oldLevel) {
      await createNotification(userId, {
        type: 'achievement_unlocked',
        title: `Level Up! You're now level ${newLevel}`,
        body: `You've reached level ${newLevel} and earned the rank of ${user.gamification.rank}!`,
        image: '⬆️'
      });
    }

    return {
      xpAwarded: xpAmount,
      totalXP: newXP,
      level: newLevel,
      leveledUp: newLevel > oldLevel,
      rank: user.gamification.rank
    };
  } catch (error) {
    console.error('Award XP error:', error.message);
    throw error;
  }
};

/**
 * Calculate level from XP
 */
const calculateLevel = (xp) => {
  // Level formula: level = floor(sqrt(xp / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

/**
 * Get rank title based on level
 */
const getRank = (level) => {
  if (level >= 50) return 'Legendary Reader';
  if (level >= 40) return 'Master Bibliophile';
  if (level >= 30) return 'Expert Bibliophile';
  if (level >= 20) return 'Bibliophile';
  if (level >= 15) return 'Avid Bookworm';
  if (level >= 10) return 'Bookworm';
  if (level >= 5) return 'Dedicated Reader';
  return 'Novice Reader';
};

/**
 * Check and award achievement
 */
export const checkAchievements = async (userId, action, data = {}) => {
  try {
    const user = await User.findById(userId);
    if (!user) return [];

    const newAchievements = [];

    switch (action) {
      case 'book_completed':
        if (user.stats.totalBooksRead === 1) {
          await awardAchievement(userId, 'FIRST_BOOK');
          newAchievements.push('FIRST_BOOK');
        }
        if (user.stats.totalBooksRead === 10) {
          await awardAchievement(userId, 'BOOKS_10');
          newAchievements.push('BOOKS_10');
        }
        if (user.stats.totalBooksRead === 50) {
          await awardAchievement(userId, 'BOOKS_50');
          newAchievements.push('BOOKS_50');
        }
        if (user.stats.totalBooksRead === 100) {
          await awardAchievement(userId, 'BOOKS_100');
          newAchievements.push('BOOKS_100');
        }
        break;

      case 'streak_updated':
        if (user.stats.readingStreak === 7) {
          await awardAchievement(userId, 'BOOK_STREAK_7');
          newAchievements.push('BOOK_STREAK_7');
        }
        if (user.stats.readingStreak === 30) {
          await awardAchievement(userId, 'BOOK_STREAK_30');
          newAchievements.push('BOOK_STREAK_30');
        }
        break;

      case 'review_written':
        const reviewCount = data.reviewCount || 0;
        if (reviewCount === 10) {
          await awardAchievement(userId, 'REVIEWS_10');
          newAchievements.push('REVIEWS_10');
        }
        if (reviewCount === 50) {
          await awardAchievement(userId, 'REVIEWS_50');
          newAchievements.push('REVIEWS_50');
        }
        break;

      case 'genre_explored':
        const genreCount = data.genreCount || 0;
        if (genreCount === 5) {
          await awardAchievement(userId, 'GENRE_EXPLORER');
          newAchievements.push('GENRE_EXPLORER');
        }
        break;

      case 'speed_read':
        if (data.completedInHours <= 24) {
          await awardAchievement(userId, 'SPEED_READER');
          newAchievements.push('SPEED_READER');
        }
        break;

      case 'night_reading':
        const nightReadCount = data.nightReadCount || 0;
        if (nightReadCount === 10) {
          await awardAchievement(userId, 'NIGHT_OWL');
          newAchievements.push('NIGHT_OWL');
        }
        break;

      case 'morning_reading':
        const morningReadCount = data.morningReadCount || 0;
        if (morningReadCount === 10) {
          await awardAchievement(userId, 'EARLY_BIRD');
          newAchievements.push('EARLY_BIRD');
        }
        break;

      case 'follower_gained':
        const followerCount = user.social.followers.length;
        if (followerCount === 100) {
          await awardAchievement(userId, 'SOCIAL_BUTTERFLY');
          newAchievements.push('SOCIAL_BUTTERFLY');
        }
        break;
    }

    return newAchievements;
  } catch (error) {
    console.error('Check achievements error:', error.message);
    return [];
  }
};

/**
 * Award achievement to user
 */
export const awardAchievement = async (userId, achievementKey) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const achievement = ACHIEVEMENTS[achievementKey];
    if (!achievement) throw new Error('Achievement not found');

    // Check if user already has this achievement
    const hasAchievement = user.gamification.badges.some(
      badge => badge.badgeId === achievement.id
    );

    if (hasAchievement) {
      return null; // Already has achievement
    }

    // Award achievement
    user.gamification.badges.push({
      badgeId: achievement.id,
      earnedAt: new Date(),
      category: achievement.category
    });

    // Award XP
    user.gamification.xp += achievement.rewards.xp;
    user.gamification.level = calculateLevel(user.gamification.xp);
    user.gamification.rank = getRank(user.gamification.level);

    await user.save();

    // Create notification
    await createNotification(userId, {
      type: 'achievement_unlocked',
      title: `Achievement Unlocked: ${achievement.name}`,
      body: achievement.description,
      image: achievement.icon,
      metadata: {
        achievementId: achievement.id
      }
    });

    return achievement;
  } catch (error) {
    console.error('Award achievement error:', error.message);
    throw error;
  }
};

/**
 * Get user's achievements progress
 */
export const getUserAchievements = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const allAchievements = Object.entries(ACHIEVEMENTS).map(([key, achievement]) => {
      const earned = user.gamification.badges.find(b => b.badgeId === achievement.id);
      
      return {
        ...achievement,
        earned: !!earned,
        earnedAt: earned?.earnedAt || null,
        progress: calculateAchievementProgress(user, achievement)
      };
    });

    return {
      earned: allAchievements.filter(a => a.earned),
      available: allAchievements.filter(a => !a.earned),
      totalXP: user.gamification.xp,
      level: user.gamification.level,
      rank: user.gamification.rank
    };
  } catch (error) {
    console.error('Get achievements error:', error.message);
    throw error;
  }
};

/**
 * Calculate achievement progress
 */
const calculateAchievementProgress = (user, achievement) => {
  const { type, threshold } = achievement.requirements;

  let current = 0;

  switch (type) {
    case 'books_read':
      current = user.stats.totalBooksRead;
      break;
    case 'pages_read':
      current = user.stats.totalPagesRead;
      break;
    case 'streak':
      current = user.stats.readingStreak;
      break;
    case 'reviews_written':
      current = 0; // Would need to count reviews
      break;
    default:
      current = 0;
  }

  return Math.min(100, Math.floor((current / threshold) * 100));
};

/**
 * Create notification
 */
const createNotification = async (userId, notificationData) => {
  try {
    await Notification.create({
      userId,
      ...notificationData,
      content: {
        title: notificationData.title,
        body: notificationData.body,
        image: notificationData.image
      }
    });
  } catch (error) {
    console.error('Create notification error:', error.message);
  }
};

export default {
  awardXP,
  checkAchievements,
  awardAchievement,
  getUserAchievements
};
