import { useState } from 'react';
import { MessageCircle, Users, BookOpen, TrendingUp, Pin, Heart, Share2, MoreHorizontal } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const communityStats = {
    totalMembers: "2.4M",
    activeDiscussions: "15.6K",
    booksDiscussed: "890K",
    readingChallenges: "1.2K"
  };

  const trendingTopics = [
    { id: 1, title: "Book Recommendations for Winter 2025", posts: 1247, participants: 532 },
    { id: 2, title: "Fantasy Book Club Discussion", posts: 894, participants: 298 },
    { id: 3, title: "Best Non-Fiction Reads of 2024", posts: 672, participants: 411 },
    { id: 4, title: "Reading Challenge Progress", posts: 445, participants: 892 },
    { id: 5, title: "Author Q&A Sessions", posts: 234, participants: 156 }
  ];

  const discussions = [
    {
      id: 1,
      title: "What are your top 5 must-read books for someone just getting into fantasy?",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
        reputation: "Book Enthusiast",
        joinDate: "2020"
      },
      category: "Fantasy",
      replies: 342,
      likes: 89,
      lastActivity: "2 hours ago",
      isPinned: true,
      preview: "I'm new to fantasy and feeling overwhelmed by all the options. I love character-driven stories and don't mind complex world-building. What would you recommend as essential reads?"
    },
    {
      id: 2,
      title: "Monthly Reading Challenge: Share your progress and goals",
      author: {
        name: "Michael Rodriguez",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
        reputation: "Challenge Master",
        joinDate: "2019"
      },
      category: "Reading Challenge",
      replies: 156,
      likes: 234,
      lastActivity: "4 hours ago",
      isPinned: false,
      preview: "How's everyone doing with their reading goals this month? I'm currently at 8/12 books and looking for some quick reads to finish strong!"
    },
    {
      id: 3,
      title: "Book vs Movie: Which adaptations actually improved on the source material?",
      author: {
        name: "Emma Thompson",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
        reputation: "Film & Literature Critic",
        joinDate: "2021"
      },
      category: "General Discussion",
      replies: 78,
      likes: 45,
      lastActivity: "6 hours ago",
      isPinned: false,
      preview: "Controversial opinion: Sometimes the movie is better than the book. Let's discuss adaptations that enhanced the original story..."
    },
    {
      id: 4,
      title: "Self-published gems you discovered this year",
      author: {
        name: "David Kim",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
        reputation: "Indie Book Scout",
        joinDate: "2022"
      },
      category: "Recommendations",
      replies: 92,
      likes: 67,
      lastActivity: "8 hours ago",
      isPinned: false,
      preview: "There's so much talent in the self-published world! Share your favorite indie discoveries and help fellow readers find hidden treasures."
    }
  ];

  const bookClubs = [
    {
      id: 1,
      name: "Modern Classics Book Club",
      members: 1247,
      currentBook: "The Seven Husbands of Evelyn Hugo",
      nextMeeting: "Jan 25, 2025",
      description: "Exploring contemporary literature that's destined to become tomorrow's classics.",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop",
      isJoined: false
    },
    {
      id: 2,
      name: "Sci-Fi & Fantasy Society",
      members: 892,
      currentBook: "Dune",
      nextMeeting: "Jan 28, 2025",
      description: "Journey through otherworldly adventures and futuristic tales.",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop",
      isJoined: true
    },
    {
      id: 3,
      name: "Mystery & Thriller Hub",
      members: 1456,
      currentBook: "The Thursday Murder Club",
      nextMeeting: "Feb 2, 2025",
      description: "Unraveling plots and solving mysteries together.",
      cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop",
      isJoined: false
    }
  ];

  const readingChallenges = [
    {
      id: 1,
      title: "2025 Reading Challenge",
      description: "Read 50 books in 2025",
      participants: 15672,
      progress: 12,
      target: 50,
      deadline: "Dec 31, 2025",
      badge: "🏆"
    },
    {
      id: 2,
      title: "Genre Explorer",
      description: "Read at least one book from 12 different genres",
      participants: 8943,
      progress: 4,
      target: 12,
      deadline: "Dec 31, 2025",
      badge: "🌟"
    },
    {
      id: 3,
      title: "Diverse Voices",
      description: "Read 24 books by authors from underrepresented communities",
      participants: 6721,
      progress: 8,
      target: 24,
      deadline: "Dec 31, 2025",
      badge: "🌍"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Community</h1>
        <p className="text-gray-600">Connect with fellow book lovers, join discussions, and discover your next great read</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-card shadow-3d p-6 text-center hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-card mx-auto mb-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{communityStats.totalMembers}</div>
          <div className="text-sm text-gray-600">Members</div>
        </div>
        
        <div className="glass rounded-card shadow-3d p-6 text-center hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-card mx-auto mb-3">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{communityStats.activeDiscussions}</div>
          <div className="text-sm text-gray-600">Active Discussions</div>
        </div>
        
        <div className="glass rounded-card shadow-3d p-6 text-center hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-card mx-auto mb-3">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{communityStats.booksDiscussed}</div>
          <div className="text-sm text-gray-600">Books Discussed</div>
        </div>
        
        <div className="glass rounded-card shadow-3d p-6 text-center hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-card mx-auto mb-3">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{communityStats.readingChallenges}</div>
          <div className="text-sm text-gray-600">Reading Challenges</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Navigation Tabs */}
          <div className="glass rounded-card shadow-3d mb-6 hover:shadow-3d-hover transition-all duration-300">
            <nav className="flex space-x-1 p-1">
              {[
                { id: 'discussions', label: 'Discussions', icon: MessageCircle },
                { id: 'book-clubs', label: 'Book Clubs', icon: Users },
                { id: 'challenges', label: 'Challenges', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-element text-sm font-medium transition-all duration-300 flex-1 justify-center hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-green-50 text-green-700 border border-green-200 shadow-3d'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/30'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-start space-x-4">
                    <img
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      className="w-12 h-12 rounded-full flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-110"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {discussion.isPinned && (
                            <Pin className="h-4 w-4 text-green-600 flex-shrink-0" />
                          )}
                          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition-colors duration-300">{discussion.title}</h3>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2 transition-colors duration-300">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                        <span className="font-medium">{discussion.author.name}</span>
                        <span className="text-green-600">{discussion.author.reputation}</span>
                        <span>•</span>
                        <span className="px-2 py-1 glass-dark rounded-full text-xs">{discussion.category}</span>
                        <span>•</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{discussion.preview}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes} likes</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'book-clubs' && (
            <div className="space-y-6">
              {bookClubs.map((club) => (
                <div key={club.id} className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-start space-x-4">
                    <img
                      src={club.cover}
                      alt={club.currentBook}
                      className="w-16 h-24 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors duration-300">{club.name}</h3>
                        <button
                          className={`px-4 py-2 rounded-button text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-3d ${
                            club.isJoined
                              ? 'glass text-gray-800 hover:bg-white/30'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {club.isJoined ? 'Joined' : 'Join Club'}
                        </button>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{club.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Members:</span>
                          <span className="ml-2 font-medium">{club.members.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Next Meeting:</span>
                          <span className="ml-2 font-medium">{club.nextMeeting}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Currently Reading:</span>
                          <span className="ml-2 font-medium">{club.currentBook}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {readingChallenges.map((challenge) => (
                <div key={challenge.id} className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{challenge.badge}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors duration-300">{challenge.title}</h3>
                        <p className="text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                      Join Challenge
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress: {challenge.progress} / {challenge.target}</span>
                      <span>{Math.round((challenge.progress / challenge.target) * 100)}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{challenge.participants.toLocaleString()} participants</span>
                    <span>Deadline: {challenge.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={topic.id} className="flex items-start space-x-3 p-2 rounded-element hover:bg-white/30 transition-all duration-300">
                  <span className="text-sm font-bold text-gray-400 mt-1">#{index + 1}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 hover:text-green-600 transition-colors duration-300">{topic.title}</h4>
                    <div className="text-xs text-gray-500">
                      {topic.posts} posts • {topic.participants} participants
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Be respectful to all members</li>
              <li>• Stay on topic in discussions</li>
              <li>• No spoilers without proper tags</li>
              <li>• Provide constructive feedback</li>
              <li>• Help newcomers feel welcome</li>
            </ul>
            <button className="mt-4 text-green-600 text-sm hover:underline transition-colors duration-300">
              Read full guidelines →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-button text-sm font-medium hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Start New Discussion
              </button>
              <button className="w-full glass py-2 px-4 rounded-button text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Create Book Club
              </button>
              <button className="w-full glass py-2 px-4 rounded-button text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Host Reading Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;