import mongoose from 'mongoose';

const readingProgressSchema = new mongoose.Schema({
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
  currentPage: {
    type: Number,
    default: 0,
    min: 0
  },
  totalPages: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['want-to-read', 'currently-reading', 'finished', 'dnf', 'paused'],
    default: 'want-to-read'
  },
  startDate: {
    type: Date
  },
  finishDate: {
    type: Date
  },
  
  // Rating with half-star support
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    // Validate to ensure only 0.5 increments
    validate: {
      validator: function(v) {
        return v === 0 || (v >= 0.5 && v <= 5 && v % 0.5 === 0);
      },
      message: 'Rating must be in 0.5 increments (0.5, 1, 1.5, ... 5)'
    }
  },
  
  // Review
  review: {
    type: String,
    maxlength: 5000
  },
  
  // DNF specific fields
  dnfReason: {
    type: String,
    maxlength: 1000
  },
  dnfPage: {
    type: Number,
    min: 0
  },
  dnfDate: {
    type: Date
  },
  
  // Reading sessions tracking
  readingSessions: [{
    date: { type: Date, default: Date.now },
    durationMinutes: Number,
    pagesRead: Number,
    mood: String
  }],
  
  // Mood tags
  moodTags: [String],
  
  // Ownership
  isOwned: {
    type: Boolean,
    default: false
  },
  format: {
    type: String,
    enum: ['physical', 'ebook', 'audiobook'],
    default: 'physical'
  },
  
  // Paused specific
  pausedDate: {
    type: Date
  },
  pauseReason: String
}, {
  timestamps: true
});

// Compound index to ensure one progress record per user per book
readingProgressSchema.index({ user: 1, book: 1 }, { unique: true });

// Virtual for percentage
readingProgressSchema.virtual('percentage').get(function() {
  if (this.totalPages === 0) return 0;
  return Math.round((this.currentPage / this.totalPages) * 100);
});

// Include virtuals in JSON
readingProgressSchema.set('toJSON', { virtuals: true });

const ReadingProgress = mongoose.model('ReadingProgress', readingProgressSchema);

export default ReadingProgress;
