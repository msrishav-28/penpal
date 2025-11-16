import ReadingSession from '../models/ReadingSession.js';
import ReadingProgress from '../models/ReadingProgress.js';
import User from '../models/User.js';
import { awardXP, checkAchievements } from './gamificationService.js';

/**
 * Start a new reading session
 */
export const startReadingSession = async (userId, bookId, options = {}) => {
  try {
    const session = await ReadingSession.create({
      user: userId,
      book: bookId,
      startTime: new Date(),
      startPage: options.startPage || 0,
      mood: options.mood || 'focused',
      ambientSound: options.ambientSound || 'none',
      device: options.device || 'desktop',
      location: options.location,
      status: 'active'
    });

    return await session.populate('book', 'title author coverUrl');
  } catch (error) {
    console.error('Start reading session error:', error.message);
    throw error;
  }
};

/**
 * End a reading session
 */
export const endReadingSession = async (sessionId, endData = {}) => {
  try {
    const session = await ReadingSession.findById(sessionId);
    if (!session) throw new Error('Session not found');

    if (session.status !== 'active') {
      throw new Error('Session is not active');
    }

    const endTime = new Date();
    const durationMinutes = Math.round((endTime - session.startTime) / 60000);
    const pagesRead = endData.endPage ? endData.endPage - session.startPage : endData.pagesRead || 0;

    session.endTime = endTime;
    session.durationMinutes = durationMinutes;
    session.pagesRead = pagesRead;
    session.endPage = endData.endPage || session.startPage + pagesRead;
    session.status = 'completed';

    if (endData.notes) {
      session.notes.push(...endData.notes);
    }

    await session.save();

    // Update user stats
    await updateUserStats(session.user, {
      readingTime: durationMinutes,
      pagesRead
    });

    // Update reading progress
    if (pagesRead > 0 && endData.currentPage) {
      await ReadingProgress.findOneAndUpdate(
        { user: session.user, book: session.book },
        { 
          currentPage: endData.currentPage,
          $push: {
            readingSessions: {
              date: session.startTime,
              durationMinutes,
              pagesRead,
              mood: session.mood
            }
          }
        }
      );
    }

    // Award XP for reading time
    const xpAmount = Math.floor(durationMinutes / 10) * 10; // 10 XP per 10 minutes
    if (xpAmount > 0) {
      await awardXP(session.user, xpAmount, 'Reading session');
    }

    // Check for time-based achievements
    const hour = endTime.getHours();
    if (hour >= 0 && hour < 5) {
      await checkAchievements(session.user, 'night_reading', { nightReadCount: 1 });
    } else if (hour >= 5 && hour < 8) {
      await checkAchievements(session.user, 'morning_reading', { morningReadCount: 1 });
    }

    return session;
  } catch (error) {
    console.error('End reading session error:', error.message);
    throw error;
  }
};

/**
 * Update user reading stats
 */
const updateUserStats = async (userId, data) => {
  try {
    const update = {};
    
    if (data.readingTime) {
      update.$inc = {
        'stats.totalReadingTime': data.readingTime
      };
    }

    if (data.pagesRead) {
      update.$inc = update.$inc || {};
      update.$inc['stats.totalPagesRead'] = data.pagesRead;
    }

    update.$set = {
      'stats.lastReadDate': new Date()
    };

    await User.findByIdAndUpdate(userId, update);

    // Check and update reading streak
    await updateReadingStreak(userId);
  } catch (error) {
    console.error('Update user stats error:', error.message);
  }
};

/**
 * Update reading streak
 */
const updateReadingStreak = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastRead = user.stats.lastReadDate ? new Date(user.stats.lastReadDate) : null;
    
    if (lastRead) {
      lastRead.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - lastRead) / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        // Already read today, streak continues
        return;
      } else if (daysDiff === 1) {
        // Read yesterday, increment streak
        user.stats.readingStreak += 1;
        if (user.stats.readingStreak > user.stats.longestStreak) {
          user.stats.longestStreak = user.stats.readingStreak;
        }
        await user.save();
        await checkAchievements(userId, 'streak_updated');
      } else {
        // Streak broken
        user.stats.readingStreak = 1;
        await user.save();
      }
    } else {
      // First time reading
      user.stats.readingStreak = 1;
      await user.save();
    }
  } catch (error) {
    console.error('Update reading streak error:', error.message);
  }
};

/**
 * Get user's reading sessions
 */
export const getUserSessions = async (userId, options = {}) => {
  try {
    const {
      limit = 20,
      skip = 0,
      bookId,
      startDate,
      endDate
    } = options;

    const query = { user: userId };
    
    if (bookId) query.book = bookId;
    if (startDate || endDate) {
      query.startTime = {};
      if (startDate) query.startTime.$gte = new Date(startDate);
      if (endDate) query.startTime.$lte = new Date(endDate);
    }

    const sessions = await ReadingSession.find(query)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate('book', 'title author coverUrl');

    const total = await ReadingSession.countDocuments(query);

    return {
      sessions,
      total,
      page: Math.floor(skip / limit) + 1,
      pages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Get user sessions error:', error.message);
    throw error;
  }
};

/**
 * Get reading statistics
 */
export const getReadingStats = async (userId, period = 'month') => {
  try {
    const now = new Date();
    let startDate;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0); // All time
    }

    const sessions = await ReadingSession.find({
      user: userId,
      startTime: { $gte: startDate },
      status: 'completed'
    });

    const totalMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const totalPages = sessions.reduce((sum, s) => sum + (s.pagesRead || 0), 0);
    const totalSessions = sessions.length;

    return {
      period,
      totalSessions,
      totalMinutes,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10,
      totalPages,
      averageMinutesPerSession: totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0,
      averagePagesPerSession: totalSessions > 0 ? Math.round(totalPages / totalSessions) : 0
    };
  } catch (error) {
    console.error('Get reading stats error:', error.message);
    throw error;
  }
};

export default {
  startReadingSession,
  endReadingSession,
  getUserSessions,
  getReadingStats
};
