import React, { useState } from 'react';
import { Grid, List, Download, Upload, Search, Filter, MoreHorizontal } from 'lucide-react';

const MyBooks: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('all');

  const bookStats = {
    all: 25,
    currentlyReading: 4,
    wantToRead: 9,
    read: 12,
    favorite: 4
  };

  const currentlyReadingBooks = [
    {
      id: 1,
      title: "The Adventures of Tom Sawyer",
      author: "Mark Twain",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.7,
      totalRatings: "960,536",
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
      genres: ["Literary Fiction", "Fiction", "Science Fiction", "Adult Fiction", "Contemporary", "Historical"]
    }
  ];

  const wantToReadBooks = [
    {
      id: 3,
      title: "The Count of Monte Cristo",
      author: "Alexandre Dumas",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "521",
      genres: ["Literary Fiction", "Fiction", "Literature", "Adventure", "Pirate", "Historical", "Action"]
    },
    {
      id: 4,
      title: "Loca",
      author: "Alejandro Heredia",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "123",
      genres: ["Queer", "Fiction", "Journey", "Adult Fiction", "Contemporary", "Historical"]
    }
  ];

  const readBooks = [
    {
      id: 5,
      title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      author: "James Clear",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "153",
      genres: ["Self Help", "Nonfiction", "Psychology", "Personal Development", "Productivity", "Business"]
    },
    {
      id: 6,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.47,
      totalRatings: "3,044,962",
      genres: ["Literary Fiction", "Fiction", "Science Fiction", "Adult Fiction", "Contemporary", "Historical"]
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "Between the Covers",
      members: 120,
      role: "Admin",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
    },
    {
      id: 2,
      name: "The Gatsby Readers",
      members: 87,
      role: "Moderator",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
    },
    {
      id: 3,
      name: "Bound by Books",
      members: 63,
      role: "Member",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
    }
  ];

  const getCurrentBooks = () => {
    switch (activeTab) {
      case 'currentlyReading':
        return currentlyReadingBooks;
      case 'wantToRead':
        return wantToReadBooks;
      case 'read':
        return readBooks;
      case 'favorite':
        return [...currentlyReadingBooks, ...wantToReadBooks].slice(0, 4);
      default:
        return [...currentlyReadingBooks, ...wantToReadBooks, ...readBooks];
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

  const BookCard = ({ book, showProgress = false }: { book: any; showProgress?: boolean }) => (
    <div className="glass rounded-card shadow-3d overflow-hidden hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
      <div className="flex p-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-20 h-28 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 hover:text-green-600 transition-colors duration-300">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          
          <div className="flex items-center mb-2">
            {renderStars(book.rating)}
            <span className="text-sm text-gray-600 ml-2">{book.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({book.totalRatings} ratings)</span>
          </div>

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

          {showProgress && book.progress && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>{book.currentPage} / {book.totalPages} Pages</span>
                <span>({book.progress}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500 hover:shadow-glow" 
                  style={{ width: `${book.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button className="bg-gray-900 text-white px-4 py-1 text-xs rounded-button hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Bookshelf Navigation */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bookshelf</h2>
            <nav className="space-y-2">
              {[
                { key: 'all', label: 'All', count: bookStats.all },
                { key: 'currentlyReading', label: 'Currently Reading', count: bookStats.currentlyReading },
                { key: 'wantToRead', label: 'Want To Read', count: bookStats.wantToRead },
                { key: 'read', label: 'Read', count: bookStats.read },
                { key: 'favorite', label: 'Favorite', count: bookStats.favorite }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center justify-between p-2 rounded-element text-sm transition-all duration-300 hover:scale-105 ${
                    activeTab === item.key
                      ? 'bg-gray-900 text-white shadow-3d'
                      : 'text-gray-700 hover:bg-white/30'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`text-xs ${activeTab === item.key ? 'text-gray-300' : 'text-gray-500'}`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </nav>
            
            <button className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded-button text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d flex items-center justify-center">
              Add New Shelf <span className="ml-2">+</span>
            </button>
          </div>

          {/* Reading Activity */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reading Activity</h3>
            <nav className="space-y-3">
              <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-all duration-300 hover:translate-x-1">
                <span className="mr-3">📝</span>
                Review Drafts
              </a>
              <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-all duration-300 hover:translate-x-1">
                <span className="mr-3">✏️</span>
                Kindle Notes & Highlights
              </a>
              <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-all duration-300 hover:translate-x-1">
                <span className="mr-3">🎯</span>
                Reading Challenge
              </a>
              <a href="#" className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-all duration-300 hover:translate-x-1">
                <span className="mr-3">📊</span>
                Reading stats
              </a>
            </nav>
          </div>

          {/* Study Groups */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Study Groups</h3>
            <div className="space-y-3">
              {studyGroups.map((group) => (
                <div key={group.id} className="flex items-center space-x-3 p-2 rounded-element hover:bg-white/30 transition-all duration-300">
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className="w-8 h-8 rounded-element object-cover shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-110"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{group.name}</p>
                    <p className="text-xs text-gray-500">{group.members} members</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-element ${
                    group.role === 'Admin' ? 'bg-green-100 text-green-800' :
                    group.role === 'Moderator' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {group.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="glass rounded-card shadow-3d p-6 mb-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'all' ? 'All Books' :
                   activeTab === 'currentlyReading' ? 'Currently Reading' :
                   activeTab === 'wantToRead' ? 'Want To Read' :
                   activeTab === 'read' ? 'Read' : 'Favorite'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Total: {getCurrentBooks().length}
                </p>
                <p className="text-sm text-gray-500">
                  View and manage your entire book collection in one place.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 glass rounded-button text-sm font-medium text-gray-700 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                  <Download className="h-4 w-4" />
                  <span>Import</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 glass rounded-button text-sm font-medium text-gray-700 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                  <Upload className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <div className="flex items-center glass rounded-element">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-element transition-all duration-300 hover:scale-110 ${viewMode === 'grid' ? 'bg-white/50 shadow-3d' : ''}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-element transition-all duration-300 hover:scale-110 ${viewMode === 'list' ? 'bg-white/50 shadow-3d' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search your books..."
                  className="w-full pl-10 pr-3 py-2 glass rounded-element leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-sm transition-all duration-300 hover:shadow-3d"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 glass rounded-button text-sm font-medium text-gray-700 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Books Grid/List */}
          <div className="space-y-6">
            {activeTab === 'currentlyReading' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Currently Reading</h2>
                  <span className="text-sm text-gray-500">Total: {currentlyReadingBooks.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentlyReadingBooks.map((book) => (
                    <BookCard key={book.id} book={book} showProgress={true} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wantToRead' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Want To Read</h2>
                  <span className="text-sm text-gray-500">Total: {wantToReadBooks.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wantToReadBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'read' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Read</h2>
                  <span className="text-sm text-gray-500">Total: {readBooks.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {readBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'all' && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Currently Reading</h2>
                    <button className="text-sm text-green-600 hover:text-green-700 transition-colors duration-300">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentlyReadingBooks.map((book) => (
                      <BookCard key={book.id} book={book} showProgress={true} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Want To Read</h2>
                    <button className="text-sm text-green-600 hover:text-green-700 transition-colors duration-300">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wantToReadBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Read</h2>
                    <button className="text-sm text-green-600 hover:text-green-700 transition-colors duration-300">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {readBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorite' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Favorite Books</h2>
                  <span className="text-sm text-gray-500">Total: 4</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCurrentBooks().slice(0, 4).map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;