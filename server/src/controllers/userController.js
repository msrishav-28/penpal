import User from '../models/User.js';
import Activity from '../models/Activity.js';

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('currentlyReading', 'title author coverUrl')
      .populate('booksRead', 'title author coverUrl')
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Follow a user
// @route   POST /api/users/:id/follow
// @access  Private
export const followUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = await User.findById(req.user._id);

    const alreadyFollowing = currentUser.following.includes(req.params.id);

    if (alreadyFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);
      userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== req.user._id.toString());
    } else {
      // Follow
      currentUser.following.push(req.params.id);
      userToFollow.followers.push(req.user._id);

      // Create activity
      await Activity.create({
        user: req.user._id,
        type: 'followed-user',
        targetUser: req.params.id
      });
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ 
      following: !alreadyFollowing,
      followersCount: userToFollow.followers.length 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's followers
// @route   GET /api/users/:id/followers
// @access  Public
export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', 'name avatar bio');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's following
// @route   GET /api/users/:id/following
// @access  Public
export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('following', 'name avatar bio');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activity feed
// @route   GET /api/users/feed
// @access  Private
export const getActivityFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get activities from user and people they follow
    const userIds = [req.user._id, ...user.following];

    const activities = await Activity.find({ user: { $in: userIds } })
      .populate('user', 'name avatar')
      .populate('book', 'title author coverUrl')
      .populate('review')
      .populate('targetUser', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
