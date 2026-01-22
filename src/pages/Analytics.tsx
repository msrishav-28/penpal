import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book, Clock, TrendingUp, Target, Award, Calendar, Sparkles } from 'lucide-react';
import { TextReveal } from '../components/ui';

// Ethereal Archive color palette for charts
const COLORS = ['#8B5CF6', '#D946EF', '#FFD700', '#06B6D4', '#EC4899', '#10B981'];

const monthlyData = [
  { month: 'Jan', books: 4, pages: 1200, hours: 24 },
  { month: 'Feb', books: 3, pages: 950, hours: 19 },
  { month: 'Mar', books: 5, pages: 1500, hours: 30 },
  { month: 'Apr', books: 6, pages: 1800, hours: 36 },
  { month: 'May', books: 4, pages: 1100, hours: 22 },
  { month: 'Jun', books: 7, pages: 2100, hours: 42 }
];

const genreData = [
  { name: 'Fiction', value: 35 },
  { name: 'Non-Fiction', value: 25 },
  { name: 'Sci-Fi', value: 20 },
  { name: 'Mystery', value: 12 },
  { name: 'Romance', value: 8 }
];

const readingStreak = [
  { day: 'Mon', pages: 45 },
  { day: 'Tue', pages: 52 },
  { day: 'Wed', pages: 38 },
  { day: 'Thu', pages: 65 },
  { day: 'Fri', pages: 42 },
  { day: 'Sat', pages: 78 },
  { day: 'Sun', pages: 55 }
];

/**
 * Analytics - Ethereal Archive reading statistics page
 * Features dark glass cards with violet gradients and animated charts
 */
export default function Analytics() {
  const stats = [
    { icon: Book, label: 'Books Read', value: '29', sublabel: 'This Year', change: '+12%', gradient: 'from-accent-violet to-accent-fuchsia' },
    { icon: Clock, label: 'Reading Time', value: '173h', sublabel: 'Total', change: '29 min/day', gradient: 'from-accent-fuchsia to-accent-violet' },
    { icon: Target, label: 'Days Active', value: '15', sublabel: 'Streak', change: 'Best: 32', gradient: 'from-accent-violet to-accent-gold' },
    { icon: Calendar, label: 'Pages Read', value: '8,750', sublabel: '2024', change: '302/book', gradient: 'from-accent-fuchsia to-accent-gold' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-accent-violet" />
          <TextReveal as="h1" className="text-display-lg font-display text-text-primary">
            Reading Analytics
          </TextReveal>
        </div>
        <p className="text-text-secondary">Track your reading journey and discover insights</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={`glass-card bg-gradient-to-br ${stat.gradient} p-6 relative overflow-hidden group`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 text-white/80" />
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full text-white">
                    {stat.sublabel}
                  </span>
                </div>
                <div className="text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Progress */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-violet" />
            Monthly Reading Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A0C14',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#EDEDED'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="books" stroke="#8B5CF6" strokeWidth={3} name="Books" dot={{ fill: '#8B5CF6' }} />
              <Line type="monotone" dataKey="hours" stroke="#D946EF" strokeWidth={3} name="Hours" dot={{ fill: '#D946EF' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Genre Distribution */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Book className="w-5 h-5 text-accent-fuchsia" />
            Genre Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {genreData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A0C14',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#EDEDED'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Weekly Streak */}
      <motion.div
        className="glass-card p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-accent-gold" />
          This Week's Reading Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={readingStreak}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="#A1A1AA" />
            <YAxis stroke="#A1A1AA" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0C14',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#EDEDED'
              }}
            />
            <Bar dataKey="pages" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#D946EF" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Reading Heatmap */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent-violet" />
          Reading Heatmap
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 49 }, (_, i) => {
            const intensity = Math.random();
            return (
              <motion.div
                key={i}
                className={`aspect-square rounded-lg transition-all duration-300 hover:scale-110 ${intensity > 0.7 ? 'bg-accent-violet' :
                    intensity > 0.4 ? 'bg-accent-violet/50' :
                      'bg-white/[0.05]'
                  }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                title={`Day ${i + 1}`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-text-tertiary">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-white/[0.05]" />
            <div className="w-4 h-4 rounded bg-accent-violet/50" />
            <div className="w-4 h-4 rounded bg-accent-violet" />
          </div>
          <span>More</span>
        </div>
      </motion.div>
    </div>
  );
}
