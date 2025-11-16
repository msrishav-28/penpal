import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, HelpCircle, Bell, LogOut, Moon, Sun, Timer, TrendingUp, Trophy, Upload } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/')
                  ? 'text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/my-books"
              className={`text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/my-books')
                  ? 'text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              My Books
            </Link>
            <Link
              to="/browse"
              className={`text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/browse')
                  ? 'text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Browse
            </Link>
            <Link
              to="/timer"
              className={`flex items-center gap-1 text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/timer')
                  ? 'text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <Timer className="w-4 h-4" />
              Timer
            </Link>
            <Link
              to="/analytics"
              className={`flex items-center gap-1 text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/analytics')
                  ? 'text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </Link>
            <Link
              to="/achievements"
              className={`flex items-center gap-1 text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/achievements')
                  ? 'text-yellow-600 dark:text-yellow-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Achievements
            </Link>
            <Link
              to="/import"
              className={`flex items-center gap-1 text-[13px] font-medium transition-all duration-300 hover:scale-105 ${
                isActive('/import')
                  ? 'text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <Upload className="w-4 h-4" />
              Import
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
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-3d"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-3d">
              <HelpCircle className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white relative rounded-full hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 hover:shadow-3d">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-medium animate-pulse shadow-3d">
                3
              </span>
            </button>
            
            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 glass rounded-element shadow-3d opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-white/50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
