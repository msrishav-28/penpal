import React from 'react';
import { BookOpen } from 'lucide-react';

const ReadingChallenge: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-card p-6 text-white shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[32px] font-bold leading-none group-hover:scale-105 transition-transform duration-300">2025</h2>
            <p className="text-teal-100 text-[12px] font-medium tracking-wide">READING CHALLENGE</p>
          </div>
          <BookOpen className="h-8 w-8 text-teal-200 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-[28px] font-bold leading-none group-hover:scale-105 transition-transform duration-300">12</span>
            <span className="text-teal-100 text-[14px]">Books Completed</span>
          </div>
          <p className="text-[12px] text-teal-100">
            35 more books to read in 2025
          </p>
        </div>

        <div className="mb-4">
          <div className="w-full bg-teal-500/50 rounded-full h-2 mb-2 overflow-hidden backdrop-blur-sm">
            <div className="bg-gradient-to-r from-white to-teal-100 h-2 rounded-full shadow-glow transition-all duration-500 hover:shadow-lg" style={{ width: '24%' }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-teal-100">
            <span>24%</span>
            <span>Goal: 50 books</span>
          </div>
        </div>

        <button className="text-teal-100 text-[12px] underline hover:text-white transition-all duration-300 hover:scale-105">
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