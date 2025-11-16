import mongoose from 'mongoose';

const liveSessionSchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  
  // Session details
  title: {
    type: String,
    required: true
  },
  description: String,
  
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
    currentPage: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'idle', 'left'],
      default: 'active'
    },
    leftAt: Date
  }],
  
  maxParticipants: {
    type: Number,
    default: 10
  },
  
  // Session timing
  session: {
    startTime: {
      type: Date,
      required: true,
      default: Date.now
    },
    endTime: Date,
    scheduledEndTime: Date,
    status: {
      type: String,
      enum: ['scheduled', 'active', 'paused', 'ended'],
      default: 'active'
    },
    type: {
      type: String,
      enum: ['co-read', 'book-club', 'study-group', 'buddy-read'],
      default: 'co-read'
    },
    privacy: {
      type: String,
      enum: ['public', 'friends-only', 'invite-only'],
      default: 'public'
    }
  },
  
  // Real-time interaction
  realtime: {
    currentPage: {
      type: Number,
      default: 0
    },
    annotations: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      page: Number,
      text: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    reactions: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      type: {
        type: String,
        enum: ['love', 'surprised', 'sad', 'funny', 'exciting', 'boring']
      },
      page: Number,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    chat: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      message: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  // Video/Audio
  video: {
    enabled: {
      type: Boolean,
      default: false
    },
    roomId: String,
    recording: {
      type: Boolean,
      default: false
    },
    recordingUrl: String
  },
  
  // Tags
  tags: [String],
  
  // Invite code
  inviteCode: String
}, {
  timestamps: true
});

// Indexes
liveSessionSchema.index({ hostId: 1, createdAt: -1 });
liveSessionSchema.index({ bookId: 1, 'session.status': 1 });
liveSessionSchema.index({ 'session.status': 1, 'session.privacy': 1 });
liveSessionSchema.index({ inviteCode: 1 });

const LiveSession = mongoose.model('LiveSession', liveSessionSchema);

export default LiveSession;
