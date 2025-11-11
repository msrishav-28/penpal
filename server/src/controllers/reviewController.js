import Review from '../models/Review.js';
import Book from '../models/Book.js';
import Activity from '../models/Activity.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { book, rating, comment } = req.body;

    // Check if review already exists
    const existingReview = await Review.findOne({ user: req.user._id, book });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    // Create review
    const review = await Review.create({
      user: req.user._id,
      book,
      rating,
      comment
    });

    // Update book rating
    const reviews = await Review.find({ book });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await Book.findByIdAndUpdate(book, {
      averageRating: avgRating,
      ratingsCount: reviews.length,
      reviewsCount: reviews.length
    });

    // Create activity
    await Activity.create({
      user: req.user._id,
      type: 'review',
      book,
      review: review._id,
      rating
    });

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name avatar')
      .populate('book', 'title author coverUrl');

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();

    // Recalculate book rating
    const reviews = await Review.find({ book: review.book });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    
    await Book.findByIdAndUpdate(review.book, {
      averageRating: avgRating
    });

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();

    // Recalculate book rating
    const reviews = await Review.find({ book: review.book });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length 
      : 0;
    
    await Book.findByIdAndUpdate(review.book, {
      averageRating: avgRating,
      ratingsCount: reviews.length,
      reviewsCount: reviews.length
    });

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like a review
// @route   POST /api/reviews/:id/like
// @access  Private
export const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const alreadyLiked = review.likes.includes(req.user._id);

    if (alreadyLiked) {
      // Unlike
      review.likes = review.likes.filter(id => id.toString() !== req.user._id.toString());
      review.likesCount = review.likes.length;
    } else {
      // Like
      review.likes.push(req.user._id);
      review.likesCount = review.likes.length;
    }

    await review.save();
    res.json({ likesCount: review.likesCount, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
