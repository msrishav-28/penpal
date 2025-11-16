import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['reading', 'social', 'time', 'milestone', 'special'],
    required: true
  },
  
  // Visual
  icon: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  color: String,
  
  // Requirements
  requirements: {
    type: {
      type: String,
      enum: ['books_read', 'pages_read', 'reviews_written', 'streak', 'genres', 'reading_time', 'social', 'custom'],
      required: true
    },
    threshold: {
      type: Number,
      required: true
    },
    timeframe: String, // e.g., 'daily', 'weekly', 'monthly', 'yearly', 'all-time'
    details: mongoose.Schema.Types.Mixed // Additional requirements
  },
  
  // Rewards
  rewards: {
    xp: {
      type: Number,
      default: 100
    },
    title: String,
    perks: [String]
  },
  
  // Stats
  stats: {
    totalEarned: {
      type: Number,
      default: 0
    },
    percentage: Number // % of users who earned it
  },
  
  // Availability
  active: {
    type: Boolean,
    default: true
  },
  releaseDate: Date,
  expiryDate: Date // For limited-time achievements
}, {
  timestamps: true
});

// Predefined achievements
export const ACHIEVEMENTS = {
  FIRST_BOOK: {
    id: 'first_book',
    name: 'First Chapter',
    description: 'Complete your first book',
    category: 'milestone',
    icon: '📖',
    rarity: 'common',
    requirements: {
      type: 'books_read',
      threshold: 1
    },
    rewards: {
      xp: 100,
      title: 'Reader'
    }
  },
  BOOK_STREAK_7: {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Read for 7 days straight',
    category: 'time',
    icon: '🔥',
    rarity: 'rare',
    requirements: {
      type: 'streak',
      threshold: 7,
      timeframe: 'daily'
    },
    rewards: {
      xp: 500,
      title: 'Dedicated Reader'
    }
  },
  REVIEWS_10: {
    id: 'reviewer',
    name: 'Critic',
    description: 'Write 10 reviews',
    category: 'social',
    icon: '✍️',
    rarity: 'common',
    requirements: {
      type: 'reviews_written',
      threshold: 10
    },
    rewards: {
      xp: 300,
      title: 'Reviewer'
    }
  },
  BOOKS_50: {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Read 50 books',
    category: 'milestone',
    icon: '🐛',
    rarity: 'rare',
    requirements: {
      type: 'books_read',
      threshold: 50
    },
    rewards: {
      xp: 2500,
      title: 'Bookworm'
    }
  },
  BOOKS_100: {
    id: 'bibliophile',
    name: 'Bibliophile',
    description: 'Read 100 books',
    category: 'milestone',
    icon: '📚',
    rarity: 'epic',
    requirements: {
      type: 'books_read',
      threshold: 100
    },
    rewards: {
      xp: 5000,
      title: 'Bibliophile'
    }
  },
  GENRE_EXPLORER: {
    id: 'genre_explorer',
    name: 'Genre Explorer',
    description: 'Read books from 10 different genres',
    category: 'reading',
    icon: '🌍',
    rarity: 'rare',
    requirements: {
      type: 'genres',
      threshold: 10
    },
    rewards: {
      xp: 800,
      title: 'Explorer'
    }
  },
  SPEED_READER: {
    id: 'speed_reader',
    name: 'Speed Reader',
    description: 'Finish a book in 24 hours',
    category: 'time',
    icon: '⚡',
    rarity: 'epic',
    requirements: {
      type: 'reading_time',
      threshold: 1440, // minutes
      details: { maxDuration: 1440 }
    },
    rewards: {
      xp: 1000,
      title: 'Speed Reader'
    }
  },
  NIGHT_OWL: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Read past midnight 10 times',
    category: 'special',
    icon: '🦉',
    rarity: 'rare',
    requirements: {
      type: 'custom',
      threshold: 10,
      details: { timeRange: '00:00-05:00' }
    },
    rewards: {
      xp: 500,
      title: 'Night Reader'
    }
  },
  EARLY_BIRD: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Read before 8am 10 times',
    category: 'special',
    icon: '🐦',
    rarity: 'rare',
    requirements: {
      type: 'custom',
      threshold: 10,
      details: { timeRange: '05:00-08:00' }
    },
    rewards: {
      xp: 500,
      title: 'Morning Reader'
    }
  },
  SOCIAL_BUTTERFLY: {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Get 100 followers',
    category: 'social',
    icon: '🦋',
    rarity: 'epic',
    requirements: {
      type: 'social',
      threshold: 100,
      details: { metric: 'followers' }
    },
    rewards: {
      xp: 1500,
      title: 'Popular Reader'
    }
  }
};

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
