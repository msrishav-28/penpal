import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, Square, Music, BookOpen, Clock } from 'lucide-react';
import { startSession, pauseSession, resumeSession, endSession, tick, setAmbientSound } from '../store/slices/sessionSlice';
import type { RootState } from '../store';

const AMBIENT_SOUNDS = [
  { id: 'none', name: 'None', icon: '🔇' },
  { id: 'rain', name: 'Rain', icon: '🌧️' },
  { id: 'cafe', name: 'Café', icon: '☕' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'fireplace', name: 'Fireplace', icon: '🔥' },
  { id: 'ocean', name: 'Ocean', icon: '🌊' },
  { id: 'white-noise', name: 'White Noise', icon: '📻' }
];

const MOODS = [
  { id: 'focused', name: 'Focused', icon: '🎯' },
  { id: 'relaxed', name: 'Relaxed', icon: '😌' },
  { id: 'excited', name: 'Excited', icon: '🤩' },
  { id: 'curious', name: 'Curious', icon: '🤔' },
  { id: 'emotional', name: 'Emotional', icon: '🥺' },
  { id: 'analytical', name: 'Analytical', icon: '🧠' }
];

export default function ReadingTimer() {
  const dispatch = useDispatch();
  const { activeSession, isTimerRunning, elapsedSeconds } = useSelector((state: RootState) => state.session);
  
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMood, setSelectedMood] = useState('focused');
  const [pagesRead, setPagesRead] = useState(0);

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, dispatch]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!selectedBook) {
      alert('Please select a book first');
      return;
    }
    dispatch(startSession({
      bookId: selectedBook,
      mood: selectedMood,
      ambientSound: 'none'
    }));
  };

  const handlePause = () => {
    dispatch(pauseSession());
  };

  const handleResume = () => {
    dispatch(resumeSession());
  };

  const handleEnd = () => {
    dispatch(endSession({ pagesRead }));
    setPagesRead(0);
  };

  const handleSoundChange = (soundId: string) => {
    dispatch(setAmbientSound(soundId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Reading Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your reading sessions and build consistent habits
          </p>
        </div>

        {/* Main Timer Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200/50 dark:border-gray-700/50">
          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-64 h-64 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shadow-2xl mb-6">
              <div className="text-7xl font-bold text-white">
                {formatTime(elapsedSeconds)}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xl text-gray-700 dark:text-gray-300">
              <Clock className="w-6 h-6" />
              <span>{activeSession ? 'Session Active' : 'No Active Session'}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {!activeSession ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Play className="w-6 h-6" />
                Start Reading
              </button>
            ) : (
              <>
                {isTimerRunning ? (
                  <button
                    onClick={handlePause}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Pause className="w-6 h-6" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={handleResume}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Play className="w-6 h-6" />
                    Resume
                  </button>
                )}
                
                <button
                  onClick={handleEnd}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Square className="w-6 h-6" />
                  End Session
                </button>
              </>
            )}
          </div>

          {/* Pages Read Input */}
          {activeSession && (
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pages Read This Session
              </label>
              <input
                type="number"
                value={pagesRead}
                onChange={(e) => setPagesRead(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>
          )}
        </div>

        {/* Setup Section (when no active session) */}
        {!activeSession && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Book Selection */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Select Book
                </h3>
              </div>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Choose a book...</option>
                <option value="book1">Currently Reading Book 1</option>
                <option value="book2">Currently Reading Book 2</option>
              </select>
            </div>

            {/* Mood Selection */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Reading Mood
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedMood === mood.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.icon}</div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {mood.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ambient Sounds */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ambient Sounds
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {AMBIENT_SOUNDS.map((sound) => (
              <button
                key={sound.id}
                onClick={() => handleSoundChange(sound.id)}
                disabled={!activeSession}
                className={`p-4 rounded-xl border-2 transition-all ${
                  activeSession?.ambientSound === sound.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                } ${!activeSession ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-3xl mb-2">{sound.icon}</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {sound.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Today</div>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">This Week</div>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">This Month</div>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">0h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
