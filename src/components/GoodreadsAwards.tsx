import React from 'react';

const GoodreadsAwards: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 rounded-card p-6 text-white relative overflow-hidden shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] group">
      {/* Animated background mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="text-[12px] font-medium mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">Goodreads Choice Awards</div>
        
        <div className="mb-4">
          <div className="text-[18px] font-bold mb-1 leading-tight group-hover:scale-105 transition-transform duration-300">good reads</div>
          <div className="text-[11px] opacity-90 font-medium tracking-wide">CHOICE AWARDS</div>
          <div className="text-[32px] font-bold leading-none group-hover:scale-105 transition-transform duration-300">2024</div>
        </div>
        
        <div className="mb-4">
          <div className="text-[14px] font-medium mb-1 leading-tight">Announcing the Readers'</div>
          <div className="text-[14px] font-medium leading-tight">Favorite Books of 2024</div>
        </div>
        
        <button className="glass text-white px-4 py-2 rounded-button text-[12px] font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-3d mb-3">
          See The Winners
        </button>
        
        <div className="text-[11px] opacity-75 group-hover:opacity-90 transition-opacity duration-300">6,261,936 Votes Cast</div>
      </div>
      
      {/* Enhanced decorative elements with animation */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full animate-float"></div>
        <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2 right-12 w-6 h-6 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-card bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
    </div>
  );
};

export default GoodreadsAwards;