import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, HelpCircle, Bell, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header with glassmorphism */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo with subtle glow */}
            <Link to="/" className="flex items-center group">
              <div className="text-[24px] font-bold text-gray-800 leading-none transition-all duration-300 group-hover:scale-105">
                good<span className="text-green-600 animate-glow">reads</span>
              </div>
            </Link>

            {/* Navigation with hover effects */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-[14px] font-medium transition-all duration-300 hover:scale-105 ${
                  isActive('/') 
                    ? 'text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/my-books" 
                className={`text-[14px] font-medium transition-all duration-300 hover:scale-105 ${
                  isActive('/my-books') 
                    ? 'text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Books
              </Link>
              <Link 
                to="/browse" 
                className={`text-[14px] font-medium transition-all duration-300 hover:scale-105 ${
                  isActive('/browse') 
                    ? 'text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse
              </Link>
              <Link 
                to="/community" 
                className={`text-[14px] font-medium transition-all duration-300 hover:scale-105 ${
                  isActive('/community') 
                    ? 'text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Community
              </Link>
            </nav>

            {/* Search with glassmorphism */}
            <div className="flex-1 max-w-[400px] mx-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 transition-colors duration-300 group-focus-within:text-green-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search Books"
                  className="block w-full pl-10 pr-3 py-2 glass rounded-element leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-[14px] transition-all duration-300 hover:shadow-3d"
                />
              </div>
            </div>

            {/* Right side icons with 3D effects */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50 transition-all duration-300 hover:scale-110 hover:shadow-3d">
                <HelpCircle className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative rounded-full hover:bg-white/50 transition-all duration-300 hover:scale-110 hover:shadow-3d">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-medium animate-pulse shadow-3d">
                  3
                </span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50 transition-all duration-300 hover:scale-110 hover:shadow-3d">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer with glassmorphism */}
      <footer className="glass border-t border-white/20 mt-16">
        <div className="max-w-[1200px] mx-auto py-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group">
              <div className="text-[24px] font-bold text-gray-800 mb-4 leading-none transition-all duration-300 group-hover:scale-105">
                good<span className="text-green-600">reads</span>
              </div>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Upgrading the way readers connect and explore. Inspiring a seamless and enriching reading journey.
              </p>
            </div>
            
            <div>
              <h3 className="text-[14px] font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Home</Link></li>
                <li><Link to="/my-books" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">My Books</Link></li>
                <li><Link to="/browse" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Browse</Link></li>
                <li><Link to="/community" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Community</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Help Center</a></li>
                <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Contact Us</a></li>
                <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">FAQs</a></li>
                <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Join the Community
              </h3>
              <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
                Connect with millions of readers and share your passion for books.
              </p>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-button text-[14px] font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
                Join The Community
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;