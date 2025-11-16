import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Book, Clock, TrendingUp, Target, Award, Calendar } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'];

// Mock data - replace with real data from Redux/API
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

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Reading Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your reading journey and discover insights
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Book className="w-8 h-8 opacity-80" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                This Year
              </span>
            </div>
            <div className="text-4xl font-bold mb-1">29</div>
            <div className="text-emerald-100">Books Read</div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% from last year</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 opacity-80" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Total
              </span>
            </div>
            <div className="text-4xl font-bold mb-1">173h</div>
            <div className="text-blue-100">Reading Time</div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>Avg 29 min/day</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 opacity-80" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Streak
              </span>
            </div>
            <div className="text-4xl font-bold mb-1">15</div>
            <div className="text-purple-100">Days Active</div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Award className="w-4 h-4" />
              <span>Best: 32 days</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 opacity-80" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                2024
              </span>
            </div>
            <div className="text-4xl font-bold mb-1">8,750</div>
            <div className="text-pink-100">Pages Read</div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>302 pages/book avg</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Progress */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Monthly Reading Progress
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="books" stroke="#10b981" strokeWidth={3} name="Books" />
                <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} name="Hours" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Distribution */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Book className="w-5 h-5 text-purple-600" />
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
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Streak */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            This Week's Reading Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={readingStreak}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="pages" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reading Heatmap Placeholder */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Reading Heatmap
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 49 }, (_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg ${
                  Math.random() > 0.5
                    ? 'bg-emerald-500'
                    : Math.random() > 0.5
                    ? 'bg-emerald-300'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                title={`Day ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="w-4 h-4 rounded bg-emerald-300" />
              <div className="w-4 h-4 rounded bg-emerald-500" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
