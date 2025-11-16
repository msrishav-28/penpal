import mongoose from 'mongoose';

const readingSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  
  // Session timing
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  durationMinutes: {
    type: Number,
    default: 0
  },
  
  // Reading progress
  pagesRead: {
    type: Number,
    default: 0
  },
  startPage: {
    type: Number,
    default: 0
  },
  endPage: {
    type: Number,
    default: 0
  },
  
  // Session mood and settings
  mood: {
    type: String,
    enum: ['focused', 'relaxed', 'excited', 'curious', 'emotional', 'analytical'],
    default: 'focused'
  },
  ambientSound: {
    type: String,
    enum: ['none', 'rain', 'cafe', 'nature', 'fireplace', 'ocean', 'white-noise'],
    default: 'none'
  },
  
  // Environment
  location: String,
  device: {
    type: String,
    enum: ['phone', 'tablet', 'desktop', 'ereader', 'physical-book'],
    default: 'desktop'
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'
  },
  
  // Notes
  notes: [{
    text: String,
    page: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  
  // Live session (for buddy reads)
  isLiveSession: {
    type: Boolean,
    default: false
  },
  liveSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LiveSession'
  }
}, {
  timestamps: true
});

// Index for querying user's sessions
readingSessionSchema.index({ user: 1, createdAt: -1 });
readingSessionSchema.index({ book: 1, createdAt: -1 });

const ReadingSession = mongoose.model('ReadingSession', readingSessionSchema);

export default ReadingSession;
