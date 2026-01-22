import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, HelpCircle, Bell, LogOut, Timer, TrendingUp, Trophy, Upload, BookOpen, Users, Sparkles } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Header - Ethereal Archive glass navigation dock
 * Features frosted glass, holographic accents, and PenPal branding
 */
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/my-books', label: 'My Books', icon: BookOpen },
    { path: '/browse', label: 'Browse', icon: null },
    { path: '/timer', label: 'Timer', icon: Timer, accent: true },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
    { path: '/import', label: 'Import', icon: Upload },
    { path: '/clubs', label: 'Clubs', icon: Users },
  ];

  return (
    <motion.header
      className="glass-dark sticky top-0 z-50 border-b border-glass-border"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo - PenPal with holographic gradient */}
          <Link to="/" className="flex items-center group">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Sparkles className="w-5 h-5 text-accent-violet" />
              <span className="text-[24px] font-display font-semibold text-gradient-holographic leading-none">
                PenPal
              </span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon, accent }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-element transition-all duration-300 ${isActive(path)
                    ? 'text-text-primary bg-white/[0.05] border border-glass-border'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                  } ${accent && isActive(path) ? 'text-accent-violet' : ''}`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
                {isActive(path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-holographic"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-[300px] mx-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-text-tertiary group-focus-within:text-accent-violet transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Search the archive..."
                className="input-ethereal w-full pl-10 pr-4 py-2 text-[14px]"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <motion.button
              className="p-2 text-text-secondary hover:text-text-primary rounded-element hover:bg-white/[0.05] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="h-5 w-5" />
            </motion.button>

            <motion.button
              className="p-2 text-text-secondary hover:text-text-primary relative rounded-element hover:bg-white/[0.05] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-accent-fuchsia rounded-full flex items-center justify-center text-[10px] text-white font-medium shadow-glow-fuchsia">
                3
              </span>
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                className="flex items-center space-x-2 p-1.5 rounded-element hover:bg-white/[0.05] transition-all duration-300"
                onClick={() => setShowMenu(!showMenu)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-holographic flex items-center justify-center text-white font-display font-medium text-sm shadow-glow-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </motion.button>

              {/* Dropdown Menu */}
              {showMenu && (
                <motion.div
                  className="absolute right-0 mt-2 w-56 glass-card shadow-ethereal overflow-hidden"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="p-4 border-b border-glass-border">
                    <p className="text-sm font-display font-medium text-text-primary">{user?.name}</p>
                    <p className="text-xs text-text-tertiary truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
