import ReadingChallenge from '../components/features/ReadingChallenge';
import ReaderHighlights from '../components/features/ReaderHighlights';
import UpdatesFeed from '../components/features/UpdatesFeed';
import NewsSection from '../components/features/NewsSection';
import GoodreadsAwards from '../components/features/GoodreadsAwards';
import { Loading } from '../components/ui';
import { useApp } from '../contexts/AppContext';
import { useCurrentlyReading } from '../hooks/useReadingProgress';

const Dashboard = () => {
  const { user } = useApp();
  const { books: currentlyReading, loading } = useCurrentlyReading();

  if (loading) {
    return <Loading message="Loading your dashboard..." />;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6">
        {/* Left Column with floating animation */}
        <div className="space-y-6 animate-float">
          <ReadingChallenge 
            year={user?.readingGoal?.year || new Date().getFullYear()}
            booksCompleted={user?.readingGoal?.completed || 0}
            goal={user?.readingGoal?.target || 50}
          />
          
          {/* Currently Reading with glassmorphism */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] group">
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4 leading-tight group-hover:text-green-600 transition-colors duration-300">
              Currently Reading
            </h2>
            
            <div className="space-y-4">
              {currentlyReading.length === 0 ? (
                <p className="text-sm text-gray-600 text-center py-4">
                  No books in progress. Start reading!
                </p>
              ) : (
                currentlyReading.slice(0, 2).map((progress) => (
                  <div key={progress._id} className="flex space-x-3 p-3 rounded-element hover:bg-white/30 transition-all duration-300">
                    <img
                      src={progress.book?.coverUrl || 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=64&h=96&fit=crop'}
                      alt={progress.book?.title || 'Book cover'}
                      className="w-16 h-24 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-[14px] mb-1 line-clamp-2 hover:text-green-600 transition-colors duration-300">
                        {progress.book?.title || 'Unknown Title'}
                      </h3>
                      <p className="text-[12px] text-gray-600 mb-2">{progress.book?.author || 'Unknown Author'}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                          <span>{progress.currentPage} / {progress.totalPages} Pages</span>
                          <span>({progress.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-500 hover:shadow-glow" 
                            style={{ width: `${progress.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <button className="mt-4 w-full glass-dark text-gray-700 py-2 px-4 rounded-button text-[14px] font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-3d">
              Add Book +
            </button>
          </div>

          {/* Recommendation with glassmorphism */}
          <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] group">
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4 leading-tight group-hover:text-green-600 transition-colors duration-300">Recommendation</h2>
            
            <div className="space-y-4">
              <div className="flex space-x-3 p-3 rounded-element hover:bg-white/30 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=48&h=72&fit=crop"
                  alt="Animal Farm"
                  className="w-12 h-16 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-[14px] mb-1 hover:text-green-600 transition-colors duration-300">Animal Farm</h3>
                  <p className="text-[12px] text-gray-600 mb-1">George Orwell</p>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-[12px] hover:scale-110 transition-transform duration-200">★</span>
                      ))}
                      <span className="text-gray-300 text-[12px]">★</span>
                    </div>
                    <span className="text-[12px] text-gray-500 ml-1">4.05</span>
                  </div>
                  <div className="flex space-x-1 mb-3">
                    <span className="px-2 py-1 glass-dark text-[10px] rounded-element text-gray-700 hover:scale-105 transition-transform duration-200">Fantasy</span>
                    <span className="px-2 py-1 glass-dark text-[10px] rounded-element text-gray-700 hover:scale-105 transition-transform duration-200">Literature</span>
                  </div>
                  <button className="bg-gray-900 text-white px-3 py-1 text-[12px] rounded-button hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <ReaderHighlights />
          <UpdatesFeed />
        </div>

        {/* Right Column with floating animation */}
        <div className="space-y-6 animate-float" style={{ animationDelay: '2s' }}>
          <GoodreadsAwards />
          <NewsSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;