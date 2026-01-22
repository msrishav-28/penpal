import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, BookOpen, Globe, Twitter, Sparkles } from 'lucide-react';
import { TextReveal } from '../components/ui';

const AuthorProfile = () => {
  const [activeTab, setActiveTab] = useState('books');

  const author = {
    name: "J.K. Rowling",
    nickname: "Robert Galbraith",
    photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    followers: "229,671",
    info: {
      born: "In Yate, South Gloucestershire, England, The United Kingdom July 31, 1965",
      website: "http://www.jkrowling.com",
      twitter: "jk_rowling",
      published: "June 30, 1997 by Bloomsbury Publishing",
      influences: "Jane Austen, Geoffrey Chaucer, Oscar Wilde, C.S. Lewis"
    },
    bio: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling...",
    followerAvatars: Array(10).fill("https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop")
  };

  const books = [
    { id: 1, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", rating: 4.7, genres: ["Fantasy", "Fiction", "Magic"] },
    { id: 2, title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", rating: 4.6, genres: ["Fantasy", "Fiction", "Magic"] },
    { id: 3, title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", rating: 4.5, genres: ["Fantasy", "Fiction", "Magic"] },
    { id: 4, title: "Harry Potter and the Deathly Hallows", author: "J.K. Rowling", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop", rating: 4.4, genres: ["Fantasy", "Fiction", "Magic"] }
  ];

  const news = [
    { id: 1, title: "Kristin Hannah Writes an American Epic", excerpt: "When Kristin Hannah, the bestselling author of The Nightingale, began her new historical epic...", image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", likes: 191, comments: 51 },
    { id: 2, title: "Meet the Hottest Debut Novels of 2025", excerpt: "One of the annual delights of maintaining a serious reading habit is the thrill of discovery...", image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", likes: 232, comments: 44 }
  ];

  const videos = [
    { id: 1, title: "Author Interview", thumbnail: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", duration: "12:45" },
    { id: 2, title: "Behind the Scenes", thumbnail: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop", duration: "8:32" }
  ];

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-accent-gold' : 'text-text-tertiary'}`}>★</span>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Author Info */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="glass-card p-6 sticky top-8">
            <div className="relative group mb-6">
              <img src={author.photo} alt={author.name} className="w-full max-w-xs mx-auto rounded-element img-ethereal ring-4 ring-accent-violet/30" />
              <div className="absolute inset-0 rounded-element bg-gradient-to-t from-accent-violet/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <motion.button
              className="w-full btn-holographic py-3 px-4 rounded-element font-medium mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Follow Author
            </motion.button>

            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-text-primary mb-2 flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-accent-violet" />
                {author.name}'s Followers
              </h2>
              <p className="text-text-secondary mb-4">{author.followers} followers</p>
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {author.followerAvatars.slice(0, 12).map((avatar, index) => (
                  <motion.img
                    key={index}
                    src={avatar}
                    alt="Follower"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-accent-violet/30"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                ))}
              </div>
              <button className="text-accent-violet text-sm hover:text-accent-fuchsia transition-colors duration-300">More followers</button>
            </div>

            {/* Videos Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Play className="w-4 h-4 text-accent-fuchsia" />
                Videos
              </h3>
              <div className="space-y-3">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img src={video.thumbnail} alt={video.title} className="w-full h-24 object-cover rounded-element" />
                    <div className="absolute inset-0 bg-void/60 flex items-center justify-center rounded-element group-hover:bg-void/40 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-accent-violet/80 flex items-center justify-center group-hover:bg-accent-fuchsia/80 transition-colors">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-void/70 text-text-primary text-xs px-2 py-1 rounded-element">
                      {video.duration}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Main Content */}
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Author Header */}
          <div>
            <TextReveal as="h1" className="text-display-lg font-display text-text-primary mb-4">
              {author.name}
            </TextReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm glass-card p-6 mb-6">
              <div>
                <h4 className="font-medium text-text-primary">Nickname</h4>
                <p className="text-text-secondary">{author.nickname}</p>
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Born</h4>
                <p className="text-text-secondary">{author.info.born}</p>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent-violet" />
                <a href={author.info.website} className="text-accent-violet hover:text-accent-fuchsia transition-colors duration-300">{author.info.website}</a>
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-accent-fuchsia" />
                <span className="text-text-secondary">@{author.info.twitter}</span>
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Published</h4>
                <p className="text-text-secondary">{author.info.published}</p>
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Influences</h4>
                <p className="text-text-secondary">{author.info.influences}</p>
              </div>
            </div>
          </div>

          {/* About The Author */}
          <div>
            <h2 className="text-xl font-display font-bold text-text-primary mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-violet" />
              About The Author
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">{author.bio}</p>
            <button className="text-accent-violet hover:text-accent-fuchsia transition-colors duration-300">View More</button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-glass-border">
            <nav className="-mb-px flex space-x-8">
              {['books', 'news'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-all duration-300 capitalize ${activeTab === tab
                      ? 'border-accent-violet text-accent-violet'
                      : 'border-transparent text-text-tertiary hover:text-text-secondary hover:border-glass-border'
                    }`}
                >
                  {tab === 'books' ? (
                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Books</span>
                  ) : (
                    <span>Related News</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'books' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-text-primary">{author.name}'s books</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    className="glass-card p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex space-x-4">
                      <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded-element flex-shrink-0 img-ethereal" />
                      <div className="flex-1">
                        <h3 className="font-medium text-text-primary mb-1 hover:text-accent-violet transition-colors duration-300">{book.title}</h3>
                        <p className="text-sm text-text-secondary mb-2">{book.author}</p>

                        <div className="flex items-center mb-3">
                          {renderStars(book.rating)}
                          <span className="text-sm text-text-secondary ml-2">{book.rating}/5</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {book.genres.map((genre) => (
                            <span key={genre} className="tag-glass text-xs">{genre}</span>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <button className="btn-holographic px-3 py-1 text-xs rounded-element">Read More</button>
                          <button className="glass-button px-3 py-1 text-xs rounded-element">Want To Read</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-accent-violet hover:text-accent-fuchsia transition-colors duration-300">More books by {author.name}...</button>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <h2 className="text-xl font-display font-bold text-text-primary mb-6">Related News</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((article, index) => (
                  <motion.div
                    key={article.id}
                    className="glass-card overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-text-primary mb-2 hover:text-accent-violet transition-colors duration-300">{article.title}</h3>
                      <p className="text-sm text-text-secondary mb-4 line-clamp-3">{article.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <button className="btn-holographic px-4 py-2 text-sm rounded-element">Read More</button>
                        <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                          <span className="hover:scale-110 transition-transform cursor-pointer">👍 {article.likes}</span>
                          <span className="hover:scale-110 transition-transform cursor-pointer">💬 {article.comments}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-accent-violet hover:text-accent-fuchsia transition-colors duration-300">More News ...</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthorProfile;