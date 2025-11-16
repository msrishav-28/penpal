import { useState } from 'react';
import { Search, Filter, Grid, List, Star, TrendingUp, Award, Clock } from 'lucide-react';

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
    'Biography', 'History', 'Self Help', 'Business', 'Young Adult',
    'Children', 'Horror', 'Thriller', 'Comedy', 'Drama'
  ];

  const books = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.8,
      ratingsCount: "542,891",
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
      ratingsCount: "189,432",
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
      ratingsCount: "1,234,567",
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
      ratingsCount: "98,765",
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
      ratingsCount: "876,543",
      reviews: 87654,
      description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
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
      ratingsCount: "445,321",
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
      case 'trending':
        return filtered.filter(book => book.trending);
      case 'new-releases':
        return filtered.filter(book => book.newRelease);
      case 'awards':
        return filtered.filter(book => book.awardWinner);
      case 'top-rated':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < fullStars
                ? 'text-orange-400'
                : i === fullStars && hasHalfStar
                ? 'text-orange-400'
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const BookCard = ({ book }: { book: BookData }) => (
    <div className="glass rounded-card shadow-3d overflow-hidden hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] group">
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        {book.trending && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-element shadow-3d">
            Trending
          </span>
        )}
        {book.newRelease && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded-element shadow-3d">
            New
          </span>
        )}
        {book.awardWinner && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded-element shadow-3d">
            Award Winner
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        
        <div className="flex items-center mb-2">
          {renderStars(book.rating)}
          <span className="text-sm text-gray-600 ml-2">{book.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({book.ratingsCount})</span>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{book.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {book.genres.slice(0, 3).map((genre: string) => (
            <span
              key={genre}
              className="px-2 py-1 glass-dark text-xs rounded-element text-gray-700 hover:scale-105 transition-transform duration-200"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">{book.pages} pages</span>
          <span className="font-semibold text-green-600">{book.price}</span>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-button text-sm font-medium hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-3d">
            Want to Read
          </button>
          <button className="px-3 py-2 glass rounded-button text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
            Preview
          </button>
        </div>
      </div>
    </div>
  );

  const BookListItem = ({ book }: { book: BookData }) => (
    <div className="glass rounded-card shadow-3d p-4 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
      <div className="flex space-x-4">
        <div className="relative">
          <img
            src={book.cover}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
          />
          {book.trending && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white px-1 py-0.5 text-xs rounded-element shadow-3d">
              Hot
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1 hover:text-green-600 transition-colors duration-300">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
              
              <div className="flex items-center mb-2">
                {renderStars(book.rating)}
                <span className="text-sm text-gray-600 ml-2">{book.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({book.ratingsCount} ratings)</span>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {book.genres.slice(0, 4).map((genre: string) => (
                  <span
                    key={genre}
                    className="px-2 py-1 glass-dark text-xs rounded-element text-gray-700 hover:scale-105 transition-transform duration-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{book.publishYear}</span>
                <span>{book.pages} pages</span>
                <span className="font-semibold text-green-600">{book.price}</span>
              </div>
            </div>

            <div className="ml-4 flex flex-col space-y-2">
              <button className="bg-green-600 text-white py-2 px-4 rounded-button text-sm font-medium hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Want to Read
              </button>
              <button className="glass py-2 px-4 rounded-button text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Books</h1>
        <p className="text-gray-600">Discover your next favorite book from our curated collection</p>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-card shadow-3d p-6 mb-8 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-3 glass rounded-element leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 hover:shadow-3d"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-3 glass rounded-button text-sm font-medium text-gray-700 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center glass rounded-element">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-element transition-all duration-300 hover:scale-110 ${viewMode === 'grid' ? 'bg-white/50 shadow-3d' : ''}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-element transition-all duration-300 hover:scale-110 ${viewMode === 'list' ? 'bg-white/50 shadow-3d' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Genre Tags */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Genres</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                className="px-3 py-1 glass-dark text-gray-700 rounded-full text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-1 glass rounded-card p-1 shadow-3d">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-element text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-white text-gray-900 shadow-3d'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          Showing {getFilteredBooks().length} books
        </p>
        <select className="glass rounded-element px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 hover:shadow-3d">
          <option>Sort by Relevance</option>
          <option>Sort by Rating</option>
          <option>Sort by Price: Low to High</option>
          <option>Sort by Price: High to Low</option>
          <option>Sort by Publication Date</option>
        </select>
      </div>

      {/* Books Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredBooks().map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {getFilteredBooks().map((book) => (
            <BookListItem key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="bg-gray-900 text-white px-8 py-3 rounded-button font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
          Load More Books
        </button>
      </div>

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleBarcodeScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};

export default Browse;