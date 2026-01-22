import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../services';
import { useApp } from '../contexts/AppContext';
import { Button, TextReveal } from '../components/ui';
import { Sparkles, Mail, Lock, User } from 'lucide-react';

/**
 * Register - Ethereal Archive account creation page
 * Features dark void background, glass card, and staggered field animations
 */
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({ name, email, password });
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
      setError(error.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { id: 'name', label: 'Full Name', type: 'text', value: name, setter: setName, icon: User, placeholder: 'Your Name', delay: 0.3 },
    { id: 'email', label: 'Email Address', type: 'email', value: email, setter: setEmail, icon: Mail, placeholder: 'your@email.com', delay: 0.4 },
    { id: 'password', label: 'Password', type: 'password', value: password, setter: setPassword, icon: Lock, placeholder: '••••••••', delay: 0.5 },
    { id: 'confirmPassword', label: 'Confirm Password', type: 'password', value: confirmPassword, setter: setConfirmPassword, icon: Lock, placeholder: '••••••••', delay: 0.6 },
  ];

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-fuchsia/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-accent-violet/10 rounded-full blur-[100px]" />
      </div>

      {/* Register Card */}
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
            Begin your journey in the archive
          </TextReveal>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Form Fields */}
          {formFields.map(({ id, label, type, value, setter, icon: Icon, placeholder, delay }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay }}
            >
              <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
                {label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon className="h-4 w-4 text-text-tertiary" />
                </div>
                <input
                  id={id}
                  type={type}
                  required
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="input-ethereal w-full pl-10"
                  placeholder={placeholder}
                />
              </div>
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-2"
          >
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              variant="holographic"
              isLoading={loading}
            >
              {loading ? 'Creating...' : 'Join the Archive'}
            </Button>
          </motion.div>
        </form>

        {/* Login Link */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-accent-violet hover:text-accent-fuchsia font-medium transition-colors duration-300"
            >
              Enter here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
