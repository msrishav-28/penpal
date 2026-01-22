import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Download, Upload, Search, Filter, BookOpen, Heart, Clock, CheckCircle, Users } from 'lucide-react';
import { TextReveal } from '../components/ui';

/**
 * MyBooks - Ethereal Archive bookshelf page
 * Features dark glass cards, violet accents, and smooth animations
 */
const MyBooks = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');

  const bookStats = {
    all: 25,
    currentlyReading: 4,
    wantToRead: 9,
    read: 12,
    favorite: 4
  };

  const sidebarTabs = [
    { key: 'all', label: 'All Books', count: bookStats.all, icon: BookOpen },
    { key: 'currentlyReading', label: 'Currently Reading', count: bookStats.currentlyReading, icon: Clock },
    { key: 'wantToRead', label: 'Want To Read', count: bookStats.wantToRead, icon: Heart },
    { key: 'read', label: 'Read', count: bookStats.read, icon: CheckCircle },
    { key: 'favorite', label: 'Favorites', count: bookStats.favorite, icon: Heart },
  ];

  const currentlyReadingBooks = [
    {
      id: 1,
      title: "The Adventures of Tom Sawyer",
      author: "Mark Twain",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.7,
      totalRatings: "960K",
      progress: 64,
      currentPage: 132,
      totalPages: 228,
      genres: ["Adventure", "Fiction", "Literature"]
    },
    {
      id: 2,
      title: "The Names",
      author: "Florence Knapp",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "123",
      progress: 37,
      currentPage: 145,
      totalPages: 336,
      genres: ["Literary Fiction", "Contemporary"]
    }
  ];

  const wantToReadBooks = [
    {
      id: 3,
      title: "The Count of Monte Cristo",
      author: "Alexandre Dumas",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "521K",
      genres: ["Adventure", "Historical", "Classic"]
    },
    {
      id: 4,
      title: "Loca",
      author: "Alejandro Heredia",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "123",
      genres: ["Queer", "Fiction", "Contemporary"]
    }
  ];

  const readBooks = [
    {
      id: 5,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "2M",
      genres: ["Self Help", "Psychology", "Productivity"]
    },
    {
      id: 6,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "3M",
      genres: ["Dystopian", "Classic", "Science Fiction"]
    }
  ];

  const studyGroups = [
    { id: 1, name: "Between the Covers", members: 120, role: "Admin" },
    { id: 2, name: "The Gatsby Readers", members: 87, role: "Moderator" },
    { id: 3, name: "Bound by Books", members: 63, role: "Member" },
  ];

  const getCurrentBooks = () => {
    switch (activeTab) {
      case 'currentlyReading': return currentlyReadingBooks;
      case 'wantToRead': return wantToReadBooks;
      case 'read': return readBooks;
      case 'favorite': return [...currentlyReadingBooks, ...wantToReadBooks].slice(0, 4);
      default: return [...currentlyReadingBooks, ...wantToReadBooks, ...readBooks];
    }
  };

  interface BookCardData {
    id: number;
    title: string;
    author: string;
    cover: string;
    rating: number;
    totalRatings: string;
    genres: string[];
    progress?: number;
    currentPage?: number;
    totalPages?: number;
  }

  const BookCard = ({ book, showProgress = false, index = 0 }: { book: BookCardData; showProgress?: boolean; index?: number }) => (
    <motion.div
      className="glass-card overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="flex p-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-20 h-28 object-cover rounded-element flex-shrink-0 img-ethereal"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-display font-semibold text-text-primary text-sm mb-1 line-clamp-2 group-hover:text-accent-violet transition-colors duration-300">
            {book.title}
          </h3>
          <p className="text-sm text-text-secondary mb-2">{book.author}</p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(book.rating) ? 'star-filled' : 'star-empty'}`}>★</span>
              ))}
            </div>
            <span className="text-sm text-text-secondary ml-2 font-accent italic">{book.rating}</span>
            <span className="text-xs text-text-tertiary ml-1">({book.totalRatings})</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {book.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="tag-glass">{genre}</span>
            ))}
          </div>

          {/* Progress Bar */}
          {showProgress && book.progress && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-text-tertiary mb-1">
                <span>{book.currentPage} / {book.totalPages} pages</span>
                <span className="font-accent italic">{book.progress}%</span>
              </div>
              <div className="progress-ethereal h-1.5">
                <motion.div
                  className="progress-ethereal-bar h-1.5"
                  initial={{ width: 0 }}
                  animate={{ width: `${book.progress}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          )}

          <motion.button
            className="btn-holographic px-4 py-1 text-xs rounded-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Bookshelf Navigation */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-display font-semibold text-text-primary mb-4">Bookshelf</h2>
            <nav className="space-y-1">
              {sidebarTabs.map(({ key, label, count, icon: Icon }) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-element text-sm transition-all duration-300 ${activeTab === key
                      ? 'bg-gradient-holographic text-white shadow-glow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                    }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </span>
                  <span className={`text-xs ${activeTab === key ? 'text-white/80' : 'text-text-tertiary'}`}>
                    {count}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.button
              className="w-full mt-4 glass-button py-2 px-4 rounded-element text-sm font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Shelf <span className="text-accent-violet">+</span>
            </motion.button>
          </motion.div>

          {/* Study Groups */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-accent-violet" />
              <h3 className="text-lg font-display font-semibold text-text-primary">Reading Groups</h3>
            </div>
            <div className="space-y-3">
              {studyGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  className="flex items-center space-x-3 p-2 rounded-element hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 rounded-element bg-gradient-holographic flex items-center justify-center text-white text-xs font-medium">
                    {group.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{group.name}</p>
                    <p className="text-xs text-text-tertiary">{group.members} members</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-element ${group.role === 'Admin' ? 'bg-accent-violet/20 text-accent-violet' :
                      group.role === 'Moderator' ? 'bg-accent-fuchsia/20 text-accent-fuchsia' :
                        'bg-white/[0.05] text-text-secondary'
                    }`}>
                    {group.role}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <motion.div
            className="glass-card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <TextReveal as="h1" className="text-display-sm font-display text-text-primary">
                  {activeTab === 'all' ? 'All Books' :
                    activeTab === 'currentlyReading' ? 'Currently Reading' :
                      activeTab === 'wantToRead' ? 'Want To Read' :
                        activeTab === 'read' ? 'Read' : 'Favorites'}
                </TextReveal>
                <p className="text-sm text-text-secondary mt-1">
                  {getCurrentBooks().length} books in your collection
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 glass-button rounded-element text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="h-4 w-4" />
                  <span>Import</span>
                </motion.button>
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 glass-button rounded-element text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="h-4 w-4" />
                  <span>Export</span>
                </motion.button>
                <div className="flex items-center bg-white/[0.03] border border-glass-border rounded-element p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-button transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-holographic text-white' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-button transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-holographic text-white' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-text-tertiary" />
                </div>
                <input
                  type="text"
                  placeholder="Search your books..."
                  className="input-ethereal w-full pl-10"
                />
              </div>
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 glass-button rounded-element text-sm font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getCurrentBooks().map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                showProgress={activeTab === 'currentlyReading' || activeTab === 'all'}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;