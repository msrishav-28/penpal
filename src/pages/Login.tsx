import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services';
import { useApp } from '../contexts/AppContext';
import { Button, TextReveal } from '../components/ui';
import { Sparkles, Mail, Lock } from 'lucide-react';

/**
 * Login - Ethereal Archive authentication page
 * Features dark void background, glass card, and holographic accents
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      setUser({
        id: response._id,
        _id: response._id,
        name: response.name,
        email: response.email,
        avatar: response.avatar
      });
      navigate('/');
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-violet/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-fuchsia/10 rounded-full blur-[100px]" />
      </div>

      {/* Login Card */}
      <motion.div
        className="glass-card p-8 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-accent-violet" />
            <span className="text-[28px] font-display font-bold text-gradient-holographic">
              PenPal
            </span>
          </div>
          <TextReveal
            as="p"
            className="text-text-secondary text-[14px]"
            delay={0.3}
          >
            Welcome back to the archive
          </TextReveal>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <motion.div
              className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-element text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-text-tertiary" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-ethereal w-full pl-10"
                placeholder="your@email.com"
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-text-tertiary" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-ethereal w-full pl-10"
                placeholder="••••••••"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              variant="holographic"
              isLoading={loading}
            >
              {loading ? 'Entering...' : 'Enter the Archive'}
            </Button>
          </motion.div>
        </form>

        {/* Register Link */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-text-secondary">
            New to the archive?{' '}
            <Link
              to="/register"
              className="text-accent-violet hover:text-accent-fuchsia font-medium transition-colors duration-300"
            >
              Create your account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
