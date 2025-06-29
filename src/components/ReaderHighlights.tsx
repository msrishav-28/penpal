import React from 'react';
import { ChevronRight, Plus } from 'lucide-react';

const ReaderHighlights: React.FC = () => {
  const highlights = [
    {
      id: 1,
      name: 'Create Story',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      isCreateStory: true
    },
    {
      id: 2,
      name: 'Alex Santer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 3,
      name: 'Albert Flores',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 4,
      name: 'Annette Black',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: 5,
      name: 'Arlene Cooper',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    }
  ];

  return (
    <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] group">
      <h2 className="text-[18px] font-semibold text-gray-900 mb-4 leading-tight group-hover:text-green-600 transition-colors duration-300">Reader Highlights</h2>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="flex-shrink-0 text-center group/item">
            <div className="relative mb-2">
              <img
                src={highlight.avatar}
                alt={highlight.name}
                className="w-16 h-16 rounded-full object-cover shadow-3d hover:shadow-3d-hover transition-all duration-300 group-hover/item:scale-110"
              />
              {highlight.isCreateStory && (
                <div className="absolute -bottom-1 -right-1 bg-green-600 rounded-full p-1 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-110 animate-pulse">
                  <Plus className="h-3 w-3 text-white" />
                </div>
              )}
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
            </div>
            <p className="text-[11px] text-gray-600 font-medium max-w-[64px] truncate group-hover/item:text-green-600 transition-colors duration-300">{highlight.name}</p>
          </div>
        ))}
        
        <button className="flex-shrink-0 flex items-center justify-center w-16 h-16 glass-dark rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:shadow-3d group/btn">
          <ChevronRight className="h-5 w-5 text-gray-600 group-hover/btn:text-green-600 transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

export default ReaderHighlights;