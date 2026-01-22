import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal, Star, Users, Sparkles } from 'lucide-react';
import { TextReveal } from '../components/ui';

const BookDetail = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const book = {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    rating: 4.7,
    ratingsCount: "16,626,598",
    reviewsCount: "175,198",
    description: "Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!",
    genres: ["Art", "Fantasy", "Fiction", "Biography", "Business", "Children's", "Classics", "Comics", "Contemporary"],
    details: {
      series: "Harry Potter (#1)",
      format: "273 pages, Paperback",
      published: "June 30, 1997 by Bloomsbury Publishing",
      originalTitle: "Harry Potter and the Philosopher's Stone",
      language: "English"
    },
    currentlyReading: 2434,
    wantToRead: 251
  };

  const author = {
    name: "J.K. Rowling",
    nickname: "Robert Galbraith",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    followers: "3,396",
    description: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling..."
  };

  const relatedBooks = [
    { id: 2, title: "Harry Potter and the Chamber of Secrets", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop" },
    { id: 3, title: "The Alchemist", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop" },
    { id: 4, title: "The Count of Monte Cristo", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop" },
    { id: 5, title: "The Adventures of Tom Sawyer", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop" }
  ];

  const reviews = [
    { id: 1, user: { name: "Jayson Lawrence", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop", followers: "3734" }, rating: 5, date: "May 12, 2019", text: "An absolutely magical journey that captivates readers of all ages..." },
    { id: 2, user: { name: "Sarah Chen", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop", followers: "2891" }, rating: 5, date: "Apr 8, 2019", text: "A timeless classic that sparked my love for fantasy literature..." }
  ];

  const ratingDistribution = [
    { stars: 5, count: 6627141, percentage: 70 },
    { stars: 4, count: 2314481, percentage: 25 },
    { stars: 3, count: 605710, percentage: 6 },
    { stars: 2, count: 402134, percentage: 4 },
    { stars: 1, count: 662710, percentage: 7 }
  ];

  const renderStars = (rating: number, interactive = false) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && setSelectedRating(star)}
          className={`text-lg ${star <= (interactive ? selectedRating : Math.floor(rating)) ? 'text-accent-gold' : 'text-text-tertiary'} ${interactive ? 'hover:text-accent-gold cursor-pointer transition-colors duration-200' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Book Cover and Actions */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="sticky top-8">
            <div className="relative group">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full max-w-sm mx-auto rounded-element shadow-ethereal img-ethereal"
              />
              <div className="absolute inset-0 rounded-element bg-gradient-to-t from-accent-violet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="mt-6 space-y-3">
              <motion.button
                className="w-full btn-holographic py-3 px-4 rounded-element font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Want to Read
              </motion.button>

              <motion.button
                className="w-full glass-button py-3 px-4 rounded-element font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy on Amazon
              </motion.button>
            </div>

            <div className="mt-6 glass-card p-4">
              <h3 className="font-medium text-text-primary mb-3">Rate It:</h3>
              {renderStars(0, true)}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Book Header */}
          <div className="mb-8">
            <TextReveal as="h1" className="text-display-lg font-display text-text-primary mb-2">
              {book.title}
            </TextReveal>
            <p className="text-lg text-text-secondary mb-4">
              by <Link to={`/author/${author.name}`} className="text-accent-violet hover:text-accent-fuchsia transition-colors duration-300">{book.author}</Link>
            </p>

            <div className="flex items-center space-x-4 mb-4">
              {renderStars(book.rating)}
              <span className="text-lg font-medium text-text-primary">{book.rating}/5</span>
              <span className="text-text-secondary">({book.ratingsCount} ratings • {book.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-text-secondary mb-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-accent-violet" />
                <span>{book.currentlyReading} people are currently reading</span>
              </div>
            </div>

            <p className="text-text-secondary leading-relaxed mb-6">{book.description}</p>

            {/* Genre Tags */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-primary mb-2">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((genre) => (
                  <span key={genre} className="tag-glass">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm glass-card p-6">
              {Object.entries(book.details).map(([key, value]) => (
                <div key={key}>
                  <h4 className="font-medium text-text-primary capitalize">{key}</h4>
                  <p className="text-text-secondary">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About The Author */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-display font-bold text-text-primary mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-violet" />
              About The Author
            </h2>
            <div className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <img src={author.photo} alt={author.name} className="w-20 h-20 rounded-element object-cover ring-2 ring-accent-violet/50" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">{author.name}</h3>
                  <p className="text-sm text-text-tertiary mb-2">{author.nickname}</p>
                  <p className="text-sm text-text-secondary mb-3">{author.followers} followers</p>
                  <button className="btn-holographic px-4 py-2 text-sm font-medium rounded-element">
                    Follow
                  </button>
                </div>
              </div>
              <p className="text-text-secondary text-sm mt-4 leading-relaxed">{author.description}</p>
            </div>
          </motion.div>

          {/* Readers Also Enjoyed */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-display font-bold text-text-primary mb-4">Readers also enjoyed</h2>
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {relatedBooks.map((relatedBook) => (
                  <motion.div
                    key={relatedBook.id}
                    className="flex-shrink-0"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <img src={relatedBook.cover} alt={relatedBook.title} className="w-32 h-48 object-cover rounded-element img-ethereal shadow-ethereal" />
                  </motion.div>
                ))}
              </div>
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 glass-button shadow-glow-sm rounded-full p-2">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 glass-button shadow-glow-sm rounded-full p-2">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Ratings & Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-gold" />
              Ratings & Reviews
            </h2>

            {/* Write Review */}
            <div className="glass-card p-4 mb-6">
              <textarea
                placeholder="Write your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="input-ethereal w-full h-24 resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-text-secondary">Rate This Book:</span>
                  {renderStars(0, true)}
                </div>
                <button className="btn-holographic px-6 py-2 text-sm font-medium rounded-element">
                  Submit
                </button>
              </div>
            </div>

            {/* Community Rating */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Community Review</h3>
              <div className="flex items-center space-x-4 mb-4">
                {renderStars(book.rating)}
                <span className="text-2xl font-bold text-text-primary">{book.rating}</span>
                <span className="text-text-secondary">({book.ratingsCount} ratings)</span>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center space-x-3">
                    <span className="text-sm text-text-tertiary w-16">{item.stars} Stars</span>
                    <div className="flex-1 progress-ethereal h-2">
                      <div className="progress-ethereal-bar h-2" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-sm text-text-tertiary w-24">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <img src={review.user.avatar} alt={review.user.name} className="w-10 h-10 rounded-full ring-2 ring-accent-violet/30" />
                      <div>
                        <h4 className="font-medium text-text-primary">{review.user.name}</h4>
                        <p className="text-sm text-text-tertiary">{review.user.followers} followers • {review.date}</p>
                      </div>
                    </div>
                    <button className="text-text-tertiary hover:text-text-secondary transition-colors duration-300">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mb-3">{renderStars(review.rating)}</div>
                  <p className="text-text-secondary leading-relaxed">{review.text}</p>

                  <div className="mt-4 pt-4 border-t border-glass-border flex items-center justify-between">
                    <button className="btn-holographic px-4 py-1 text-sm rounded-element">Follow</button>
                    <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                      <span className="hover:scale-110 transition-transform cursor-pointer">👍 191</span>
                      <span className="hover:scale-110 transition-transform cursor-pointer">💬 51</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetail;