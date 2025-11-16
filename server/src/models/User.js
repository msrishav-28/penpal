import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: {
    type: String,
    default: ''
  },
  location: String,
  
  // Reading preferences
  preferences: {
    readingGoals: {
      daily: { type: Number, default: 30 },      // minutes
      weekly: { type: Number, default: 2 },      // books
      monthly: { type: Number, default: 4 },     // books
      yearly: { type: Number, default: 50 }      // books
    },
    genres: [{
      name: String,
      preference: { type: Number, min: 1, max: 5, default: 3 }
    }],
    readingSpeed: { type: Number, default: 250 }, // words per minute
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      types: [{ type: String, enum: ['new_follower', 'review_like', 'comment', 'challenge', 'recommendation'] }]
    },
    privacy: {
      showProfile: { type: Boolean, default: true },
      showReadingList: { type: Boolean, default: true },
      showActivity: { type: Boolean, default: true },
      allowMessages: { type: Boolean, default: true }
    },
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    language: { type: String, default: 'en' }
  },
  
  // Statistics
  stats: {
    totalBooksRead: { type: Number, default: 0 },
    totalPagesRead: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    readingStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    totalReadingTime: { type: Number, default: 0 }, // minutes
    booksThisYear: { type: Number, default: 0 },
    lastReadDate: Date
  },
  
  // Gamification
  gamification: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    badges: [{
      badgeId: String,
      earnedAt: { type: Date, default: Date.now },
      category: String
    }],
    achievements: [{
      achievementId: String,
      progress: { type: Number, default: 0 },
      completed: { type: Boolean, default: false },
      completedAt: Date
    }],
    rank: { type: String, default: 'Novice' }
  },
  
  // Subscription
  subscription: {
    tier: { type: String, enum: ['free', 'pro', 'ultimate'], default: 'free' },
    status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
    startDate: Date,
    endDate: Date
  },
  
  // Social
  social: {
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    blockedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    mutedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  
  // Legacy fields for backward compatibility
  readingGoal: {
    year: { type: Number, default: new Date().getFullYear() },
    target: { type: Number, default: 50 },
    completed: { type: Number, default: 0 }
  },
  booksRead: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  currentlyReading: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  wantToRead: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  favoriteGenres: [String]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
