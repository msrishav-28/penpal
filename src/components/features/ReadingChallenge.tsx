import React from 'react';
import { BookOpen } from 'lucide-react';

interface ReadingChallengeProps {
  year?: number;
  booksCompleted?: number;
  goal?: number;
  onViewChallenge?: () => void;
}

const ReadingChallenge: React.FC<ReadingChallengeProps> = ({
  year = 2025,
  booksCompleted = 12,
  goal = 50,
  onViewChallenge
}) => {
  const percentage = Math.round((booksCompleted / goal) * 100);
  const remaining = goal - booksCompleted;

  return (
    <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-card p-6 text-white shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[32px] font-bold leading-none group-hover:scale-105 transition-transform duration-300">{year}</h2>
            <p className="text-teal-100 text-[12px] font-medium tracking-wide">READING CHALLENGE</p>
          </div>
          <BookOpen className="h-8 w-8 text-teal-200 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-[28px] font-bold leading-none group-hover:scale-105 transition-transform duration-300">{booksCompleted}</span>
            <span className="text-teal-100 text-[14px]">Books Completed</span>
          </div>
          <p className="text-[12px] text-teal-100">
            {remaining} more books to read in {year}
          </p>
        </div>

        <div className="mb-4">
          <div className="w-full bg-teal-500/50 rounded-full h-2 mb-2 overflow-hidden backdrop-blur-sm">
            <div className="bg-gradient-to-r from-white to-teal-100 h-2 rounded-full shadow-glow transition-all duration-500 hover:shadow-lg" style={{ width: `${percentage}%` }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-teal-100">
            <span>{percentage}%</span>
            <span>Goal: {goal} books</span>
          </div>
        </div>

        <button
          className="text-teal-100 text-[12px] underline hover:text-white transition-all duration-300 hover:scale-105"
          onClick={onViewChallenge}
        >
          View Challenge
        </button>
      </div>

      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default ReadingChallenge;