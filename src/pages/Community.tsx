 import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, BookOpen, TrendingUp, Pin, Heart, Share2, MoreHorizontal, Sparkles } from 'lucide-react';
import { TextReveal } from '../components/ui';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const communityStats = { totalMembers: "2.4M", activeDiscussions: "15.6K", booksDiscussed: "890K", readingChallenges: "1.2K" };

  const trendingTopics = [
    { id: 1, title: "Book Recommendations for Winter 2025", posts: 1247, participants: 532 },
    { id: 2, title: "Fantasy Book Club Discussion", posts: 894, participants: 298 },
    { id: 3, title: "Best Non-Fiction Reads of 2024", posts: 672, participants: 411 }
  ];

  const discussions = [
    { id: 1, title: "What are your top 5 must-read fantasy books?", author: { name: "Sarah Chen", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop", reputation: "Book Enthusiast" }, category: "Fantasy", replies: 342, likes: 89, lastActivity: "2 hours ago", isPinned: true, preview: "I'm new to fantasy and overwhelmed..." },
    { id: 2, title: "Monthly Reading Challenge: Share your progress", author: { name: "Michael R.", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop", reputation: "Challenge Master" }, category: "Challenge", replies: 156, likes: 234, lastActivity: "4 hours ago", isPinned: false, preview: "How's everyone doing this month?" }
  ];

  const bookClubs = [
    { id: 1, name: "Modern Classics Club", members: 1247, currentBook: "Evelyn Hugo", nextMeeting: "Jan 25", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop", isJoined: false },
    { id: 2, name: "Sci-Fi Society", members: 892, currentBook: "Dune", nextMeeting: "Jan 28", cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop", isJoined: true }
  ];

  const challenges = [
    { id: 1, title: "2025 Reading Challenge", description: "Read 50 books", participants: 15672, progress: 12, target: 50, badge: "🏆" },
    { id: 2, title: "Genre Explorer", description: "Read 12 genres", participants: 8943, progress: 4, target: 12, badge: "🌟" }
  ];

  const statItems = [
    { icon: Users, label: 'Members', value: communityStats.totalMembers, gradient: 'from-accent-violet to-accent-fuchsia' },
    { icon: MessageCircle, label: 'Discussions', value: communityStats.activeDiscussions, gradient: 'from-accent-fuchsia to-accent-violet' },
    { icon: BookOpen, label: 'Books', value: communityStats.booksDiscussed, gradient: 'from-accent-violet to-accent-gold' },
    { icon: TrendingUp, label: 'Challenges', value: communityStats.readingChallenges, gradient: 'from-accent-fuchsia to-accent-gold' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-accent-violet" />
          <TextReveal as="h1" className="text-display-lg font-display text-text-primary">Community</TextReveal>
        </div>
        <p className="text-text-secondary">Connect with fellow book lovers</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statItems.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} className={`glass-card bg-gradient-to-br ${stat.gradient} p-6 text-center`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }}>
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-element mx-auto mb-3"><Icon className="h-6 w-6 text-white" /></div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div className="glass-card mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <nav className="flex space-x-1 p-1">
              {[{ id: 'discussions', label: 'Discussions', icon: MessageCircle }, { id: 'clubs', label: 'Book Clubs', icon: Users }, { id: 'challenges', label: 'Challenges', icon: TrendingUp }].map(tab => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-3 rounded-element text-sm font-medium transition-all flex-1 justify-center ${activeTab === tab.id ? 'bg-gradient-holographic text-white shadow-glow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`}>
                    <Icon className="h-4 w-4" /><span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>

          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {discussions.map((d, i) => (
                <motion.div key={d.id} className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} whileHover={{ y: -2 }}>
                  <div className="flex items-start space-x-4">
                    <img src={d.author.avatar} alt={d.author.name} className="w-12 h-12 rounded-full ring-2 ring-accent-violet/30" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {d.isPinned && <Pin className="h-4 w-4 text-accent-gold" />}
                        <h3 className="font-semibold text-text-primary hover:text-accent-violet transition-colors">{d.title}</h3>
                        <button className="ml-auto text-text-tertiary"><MoreHorizontal className="h-5 w-5" /></button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                        <span>{d.author.name}</span><span className="text-accent-violet">{d.author.reputation}</span><span className="tag-glass text-xs">{d.category}</span>
                      </div>
                      <p className="text-text-secondary text-sm mb-4">{d.preview}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-text-tertiary">
                          <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" />{d.replies}</span>
                          <span className="flex items-center gap-1"><Heart className="h-4 w-4" />{d.likes}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-text-tertiary hover:text-accent-fuchsia"><Heart className="h-4 w-4" /></button>
                          <button className="text-text-tertiary hover:text-accent-violet"><Share2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'clubs' && (
            <div className="space-y-6">
              {bookClubs.map((club, i) => (
                <motion.div key={club.id} className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} whileHover={{ y: -2 }}>
                  <div className="flex items-start space-x-4">
                    <img src={club.cover} alt={club.currentBook} className="w-16 h-24 object-cover rounded-element img-ethereal" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">{club.name}</h3>
                        <button className={`px-4 py-2 rounded-element text-sm font-medium ${club.isJoined ? 'glass-button' : 'btn-holographic'}`}>{club.isJoined ? 'Joined' : 'Join'}</button>
                      </div>
                      <div className="text-sm text-text-secondary"><span>Members: {club.members}</span> | <span>Next: {club.nextMeeting}</span></div>
                      <div className="text-sm mt-2"><span className="text-text-tertiary">Reading:</span> <span className="text-accent-violet">{club.currentBook}</span></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {challenges.map((c, i) => (
                <motion.div key={c.id} className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3"><span className="text-3xl">{c.badge}</span><div><h3 className="font-semibold text-text-primary">{c.title}</h3><p className="text-text-secondary text-sm">{c.description}</p></div></div>
                    <button className="btn-holographic px-4 py-2 text-sm rounded-element">Join</button>
                  </div>
                  <div className="mb-2 text-sm text-text-secondary flex justify-between"><span>{c.progress}/{c.target}</span><span>{Math.round(c.progress / c.target * 100)}%</span></div>
                  <div className="progress-ethereal h-2"><motion.div className="progress-ethereal-bar h-2" initial={{ width: 0 }} animate={{ width: `${c.progress / c.target * 100}%` }} transition={{ duration: 0.8 }} /></div>
                  <div className="mt-2 text-xs text-text-tertiary">{c.participants.toLocaleString()} participants</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div className="glass-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-accent-fuchsia" />Trending</h3>
            <div className="space-y-3">
              {trendingTopics.map((t, i) => (
                <div key={t.id} className="flex items-start gap-3 p-2 rounded-element hover:bg-white/5 cursor-pointer">
                  <span className="text-sm font-bold text-accent-violet">#{i + 1}</span>
                  <div><h4 className="text-sm text-text-primary">{t.title}</h4><div className="text-xs text-text-tertiary">{t.posts} posts</div></div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className="glass-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-holographic py-2 px-4 rounded-element text-sm">New Discussion</button>
              <button className="w-full glass-button py-2 px-4 rounded-element text-sm">Create Club</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Community;