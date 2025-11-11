import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const BookDetail = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Mock book data - in real app, this would come from API
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
    description: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal...",
    awards: "Literary awards: Nestlé Smarties Book Prize for Children's Literature (1998), British Book Award for Children's Book of the Year (1998), Kate Greenaway Medal Nominee (2017), Prix van de Nederlandse Kinderjury for 6-9 jaar (2002), American Booksellers Book Of The Year Award for Children (1999)."
  };

  const relatedBooks = [
    {
      id: 2,
      title: "Harry Potter and the Chamber of Secrets",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop"
    },
    {
      id: 3,
      title: "The Alchemist",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop"
    },
    {
      id: 4,
      title: "The Count of Monte Cristo",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop"
    },
    {
      id: 5,
      title: "The Adventures of Tom Sawyer",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=150&h=225&fit=crop"
    }
  ];

  const reviews = [
    {
      id: 1,
      user: {
        name: "Jayson Lawrence",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
        followers: "3734"
      },
      rating: 5,
      date: "May 12, 2019",
      text: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal grandmother Kathleen Ada Bulgen Rowling."
    },
    {
      id: 2,
      user: {
        name: "Jayson Lawrence",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
        followers: "3734"
      },
      rating: 5,
      date: "May 12, 2019",
      text: "Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal grandmother Kathleen Ada Bulgen Rowling."
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 6627141, percentage: 70 },
    { stars: 4, count: 2314481, percentage: 25 },
    { stars: 3, count: 605710, percentage: 6 },
    { stars: 2, count: 402134, percentage: 4 },
    { stars: 1, count: 662710, percentage: 7 }
  ];

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && setSelectedRating(star)}
            className={`text-lg ${
              star <= (interactive ? selectedRating : Math.floor(rating))
                ? 'text-orange-400'
                : 'text-gray-300'
            } ${interactive ? 'hover:text-orange-400 cursor-pointer transition-colors duration-200' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Book Cover and Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full max-w-sm mx-auto rounded-card shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
            />
            
            <div className="mt-6 space-y-3">
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-button font-medium hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Want to Read
              </button>
              
              <button className="w-full glass text-gray-800 py-3 px-4 rounded-button font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Buy on Amazon
              </button>
            </div>

            <div className="mt-6 glass rounded-card p-4 shadow-3d hover:shadow-3d-hover transition-all duration-300">
              <h3 className="font-medium text-gray-900 mb-3">Rate It:</h3>
              {renderStars(0, true)}
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span>★ ★ ★ ★ ★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Book Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 mb-4">by <Link to={`/author/${author.name}`} className="text-green-600 hover:underline transition-colors duration-300">{book.author}</Link></p>
            
            <div className="flex items-center space-x-4 mb-4">
              {renderStars(book.rating)}
              <span className="text-lg font-medium">{book.rating}/5</span>
              <span className="text-gray-500">({book.ratingsCount} ratings • {book.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop"
                      alt="Reader"
                      className="w-6 h-6 rounded-full border-2 border-white shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-110"
                    />
                  ))}
                </div>
                <span>{book.currentlyReading} people are currently reading</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop"
                      alt="Reader"
                      className="w-6 h-6 rounded-full border-2 border-white shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-110"
                    />
                  ))}
                </div>
                <span>{book.wantToRead} people want to read</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>

            {/* Genre Tags */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 glass-dark text-gray-700 rounded-full text-sm hover:bg-white/30 cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900">Series</h4>
                <p className="text-gray-600">{book.details.series}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Format</h4>
                <p className="text-gray-600">{book.details.format}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Published</h4>
                <p className="text-gray-600">{book.details.published}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Original Title</h4>
                <p className="text-gray-600">{book.details.originalTitle}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Language</h4>
                <p className="text-gray-600">{book.details.language}</p>
              </div>
            </div>
          </div>

          {/* About The Author */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About The Author</h2>
            <div className="glass rounded-card p-6 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
              <div className="flex items-start space-x-4">
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-20 h-20 rounded-card object-cover shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{author.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{author.nickname}</p>
                  <p className="text-sm text-gray-600 mb-3">{author.followers} followers</p>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                    Follow
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-4 leading-relaxed">{author.description}</p>
              <button className="text-green-600 text-sm mt-2 hover:underline transition-colors duration-300">View More</button>
            </div>
          </div>

          {/* Readers Also Enjoyed */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Readers also enjoyed</h2>
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {relatedBooks.map((relatedBook) => (
                  <div key={relatedBook.id} className="flex-shrink-0">
                    <img
                      src={relatedBook.cover}
                      alt={relatedBook.title}
                      className="w-32 h-48 object-cover rounded-card cursor-pointer hover:shadow-3d-hover transition-all duration-300 hover:scale-105 shadow-3d"
                    />
                  </div>
                ))}
              </div>
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 glass shadow-3d rounded-full p-2 hover:bg-white/30 hover:shadow-3d-hover transition-all duration-300 hover:scale-110">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 glass shadow-3d rounded-full p-2 hover:bg-white/30 hover:shadow-3d-hover transition-all duration-300 hover:scale-110">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Ratings & Reviews */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ratings & Reviews</h2>
            
            {/* Write Review */}
            <div className="glass rounded-card p-4 mb-6 shadow-3d hover:shadow-3d-hover transition-all duration-300">
              <textarea
                placeholder="Write your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full h-24 p-3 glass rounded-element resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Rate This Book:</span>
                  {renderStars(0, true)}
                </div>
                <button className="bg-gray-900 text-white px-6 py-2 rounded-button text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                  Submit
                </button>
              </div>
            </div>

            {/* Community Rating */}
            <div className="glass rounded-card p-6 mb-6 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Review</h3>
              <div className="flex items-center space-x-4 mb-4">
                {renderStars(book.rating)}
                <span className="text-2xl font-bold">{book.rating}</span>
                <span className="text-gray-500">({book.ratingsCount} ratings • {book.reviewsCount} reviews)</span>
              </div>
              
              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-6">{item.stars} Stars</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-20">{item.count.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="glass rounded-card p-6 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-110"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                        <p className="text-sm text-gray-500">{review.user.followers} followers • {review.date}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                    <button className="bg-gray-900 text-white px-4 py-1 rounded-button text-sm hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                      Follow
                    </button>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="hover:scale-110 transition-transform duration-200 cursor-pointer">👍 191</span>
                      <span className="hover:scale-110 transition-transform duration-200 cursor-pointer">💬 51</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;