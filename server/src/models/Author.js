import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: ''
  },
  photoUrl: {
    type: String,
    default: 'https://via.placeholder.com/200'
  },
  birthDate: {
    type: Date
  },
  nationality: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followersCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
