import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Star, TrendingUp, Award, Clock, Sparkles } from 'lucide-react';
import { TextReveal } from '../components/ui';

interface BookData {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  genres: string[];
  reviews: number;
  ratingsCount: string;
  description: string;
  publishYear: number;
  pages: number;
  trending: boolean;
  newRelease: boolean;
  awardWinner: boolean;
  price: string;
}

/**
 * Browse - Ethereal Archive book discovery page
 * Features dark glass cards, holographic badges, and magazine-style grid
 */
const Browse = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'new-releases', label: 'New Releases', icon: Clock },
    { id: 'awards', label: 'Award Winners', icon: Award },
    { id: 'top-rated', label: 'Top Rated', icon: Star }
  ];

  const genres = [
    'Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy',
    'Biography', 'History', 'Self Help', 'Business', 'Young Adult'
  ];

  const books: BookData[] = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.8,
      ratingsCount: "542K",
      reviews: 42891,
      description: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
      genres: ["Fiction", "Romance", "Historical Fiction"],
      publishYear: 2017,
      pages: 400,
      trending: true,
      newRelease: false,
      awardWinner: true,
      price: "$12.99"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.7,
      ratingsCount: "189K",
      reviews: 18432,
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      genres: ["Self Help", "Psychology", "Productivity"],
      publishYear: 2018,
      pages: 320,
      trending: true,
      newRelease: false,
      awardWinner: false,
      price: "$14.99"
    },
    {
      id: 3,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.6,
      ratingsCount: "1.2M",
      reviews: 123567,
      description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast.",
      genres: ["Fiction", "Mystery", "Literary Fiction"],
      publishYear: 2018,
      pages: 368,
      trending: true,
      newRelease: false,
      awardWinner: true,
      price: "$13.99"
    },
    {
      id: 4,
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.5,
      ratingsCount: "98K",
      reviews: 9876,
      description: "In a peaceful retirement village, four friends meet weekly to investigate cold cases.",
      genres: ["Mystery", "Crime", "Humor"],
      publishYear: 2020,
      pages: 336,
      trending: false,
      newRelease: true,
      awardWinner: false,
      price: "$11.99"
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.9,
      ratingsCount: "876K",
      reviews: 87654,
      description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and earns a PhD.",
      genres: ["Memoir", "Biography", "Education"],
      publishYear: 2018,
      pages: 334,
      trending: false,
      newRelease: false,
      awardWinner: true,
      price: "$15.99"
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.4,
      ratingsCount: "445K",
      reviews: 44532,
      description: "A woman's act of violence against her husband triggers a chain of events that will shake her world.",
      genres: ["Thriller", "Mystery", "Psychological"],
      publishYear: 2019,
      pages: 336,
      trending: true,
      newRelease: false,
      awardWinner: false,
      price: "$12.49"
    }
  ];

  const getFilteredBooks = () => {
    let filtered = books;
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (activeCategory) {
      case 'trending': return filtered.filter(book => book.trending);
      case 'new-releases': return filtered.filter(book => book.newRelease);
      case 'awards': return filtered.filter(book => book.awardWinner);
      case 'top-rated': return filtered.sort((a, b) => b.rating - a.rating);
      default: return filtered;
    }
  };

  const BookCard = ({ book, index }: { book: BookData; index: number }) => (
    <motion.div
      className="glass-card overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative">
        <img src={book.cover} alt={book.title} className="w-full h-64 object-cover img-ethereal" />
        {book.trending && (
          <span className="absolute top-2 left-2 bg-accent-fuchsia text-white px-2 py-1 text-xs rounded-button font-medium shadow-glow-fuchsia">
            Trending
          </span>
        )}
        {book.newRelease && (
          <span className="absolute top-2 left-2 bg-accent-violet text-white px-2 py-1 text-xs rounded-button font-medium shadow-glow-sm">
            New
          </span>
        )}
        {book.awardWinner && (
          <span className="absolute top-2 right-2 bg-accent-gold text-void px-2 py-1 text-xs rounded-button font-medium">
            🏆 Award
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-accent-violet transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-sm text-text-secondary mb-2">{book.author}</p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(book.rating) ? 'star-filled' : 'star-empty'}`}>★</span>
            ))}
          </div>
          <span className="text-sm text-text-secondary ml-2 font-accent italic">{book.rating}</span>
          <span className="text-xs text-text-tertiary ml-1">({book.ratingsCount})</span>
        </div>

        <p className="text-xs text-text-tertiary mb-3 line-clamp-2">{book.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {book.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="tag-glass">{genre}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-tertiary">{book.pages} pages</span>
          <span className="font-display font-semibold text-accent-violet">{book.price}</span>
        </div>

        <div className="flex space-x-2">
          <motion.button
            className="flex-1 btn-holographic py-2 px-3 rounded-element text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Want to Read
          </motion.button>
          <motion.button
            className="px-3 py-2 glass-button rounded-element text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Preview
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TextReveal as="h1" className="text-display-lg font-display text-text-primary mb-2">
          Explore the Archive
        </TextReveal>
        <p className="text-text-secondary">Discover your next favorite book from our curated collection</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="glass-card p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-tertiary" />
            </div>
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-ethereal w-full pl-10"
            />
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              className="flex items-center space-x-2 px-4 py-3 glass-button rounded-element text-sm font-medium"
              whileHover={{ scale: 1.02 }}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </motion.button>

            <div className="flex items-center bg-white/[0.03] border border-glass-border rounded-element p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-button transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-holographic text-white' : 'text-text-secondary'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-button transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-holographic text-white' : 'text-text-secondary'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Genre Tags */}
        <div className="mt-4 pt-4 border-t border-glass-border">
          <h3 className="text-sm font-display font-medium text-text-primary mb-3">Popular Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                className="px-3 py-1 glass-button rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
              >
                {genre}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <nav className="flex space-x-1 glass-card p-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-element text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                    ? 'bg-gradient-holographic text-white shadow-glow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-text-secondary">
          Showing {getFilteredBooks().length} books
        </p>
        <select className="input-ethereal px-3 py-2 text-sm">
          <option>Sort by Relevance</option>
          <option>Sort by Rating</option>
          <option>Sort by Price</option>
          <option>Sort by Date</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {getFilteredBooks().map((book, index) => (
          <BookCard key={book.id} book={book} index={index} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <motion.button
          className="btn-holographic px-8 py-3 rounded-element font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Load More Books
        </motion.button>
      </div>
    </div>
  );
};

export default Browse;