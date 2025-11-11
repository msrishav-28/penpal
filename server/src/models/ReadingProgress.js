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
    enum: ['want-to-read', 'currently-reading', 'finished'],
    default: 'want-to-read'
  },
  startDate: {
    type: Date
  },
  finishDate: {
    type: Date
  }
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
