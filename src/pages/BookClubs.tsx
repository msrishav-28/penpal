import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, BookOpen, Calendar, MessageCircle, Lock, Globe, Search, Sparkles } from 'lucide-react';
import { TextReveal } from '../components/ui';

const mockClubs = [
  { id: '1', name: 'Sci-Fi Enthusiasts', description: 'Exploring the cosmos one book at a time', members: 234, currentBook: 'Dune by Frank Herbert', coverUrl: 'https://covers.openlibrary.org/b/id/8228691-L.jpg', privacy: 'public', nextMeeting: '2024-11-20', progress: 67 },
  { id: '2', name: 'Mystery Book Club', description: 'Solving mysteries together', members: 156, currentBook: 'The Silent Patient', coverUrl: 'https://covers.openlibrary.org/b/id/8904777-L.jpg', privacy: 'private', nextMeeting: '2024-11-18', progress: 45 },
  { id: '3', name: 'Classic Literature', description: 'Rediscovering timeless masterpieces', members: 89, currentBook: 'Pride and Prejudice', coverUrl: 'https://covers.openlibrary.org/b/id/8225768-L.jpg', privacy: 'public', nextMeeting: '2024-11-25', progress: 80 }
];

export default function BookClubs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-accent-violet" />
            <TextReveal as="h1" className="text-display-lg font-display text-text-primary">Book Clubs</TextReveal>
          </div>
          <p className="text-text-secondary">Join communities and read together</p>
        </motion.div>
        <motion.button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-6 py-3 btn-holographic rounded-element font-semibold" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.02 }}>
          <Plus className="w-5 h-5" />Create Club
        </motion.button>
      </div>

      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search book clubs..." className="input-ethereal w-full pl-12" />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[{ label: 'Your Clubs', value: '12', color: 'accent-violet' }, { label: 'Active Discussions', value: '5', color: 'accent-fuchsia' }, { label: 'Upcoming Meetings', value: '3', color: 'accent-gold' }, { label: 'Total Members', value: '847', color: 'accent-violet' }].map((stat, i) => (
          <motion.div key={stat.label} className="glass-card p-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
            <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-text-tertiary">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClubs.map((club, i) => (
          <motion.div key={club.id} className="glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} whileHover={{ y: -4 }}>
            <div className="p-6 border-b border-glass-border">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-text-primary">{club.name}</h3>
                <div className="flex items-center gap-1 text-xs bg-accent-violet/20 text-accent-violet px-2 py-1 rounded-full">
                  {club.privacy === 'public' ? <><Globe className="w-3 h-3" /> Public</> : <><Lock className="w-3 h-3" /> Private</>}
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-3">{club.description}</p>
              <div className="flex items-center gap-2 text-sm text-text-tertiary"><Users className="w-4 h-4" /><span>{club.members} members</span></div>
            </div>

            <div className="p-6 bg-gradient-to-br from-accent-violet/5 to-accent-fuchsia/5">
              <div className="flex gap-4">
                <img src={club.coverUrl} alt={club.currentBook} className="w-16 h-24 object-cover rounded-element img-ethereal" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/128x192?text=No+Cover'; }} />
                <div className="flex-1">
                  <div className="text-xs text-text-tertiary mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3" />Currently Reading</div>
                  <h4 className="font-semibold text-text-primary text-sm mb-2">{club.currentBook}</h4>
                  <div className="progress-ethereal h-2 mb-1"><div className="progress-ethereal-bar h-2" style={{ width: `${club.progress}%` }} /></div>
                  <div className="text-xs text-text-tertiary">{club.progress}% complete</div>
                </div>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-text-tertiary"><Calendar className="w-4 h-4" /><span>Next: {new Date(club.nextMeeting).toLocaleDateString()}</span></div>
              <button className="flex items-center gap-1 text-sm font-semibold text-accent-violet hover:text-accent-fuchsia transition-colors"><MessageCircle className="w-4 h-4" />Join</button>
            </div>
          </motion.div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div className="glass-card max-w-2xl w-full p-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2"><Sparkles className="w-6 h-6 text-accent-violet" />Create New Book Club</h2>
            <form className="space-y-4">
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Club Name</label><input type="text" className="input-ethereal w-full" placeholder="Enter club name" /></div>
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Description</label><textarea className="input-ethereal w-full" rows={3} placeholder="What's your club about?" /></div>
              <div><label className="block text-sm font-medium text-text-secondary mb-2">Privacy</label><select className="input-ethereal w-full"><option value="public">Public - Anyone can join</option><option value="private">Private - Invite only</option></select></div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 glass-button px-6 py-3 rounded-element font-semibold">Cancel</button>
                <button type="submit" className="flex-1 btn-holographic px-6 py-3 rounded-element font-semibold">Create Club</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
