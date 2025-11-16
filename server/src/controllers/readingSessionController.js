import {
  startReadingSession,
  endReadingSession,
  getUserSessions,
  getReadingStats
} from '../services/readingSessionService.js';

/**
 * Start a new reading session
 * POST /api/reading/session/start
 */
export const startSession = async (req, res) => {
  try {
    const { bookId, startPage, mood, ambientSound, device, location } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const session = await startReadingSession(req.user.id, bookId, {
      startPage,
      mood,
      ambientSound,
      device,
      location
    });

    res.status(201).json(session);
  } catch (error) {
    console.error('Start session error:', error);
    res.status(500).json({ message: 'Failed to start reading session' });
  }
};

/**
 * End a reading session
 * POST /api/reading/session/:sessionId/end
 */
export const endSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { endPage, currentPage, pagesRead, notes } = req.body;

    const session = await endReadingSession(sessionId, {
      endPage,
      currentPage,
      pagesRead,
      notes
    });

    res.json(session);
  } catch (error) {
    console.error('End session error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user's reading sessions
 * GET /api/reading/sessions
 */
export const getSessions = async (req, res) => {
  try {
    const { bookId, startDate, endDate, page = 1, limit = 20 } = req.query;

    const result = await getUserSessions(req.user.id, {
      bookId,
      startDate,
      endDate,
      skip: (page - 1) * limit,
      limit: parseInt(limit)
    });

    res.json(result);
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Failed to get reading sessions' });
  }
};

/**
 * Get reading statistics
 * GET /api/reading/stats
 */
export const getStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    const stats = await getReadingStats(req.user.id, period);

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to get reading statistics' });
  }
};

export default {
  startSession,
  endSession,
  getSessions,
  getStats
};
