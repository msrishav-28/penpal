import React from 'react';
import { Settings, MoreHorizontal, Heart, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * UpdatesFeed - Ethereal Archive social feed
 * Features dark glass cards, violet accents, and smooth hover transitions
 */
const UpdatesFeed: React.FC = () => {
  const updates = [
    {
      id: 1,
      user: {
        name: 'Eric Anderson',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
      },
      action: 'finished reading',
      time: '15 March 2025, 5:32pm',
      book: {
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=80&h=120&fit=crop',
        rating: 4.7,
        totalRatings: '16.6M ratings'
      },
      review: "Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry...",
      likes: 128,
      comments: 54
    },
    {
      id: 2,
      user: {
        name: 'Tom Latham',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
      },
      action: 'wants to read',
      time: '21 February 2025, 9:12am',
      book: {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=80&h=120&fit=crop',
        rating: 4.3,
        totalRatings: '1M ratings'
      },
      review: "A groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller.",
      likes: 34,
      comments: 4
    },
  ];

  return (
    <motion.div
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-display font-semibold text-text-primary">Updates</h2>
          <motion.button
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="h-5 w-5 text-text-tertiary hover:text-text-secondary cursor-pointer transition-colors duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Feed Items */}
      <div className="divide-y divide-glass-border">
        {updates.map((update, index) => (
          <motion.div
            key={update.id}
            className="p-6 hover:bg-white/[0.02] transition-all duration-300 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <div className="flex items-start space-x-3">
              {/* User Avatar */}
              <img
                src={update.user.avatar}
                alt={update.user.name}
                className="w-10 h-10 rounded-full flex-shrink-0 border border-glass-border group-hover:border-accent-violet/30 transition-all duration-300"
              />

              <div className="flex-1 min-w-0">
                {/* User Action Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="font-medium text-text-primary text-[14px] group-hover:text-accent-violet transition-colors duration-300">
                      {update.user.name}
                    </span>
                    <span className="text-[14px] text-text-secondary">{update.action}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4 text-text-tertiary cursor-pointer hover:text-text-secondary transition-colors duration-300" />
                  </div>
                </div>

                <p className="text-[12px] text-text-tertiary mb-3">{update.time}</p>

                {/* Book Card */}
                <div className="flex space-x-4 p-3 rounded-element bg-white/[0.02] border border-glass-border-subtle">
                  <img
                    src={update.book.cover}
                    alt={update.book.title}
                    className="w-16 h-24 object-cover rounded-element flex-shrink-0 img-ethereal"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-medium text-text-primary mb-1 text-[14px] line-clamp-2 hover:text-accent-violet transition-colors duration-300 cursor-pointer">
                      {update.book.title}
                    </h3>
                    <p className="text-[12px] text-text-secondary mb-2">{update.book.author}</p>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-[12px] ${i < Math.floor(update.book.rating) ? 'star-filled' : 'star-empty'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-[12px] text-text-secondary ml-2 font-accent italic">
                        {update.book.rating}
                      </span>
                      <span className="text-[11px] text-text-tertiary ml-2">
                        ({update.book.totalRatings})
                      </span>
                    </div>

                    <p className="text-[12px] text-text-secondary mb-3 line-clamp-2 leading-relaxed">
                      {update.review}
                    </p>

                    <motion.button
                      className="btn-holographic px-4 py-1.5 rounded-button text-[12px] font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Want To Read
                    </motion.button>
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-glass-border-subtle">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      className="flex items-center space-x-1.5 text-text-secondary hover:text-accent-fuchsia transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-[12px]">{update.likes}</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-1.5 text-text-secondary hover:text-accent-violet transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-[12px]">{update.comments}</span>
                    </motion.button>
                  </div>

                  {/* Comment Input */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="input-ethereal text-[12px] py-1.5 px-3 w-36"
                    />
                    <motion.button
                      className="text-accent-violet hover:text-accent-fuchsia transition-colors duration-300"
                      whileHover={{ scale: 1.1, x: 2 }}
                    >
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpdatesFeed;