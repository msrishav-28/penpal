import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  
  // Metadata
  metadata: {
    isbn13: String,
    isbn10: String,
    isbn: String, // Primary ISBN
    googleBooksId: String,
    goodreadsId: String,
    openLibraryId: String
  },
  
  // Content info
  description: {
    type: String,
    default: ''
  },
  coverUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop'
  },
  pages: {
    type: Number,
    default: 0
  },
  wordCount: Number,
  readingTime: Number, // average minutes
  publishedDate: {
    type: Date
  },
  publisher: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'English'
  },
  format: {
    type: String,
    enum: ['hardcover', 'paperback', 'ebook', 'audiobook', 'other'],
    default: 'paperback'
  },
  
  // Classification
  genres: [String],
  themes: [String],
  tags: [String],
  moods: [String],
  settings: [String],
  contentWarnings: [String],
  
  // Ratings
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingsCount: {
    type: Number,
    default: 0
  },
  ratingDistribution: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  
  // Stats
  stats: {
    totalReads: { type: Number, default: 0 },
    currentlyReading: { type: Number, default: 0 },
    wantToRead: { type: Number, default: 0 },
    finishedReading: { type: Number, default: 0 },
    averageReadingTime: Number,
    popularityScore: { type: Number, default: 0 },
    trendingScore: { type: Number, default: 0 }
  },
  
  // Awards
  awards: [{
    name: String,
    year: Number,
    category: String,
    won: Boolean
  }],
  
  // External links
  externalLinks: {
    amazonUrl: String,
    goodreadsUrl: String,
    audibleUrl: String,
    kindleUrl: String
  },
  
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Legacy field for backward compatibility
  isbn: {
    type: String,
    sparse: true
  }
}, {
  timestamps: true
});

// Index for search
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

const Book = mongoose.model('Book', bookSchema);

export default Book;
