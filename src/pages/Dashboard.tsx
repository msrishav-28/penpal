import { motion } from 'framer-motion';
import ReadingChallenge from '../components/features/ReadingChallenge';
import ReaderHighlights from '../components/features/ReaderHighlights';
import UpdatesFeed from '../components/features/UpdatesFeed';
import NewsSection from '../components/features/NewsSection';
import GoodreadsAwards from '../components/features/GoodreadsAwards';
import { Loading, TextReveal } from '../components/ui';
import { useApp } from '../contexts/AppContext';
import { useCurrentlyReading } from '../hooks/useReadingProgress';
import { BookOpen, Sparkles } from 'lucide-react';

/**
 * Dashboard - Ethereal Archive Bento Grid Command Center
 * Features asymmetrical grid layout, glass widgets, and kinetic animations
 */
const Dashboard = () => {
  const { user } = useApp();
  const { books: currentlyReading, loading } = useCurrentlyReading();

  if (loading) {
    return <Loading message="Entering the archive..." />;
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Welcome Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <TextReveal
          as="h1"
          className="text-display-lg font-display text-text-primary mb-2"
        >
          {`${getGreeting()}, ${user?.name?.split(' ')[0] || 'Reader'}`}
        </TextReveal>
        <p className="text-text-secondary text-[16px]">
          Your reading journey awaits in the archive.
        </p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <ReadingChallenge
            year={user?.readingGoal?.year || new Date().getFullYear()}
            booksCompleted={user?.readingGoal?.completed || 0}
            goal={user?.readingGoal?.target || 50}
          />

          {/* Currently Reading Widget */}
          <motion.div
            className="glass-card p-6 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-accent-violet" />
              <h2 className="text-[18px] font-display font-semibold text-text-primary">
                Currently Reading
              </h2>
            </div>

            <div className="space-y-4">
              {currentlyReading.length === 0 ? (
                <p className="text-sm text-text-tertiary text-center py-4">
                  No books in progress. Start your journey!
                </p>
              ) : (
                currentlyReading.slice(0, 2).map((progress, index) => (
                  <motion.div
                    key={progress._id}
                    className="flex space-x-3 p-3 rounded-element bg-white/[0.02] border border-glass-border-subtle hover:border-glass-border transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 4 }}
                  >
                    <img
                      src={progress.book?.coverUrl || 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=64&h=96&fit=crop'}
                      alt={progress.book?.title || 'Book cover'}
                      className="w-14 h-20 object-cover rounded-element flex-shrink-0 img-ethereal"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-medium text-text-primary text-[14px] mb-1 line-clamp-2 hover:text-accent-violet transition-colors duration-300">
                        {progress.book?.title || 'Unknown Title'}
                      </h3>
                      <p className="text-[12px] text-text-secondary mb-2">
                        {progress.book?.author || 'Unknown Author'}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[11px] text-text-tertiary mb-1">
                          <span>{progress.currentPage} / {progress.totalPages}</span>
                          <span className="font-accent italic">{progress.percentage}%</span>
                        </div>
                        <div className="progress-ethereal h-1.5">
                          <motion.div
                            className="progress-ethereal-bar h-1.5"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.percentage}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <motion.button
              className="mt-4 w-full glass-button py-2 px-4 rounded-element text-[14px] font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Book +
            </motion.button>
          </motion.div>

          {/* Recommendation Widget */}
          <motion.div
            className="glass-card p-6 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-fuchsia" />
              <h2 className="text-[18px] font-display font-semibold text-text-primary">
                For You
              </h2>
            </div>

            <motion.div
              className="flex space-x-3 p-3 rounded-element bg-white/[0.02] border border-glass-border-subtle hover:border-glass-border transition-all duration-300 cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <img
                src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=48&h=72&fit=crop"
                alt="Animal Farm"
                className="w-12 h-16 object-cover rounded-element flex-shrink-0 img-ethereal"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-medium text-text-primary text-[14px] mb-1 hover:text-accent-violet transition-colors duration-300">
                  Animal Farm
                </h3>
                <p className="text-[12px] text-text-secondary mb-1">George Orwell</p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="star-filled text-[12px]">★</span>
                    ))}
                    <span className="star-empty text-[12px]">★</span>
                  </div>
                  <span className="text-[12px] text-text-tertiary ml-1 font-accent italic">4.05</span>
                </div>
                <div className="flex space-x-1 mb-2">
                  <span className="tag-glass">Fantasy</span>
                  <span className="tag-glass">Classic</span>
                </div>
                <motion.button
                  className="btn-holographic px-3 py-1 text-[12px] rounded-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Detail
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Middle Column - 6 cols */}
        <div className="lg:col-span-6 space-y-6">
          <ReaderHighlights />
          <UpdatesFeed />
        </div>

        {/* Right Column - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <GoodreadsAwards />
          <NewsSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;