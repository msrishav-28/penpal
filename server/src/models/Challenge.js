import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['reading_goal', 'genre_diversity', 'reading_streak', 'pages_count', 'books_count', 'themed', 'community'],
    required: true
  },
  
  // Challenge details
  goal: {
    target: {
      type: Number,
      required: true
    },
    metric: {
      type: String,
      enum: ['books', 'pages', 'days', 'hours', 'genres', 'custom'],
      required: true
    },
    conditions: mongoose.Schema.Types.Mixed // e.g., specific genres, authors, etc.
  },
  
  // Timing
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: String, // human-readable duration
  
  // Visibility
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends-only'],
    default: 'public'
  },
  
  // Creator
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isOfficial: {
    type: Boolean,
    default: false
  },
  
  // Participants
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date,
    rank: Number
  }],
  
  // Rewards
  rewards: {
    xp: Number,
    badge: String,
    title: String
  },
  
  // Stats
  stats: {
    totalParticipants: {
      type: Number,
      default: 0
    },
    completedCount: {
      type: Number,
      default: 0
    },
    averageProgress: {
      type: Number,
      default: 0
    }
  },
  
  // Tags and category
  tags: [String],
  category: String,
  
  // Featured
  featured: {
    type: Boolean,
    default: false
  },
  
  // Status
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes
challengeSchema.index({ status: 1, startDate: 1 });
challengeSchema.index({ createdBy: 1 });
challengeSchema.index({ 'participants.userId': 1 });
challengeSchema.index({ featured: 1, status: 1 });

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;
