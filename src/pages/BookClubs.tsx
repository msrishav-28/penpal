import { useState } from 'react';
import { Users, Plus, BookOpen, Calendar, MessageCircle, Lock, Globe, Search } from 'lucide-react';

const mockClubs = [
  {
    id: '1',
    name: 'Sci-Fi Enthusiasts',
    description: 'Exploring the cosmos one book at a time',
    members: 234,
    currentBook: 'Dune by Frank Herbert',
    coverUrl: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
    privacy: 'public',
    nextMeeting: '2024-11-20',
    progress: 67
  },
  {
    id: '2',
    name: 'Mystery Book Club',
    description: 'Solving mysteries together',
    members: 156,
    currentBook: 'The Silent Patient by Alex Michaelides',
    coverUrl: 'https://covers.openlibrary.org/b/id/8904777-L.jpg',
    privacy: 'private',
    nextMeeting: '2024-11-18',
    progress: 45
  },
  {
    id: '3',
    name: 'Classic Literature Society',
    description: 'Rediscovering timeless masterpieces',
    members: 89,
    currentBook: 'Pride and Prejudice by Jane Austen',
    coverUrl: 'https://covers.openlibrary.org/b/id/8225768-L.jpg',
    privacy: 'public',
    nextMeeting: '2024-11-25',
    progress: 80
  }
];

export default function BookClubs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              📖 Book Clubs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join communities and read together
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Club
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search book clubs..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Your Clubs</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Discussions</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Meetings</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">847</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Members</div>
          </div>
        </div>

        {/* Club Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all hover:scale-105"
            >
              {/* Club Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {club.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
                    {club.privacy === 'public' ? (
                      <><Globe className="w-3 h-3" /> Public</>
                    ) : (
                      <><Lock className="w-3 h-3" /> Private</>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {club.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{club.members} members</span>
                </div>
              </div>

              {/* Current Book */}
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-800/50">
                <div className="flex gap-4">
                  <img
                    src={club.coverUrl}
                    alt={club.currentBook}
                    className="w-16 h-24 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/128x192?text=No+Cover';
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Currently Reading
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                      {club.currentBook}
                    </h4>
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${club.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {club.progress}% complete
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Next: {new Date(club.nextMeeting).toLocaleDateString()}</span>
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                  <MessageCircle className="w-4 h-4" />
                  Join Discussion
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Club Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Create New Book Club
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Club Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter club name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="What's your club about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Privacy
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
                    <option value="public">Public - Anyone can join</option>
                    <option value="private">Private - Invite only</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    Create Club
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
