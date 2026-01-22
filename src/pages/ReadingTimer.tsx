import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Music, BookOpen, Clock, Sparkles } from 'lucide-react';
import { startSession, pauseSession, resumeSession, endSession, tick, setAmbientSound } from '../store/slices/sessionSlice';
import type { RootState } from '../store';
import { TextReveal } from '../components/ui';

const AMBIENT_SOUNDS = [
  { id: 'none', name: 'None', icon: '🔇' },
  { id: 'rain', name: 'Rain', icon: '🌧️' },
  { id: 'cafe', name: 'Café', icon: '☕' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'fireplace', name: 'Fireplace', icon: '🔥' },
  { id: 'ocean', name: 'Ocean', icon: '🌊' }
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => dispatch(tick()), 1000);
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
    if (!selectedBook) { alert('Please select a book first'); return; }
    dispatch(startSession({ bookId: selectedBook, mood: selectedMood, ambientSound: 'none' }));
  };

  const handleEnd = () => { dispatch(endSession({ pagesRead })); setPagesRead(0); };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Clock className="w-8 h-8 text-accent-violet" />
          <TextReveal as="h1" className="text-display-lg font-display text-text-primary">Reading Timer</TextReveal>
        </div>
        <p className="text-text-secondary">Track your reading sessions and build consistent habits</p>
      </motion.div>

      {/* Main Timer Card */}
      <motion.div className="glass-card p-8 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-64 h-64 rounded-full bg-gradient-to-br from-accent-violet to-accent-fuchsia shadow-glow-lg mb-6"
            animate={{ boxShadow: isTimerRunning ? ['0 0 30px rgba(139,92,246,0.5)', '0 0 60px rgba(217,70,239,0.5)', '0 0 30px rgba(139,92,246,0.5)'] : '0 0 30px rgba(139,92,246,0.3)' }}
            transition={{ duration: 2, repeat: isTimerRunning ? Infinity : 0 }}
          >
            <div className="text-6xl font-display font-bold text-white">{formatTime(elapsedSeconds)}</div>
          </motion.div>
          <div className="flex items-center justify-center gap-2 text-xl text-text-secondary">
            <Sparkles className="w-6 h-6 text-accent-violet" />
            <span>{activeSession ? 'Session Active' : 'Ready to Read'}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          {!activeSession ? (
            <motion.button onClick={handleStart} className="flex items-center gap-2 px-8 py-4 btn-holographic rounded-element font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Play className="w-6 h-6" />Start Reading
            </motion.button>
          ) : (
            <>
              {isTimerRunning ? (
                <motion.button onClick={() => dispatch(pauseSession())} className="flex items-center gap-2 px-8 py-4 glass-button rounded-element font-semibold" whileHover={{ scale: 1.02 }}>
                  <Pause className="w-6 h-6" />Pause
                </motion.button>
              ) : (
                <motion.button onClick={() => dispatch(resumeSession())} className="flex items-center gap-2 px-8 py-4 btn-holographic rounded-element font-semibold" whileHover={{ scale: 1.02 }}>
                  <Play className="w-6 h-6" />Resume
                </motion.button>
              )}
              <motion.button onClick={handleEnd} className="flex items-center gap-2 px-8 py-4 glass-button border-accent-fuchsia/50 rounded-element font-semibold" whileHover={{ scale: 1.02 }}>
                <Square className="w-6 h-6" />End
              </motion.button>
            </>
          )}
        </div>

        {activeSession && (
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-text-secondary mb-2">Pages Read</label>
            <input type="number" value={pagesRead} onChange={(e) => setPagesRead(parseInt(e.target.value) || 0)} className="input-ethereal w-full" placeholder="0" min="0" />
          </div>
        )}
      </motion.div>

      {!activeSession && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-4"><BookOpen className="w-5 h-5 text-accent-violet" /><h3 className="text-lg font-semibold text-text-primary">Select Book</h3></div>
            <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} className="input-ethereal w-full">
              <option value="">Choose a book...</option>
              <option value="book1">Currently Reading Book 1</option>
              <option value="book2">Currently Reading Book 2</option>
            </select>
          </motion.div>
          <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Reading Mood</h3>
            <div className="grid grid-cols-3 gap-2">
              {MOODS.map((mood) => (
                <motion.button key={mood.id} onClick={() => setSelectedMood(mood.id)} className={`p-3 rounded-element border-2 transition-all ${selectedMood === mood.id ? 'border-accent-violet bg-accent-violet/10' : 'border-glass-border hover:border-accent-violet/50'}`} whileHover={{ scale: 1.02 }}>
                  <div className="text-2xl mb-1">{mood.icon}</div>
                  <div className="text-xs font-medium text-text-secondary">{mood.name}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center gap-2 mb-4"><Music className="w-5 h-5 text-accent-fuchsia" /><h3 className="text-lg font-semibold text-text-primary">Ambient Sounds</h3></div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {AMBIENT_SOUNDS.map((sound) => (
            <motion.button key={sound.id} onClick={() => activeSession && dispatch(setAmbientSound(sound.id))} disabled={!activeSession} className={`p-4 rounded-element border-2 transition-all ${activeSession?.ambientSound === sound.id ? 'border-accent-violet bg-accent-violet/10' : 'border-glass-border'} ${!activeSession ? 'opacity-50' : 'hover:border-accent-violet/50'}`} whileHover={activeSession ? { scale: 1.02 } : {}}>
              <div className="text-3xl mb-2">{sound.icon}</div>
              <div className="text-sm font-medium text-text-secondary">{sound.name}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[{ label: 'Today', value: '0', color: 'accent-violet' }, { label: 'This Week', value: '0', color: 'accent-fuchsia' }, { label: 'This Month', value: '0', color: 'accent-violet' }, { label: 'Total', value: '0h', color: 'accent-gold' }].map((stat, i) => (
          <motion.div key={stat.label} className="glass-card p-4 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
            <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-text-tertiary">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
