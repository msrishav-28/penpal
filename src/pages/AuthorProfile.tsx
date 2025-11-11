import { useState } from 'react';
import { Play } from 'lucide-react';

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
    bio: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal",
    followerAvatars: [
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
    ]
  };

  const books = [
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.7,
      genres: ["Fantasy", "Fiction", "Magic"]
    },
    {
      id: 2,
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.6,
      genres: ["Fantasy", "Fiction", "Magic"]
    },
    {
      id: 3,
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.5,
      genres: ["Fantasy", "Fiction", "Magic"]
    },
    {
      id: 4,
      title: "Harry Potter and the Deathly Hallows",
      author: "J.K. Rowling",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop",
      rating: 4.4,
      genres: ["Fantasy", "Fiction", "Magic"]
    }
  ];

  const news = [
    {
      id: 1,
      title: "Kristin Hannah Writes an American Epic",
      excerpt: "When Kristin Hannah, the bestselling author of The Nightingale, began her new historical epic centered on the Dust Bowl and the Great...",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      likes: 191,
      comments: 51
    },
    {
      id: 2,
      title: "Meet the Hottest Debut Novels of 2025",
      excerpt: "One of the annual delights of maintaining a serious reading habit is the thrill of discovery. Each year, a new group of first-time authors...",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      likes: 232,
      comments: 44
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Author Interview",
      thumbnail: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      duration: "12:45"
    },
    {
      id: 2,
      title: "Behind the Scenes",
      thumbnail: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      duration: "8:32"
    }
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Author Info */}
        <div className="lg:col-span-1">
          <div className="glass rounded-card shadow-3d p-6 sticky top-8 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
            <img
              src={author.photo}
              alt={author.name}
              className="w-full max-w-xs mx-auto rounded-card mb-6 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
            />
            
            <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-button font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d mb-6">
              Follow Author
            </button>

            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{author.name}'s Followers ({author.followers})</h2>
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {author.followerAvatars.slice(0, 12).map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt="Follower"
                    className="w-8 h-8 rounded-full object-cover shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-110"
                  />
                ))}
              </div>
              <button className="text-green-600 text-sm hover:underline transition-colors duration-300">More followers</button>
            </div>

            {/* Videos Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Videos</h3>
              <div className="space-y-3">
                {videos.map((video) => (
                  <div key={video.id} className="relative group cursor-pointer">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-24 object-cover rounded-element shadow-3d hover:shadow-3d-hover transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-element group-hover:bg-opacity-40 transition-all duration-300">
                      <Play className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-element">
                      {video.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Author Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{author.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <h4 className="font-medium text-gray-900">Nickname</h4>
                <p className="text-gray-600">{author.nickname}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Born</h4>
                <p className="text-gray-600">{author.info.born}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Website</h4>
                <a href={author.info.website} className="text-green-600 hover:underline transition-colors duration-300">{author.info.website}</a>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Twitter</h4>
                <p className="text-gray-600">{author.info.twitter}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Published</h4>
                <p className="text-gray-600">{author.info.published}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Influences</h4>
                <p className="text-gray-600">{author.info.influences}</p>
              </div>
            </div>
          </div>

          {/* About The Author */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">About The Author</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{author.bio}</p>
            <button className="text-green-600 hover:underline transition-colors duration-300">View More</button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('books')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'books'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Books
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'news'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Related News
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'books' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{author.name}'s books</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book) => (
                  <div key={book.id} className="glass rounded-card p-4 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex space-x-4">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-20 h-28 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1 hover:text-green-600 transition-colors duration-300">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                        
                        <div className="flex items-center mb-3">
                          {renderStars(book.rating)}
                          <span className="text-sm text-gray-600 ml-2">{book.rating}/5</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {book.genres.map((genre) => (
                            <span
                              key={genre}
                              className="px-2 py-1 glass-dark text-xs rounded-element text-gray-700 hover:scale-105 transition-transform duration-200"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <button className="bg-gray-900 text-white px-3 py-1 text-xs rounded-button hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                            Read More
                          </button>
                          <button className="bg-green-600 text-white px-3 py-1 text-xs rounded-button hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                            Want To Read
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <button className="text-green-600 hover:underline transition-colors duration-300">More books by {author.name}...</button>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Related News</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((article) => (
                  <div key={article.id} className="glass rounded-card overflow-hidden shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors duration-300">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <button className="bg-gray-900 text-white px-4 py-2 text-sm rounded-button hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                          Read More
                        </button>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="hover:scale-110 transition-transform duration-200 cursor-pointer">👍 {article.likes}</span>
                          <span className="hover:scale-110 transition-transform duration-200 cursor-pointer">💬 {article.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <button className="text-green-600 hover:underline transition-colors duration-300">More News ...</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;