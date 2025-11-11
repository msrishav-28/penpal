import ReadingProgress from '../models/ReadingProgress.js';
import User from '../models/User.js';
import Activity from '../models/Activity.js';

// @desc    Get user's reading progress
// @route   GET /api/reading/progress
// @access  Private
export const getReadingProgress = async (req, res) => {
  try {
    const progress = await ReadingProgress.find({ user: req.user._id })
      .populate('book', 'title author coverUrl pages')
      .sort({ updatedAt: -1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update reading progress
// @route   POST /api/reading/progress
// @access  Private
export const updateReadingProgress = async (req, res) => {
  try {
    const { book, currentPage, totalPages, status } = req.body;

    let progress = await ReadingProgress.findOne({ user: req.user._id, book });

    if (progress) {
      // Update existing progress
      const oldStatus = progress.status;
      progress.currentPage = currentPage;
      progress.status = status || progress.status;
      
      if (status === 'currently-reading' && !progress.startDate) {
        progress.startDate = new Date();
      }
      
      if (status === 'finished') {
        progress.finishDate = new Date();
        progress.currentPage = totalPages;
      }

      await progress.save();

      // Create activity if status changed
      if (oldStatus !== status) {
        await Activity.create({
          user: req.user._id,
          type: status === 'finished' ? 'finished-reading' : 'started-reading',
          book
        });
      }
    } else {
      // Create new progress
      progress = await ReadingProgress.create({
        user: req.user._id,
        book,
        currentPage,
        totalPages,
        status,
        startDate: status === 'currently-reading' ? new Date() : undefined,
        finishDate: status === 'finished' ? new Date() : undefined
      });

      await Activity.create({
        user: req.user._id,
        type: status === 'finished' ? 'finished-reading' : 'started-reading',
        book
      });
    }

    // Update user's reading lists
    const user = await User.findById(req.user._id);
    
    if (status === 'currently-reading') {
      if (!user.currentlyReading.includes(book)) {
        user.currentlyReading.push(book);
      }
      user.wantToRead = user.wantToRead.filter(id => id.toString() !== book);
    } else if (status === 'want-to-read') {
      if (!user.wantToRead.includes(book)) {
        user.wantToRead.push(book);
      }
      user.currentlyReading = user.currentlyReading.filter(id => id.toString() !== book);
    } else if (status === 'finished') {
      if (!user.booksRead.includes(book)) {
        user.booksRead.push(book);
        user.readingGoal.completed += 1;
      }
      user.currentlyReading = user.currentlyReading.filter(id => id.toString() !== book);
      user.wantToRead = user.wantToRead.filter(id => id.toString() !== book);
    }

    await user.save();

    const populatedProgress = await ReadingProgress.findById(progress._id)
      .populate('book', 'title author coverUrl pages');

    res.json(populatedProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete reading progress
// @route   DELETE /api/reading/progress/:bookId
// @access  Private
export const deleteReadingProgress = async (req, res) => {
  try {
    const progress = await ReadingProgress.findOneAndDelete({
      user: req.user._id,
      book: req.params.bookId
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    // Remove from user's lists
    const user = await User.findById(req.user._id);
    user.currentlyReading = user.currentlyReading.filter(id => id.toString() !== req.params.bookId);
    user.wantToRead = user.wantToRead.filter(id => id.toString() !== req.params.bookId);
    user.booksRead = user.booksRead.filter(id => id.toString() !== req.params.bookId);
    await user.save();

    res.json({ message: 'Progress removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
