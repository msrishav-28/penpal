import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'review_like',
      'review_comment',
      'new_follower',
      'comment_reply',
      'book_recommendation',
      'achievement_unlocked',
      'challenge_complete',
      'challenge_invite',
      'book_club_invite',
      'reading_reminder',
      'goal_achieved',
      'friend_activity',
      'system'
    ],
    required: true
  },
  
  // Content
  content: {
    title: {
      type: String,
      required: true
    },
    body: String,
    image: String,
    actionUrl: String
  },
  
  // Metadata
  metadata: {
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    targetId: mongoose.Schema.Types.ObjectId,
    targetType: {
      type: String,
      enum: ['review', 'book', 'user', 'comment', 'club', 'challenge', 'achievement']
    },
    additionalData: mongoose.Schema.Types.Mixed
  },
  
  // Status
  status: {
    read: {
      type: Boolean,
      default: false
    },
    readAt: Date,
    clicked: {
      type: Boolean,
      default: false
    },
    clickedAt: Date,
    dismissed: {
      type: Boolean,
      default: false
    },
    dismissedAt: Date
  },
  
  // Delivery
  delivery: {
    email: {
      type: Boolean,
      default: false
    },
    emailSentAt: Date,
    push: {
      type: Boolean,
      default: false
    },
    pushSentAt: Date,
    inApp: {
      type: Boolean,
      default: true
    }
  },
  
  // Expiry
  expiresAt: Date,
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  }
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, 'status.read': 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
