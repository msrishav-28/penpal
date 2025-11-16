import mongoose from 'mongoose';

const bookClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 2000
  },
  coverImage: String,
  
  // Creator and moderators
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Members
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['member', 'moderator', 'admin'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    }
  }],
  
  // Current reading
  currentBook: {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    startDate: Date,
    endDate: Date,
    schedule: [{
      chapter: Number,
      discussionDate: Date,
      completed: { type: Boolean, default: false }
    }]
  },
  
  // Past books
  pastBooks: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    readDate: Date,
    rating: Number,
    discussionId: mongoose.Schema.Types.ObjectId
  }],
  
  // Settings
  settings: {
    privacy: {
      type: String,
      enum: ['public', 'private', 'invite-only'],
      default: 'public'
    },
    maxMembers: {
      type: Number,
      default: 50
    },
    requireApproval: {
      type: Boolean,
      default: false
    },
    allowGuestPosts: {
      type: Boolean,
      default: false
    }
  },
  
  // Discussions
  discussions: [{
    title: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    chapter: Number,
    spoilers: { type: Boolean, default: false },
    comments: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String,
      createdAt: { type: Date, default: Date.now },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }],
    createdAt: { type: Date, default: Date.now },
    pinned: { type: Boolean, default: false }
  }],
  
  // Events
  events: [{
    title: String,
    description: String,
    date: Date,
    type: {
      type: String,
      enum: ['discussion', 'author-qa', 'virtual-meetup', 'reading-session'],
      default: 'discussion'
    },
    link: String,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  
  // Stats
  stats: {
    totalMembers: { type: Number, default: 0 },
    booksRead: { type: Number, default: 0 },
    activeDiscussions: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
  },
  
  // Tags and categories
  tags: [String],
  category: {
    type: String,
    enum: ['fiction', 'non-fiction', 'fantasy', 'sci-fi', 'mystery', 'romance', 'classics', 'general'],
    default: 'general'
  },
  
  // Activity
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
bookClubSchema.index({ name: 'text', description: 'text' });
bookClubSchema.index({ creator: 1 });
bookClubSchema.index({ 'settings.privacy': 1, active: 1 });

const BookClub = mongoose.model('BookClub', bookClubSchema);

export default BookClub;
