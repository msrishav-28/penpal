import React from 'react';

const NewsSection: React.FC = () => {
  return (
    <div className="glass rounded-card shadow-3d p-6 hover:shadow-3d-hover transition-all duration-300 hover:scale-[1.02] group">
      <h2 className="text-[18px] font-semibold text-gray-900 mb-4 leading-tight group-hover:text-green-600 transition-colors duration-300">News & Interviews</h2>
      
      <div className="space-y-6">
        <article className="flex space-x-4 p-3 rounded-element hover:bg-white/30 transition-all duration-300 group/article">
          <img
            src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=80&h=56&fit=crop"
            alt="News thumbnail"
            className="w-20 h-14 object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 group-hover/article:scale-105"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-[14px] mb-2 line-clamp-2 leading-tight group-hover/article:text-green-600 transition-colors duration-300">
              Kristin Hannah Writes an American Epic
            </h3>
            <div className="flex items-center space-x-4 text-[11px] text-gray-500">
              <button className="bg-gray-900 text-white px-2 py-1 rounded-button text-[11px] font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">Read More</button>
              <div className="flex items-center space-x-2">
                <span className="hover:scale-110 transition-transform duration-200">👍 191</span>
                <span className="hover:scale-110 transition-transform duration-200">💬 51</span>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="grid grid-cols-2 gap-4 text-[12px]">
          <div>
            <h3 className="font-medium text-gray-900 mb-2 text-[14px]">Quick Links</h3>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Home</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">My Books</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Browse</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Community</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Profile</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2 text-[14px]">Support</h3>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Help Center</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Contact Us</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">FAQs</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-600 transition-all duration-300 hover:translate-x-1">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-[11px] text-gray-600 mb-3 leading-relaxed">
            Connect with millions of readers and share your passion for books.
          </p>
          <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-button text-[12px] font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
            Join The Community
          </button>
        </div>
        
        <div className="mt-4">
          <h4 className="text-[12px] font-medium text-gray-900 mb-2">Download Goodreads App</h4>
          <div className="flex space-x-2">
            <div className="w-8 h-6 bg-black rounded-element flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-3d hover:shadow-3d-hover">
              <span className="text-white text-[10px]">▶</span>
            </div>
            <div className="w-8 h-6 bg-blue-600 rounded-element flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-3d hover:shadow-3d-hover">
              <span className="text-white text-[10px]">f</span>
            </div>
            <div className="w-8 h-6 bg-blue-500 rounded-element flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-3d hover:shadow-3d-hover">
              <span className="text-white text-[10px]">⊞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;