import React from 'react';
import { Settings, MoreHorizontal, Heart, MessageCircle } from 'lucide-react';

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
        totalRatings: '16,626,468 ratings'
      },
      review: "Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!",
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
        totalRatings: '1,004,554 ratings'
      },
      review: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us.",
      likes: 34,
      comments: 4
    },
    {
      id: 3,
      user: {
        name: 'Emilee Warren',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
      },
      action: 'rated a book',
      time: '21 February 2025, 9:12am',
      book: {
        title: 'Sunshine',
        author: 'Samantha Leigh',
        cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=80&h=120&fit=crop',
        rating: 4.3,
        totalRatings: '1,304 ratings'
      },
      review: "He's the protective single dad with too much on his plate. She's the wild ray of sunshine with a secret crush. He needs a nanny. She needs a job. Sneaking around was never on the menu.",
      likes: 51,
      comments: 11
    }
  ];

  return (
    <div className="glass rounded-card shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900 leading-tight">Updates</h2>
          <Settings className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-300 hover:rotate-90" />
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {updates.map((update) => (
          <div key={update.id} className="p-6 hover:bg-white/5 transition-all duration-300 group">
            <div className="flex items-start space-x-3">
              <img
                src={update.user.avatar}
                alt={update.user.name}
                className="w-10 h-10 rounded-full flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 group-hover:scale-110"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="font-medium text-gray-900 text-[14px] group-hover:text-green-600 transition-colors duration-300">{update.user.name}</span>
                    <span className="text-[14px] text-gray-600">{update.action}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-300 hover:scale-110" />
                    <span className="text-[14px] text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-300">×</span>
                  </div>
                </div>
                
                <p className="text-[12px] text-gray-500 mb-3">{update.time}</p>
                
                <div className="flex space-x-4">
                  <img
                    src={update.book.cover}
                    alt={update.book.title}
                    className="w-20 h-28 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 text-[14px] line-clamp-2 hover:text-green-600 transition-colors duration-300">{update.book.title}</h3>
                    <p className="text-[12px] text-gray-600 mb-2">{update.book.author}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-[12px] hover:scale-110 transition-transform duration-200">★</span>
                        ))}
                        <span className="text-gray-300 text-[12px]">★</span>
                      </div>
                      <span className="text-[12px] text-gray-600 ml-2">{update.book.rating}/5</span>
                      <span className="text-[11px] text-gray-500 ml-2">({update.book.totalRatings})</span>
                    </div>
                    
                    <p className="text-[12px] text-gray-700 mb-4 line-clamp-3 leading-relaxed">{update.review}</p>
                    
                    <button className="bg-green-600 text-white px-4 py-2 rounded-button text-[12px] font-medium hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-3d mb-4">
                      Want To Read
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-all duration-300 hover:scale-105">
                      <Heart className="h-4 w-4" />
                      <span className="text-[12px]">{update.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-all duration-300 hover:scale-105">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-[12px]">{update.comments} Comments</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="glass border-white/20 rounded-element px-3 py-1 text-[12px] flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 w-32 transition-all duration-300 hover:shadow-3d"
                    />
                    <button className="text-green-600 hover:text-green-700 transition-all duration-300 hover:scale-110">
                      <span className="text-[14px]">➤</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesFeed;