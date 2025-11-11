import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="glass border-t border-white/20 mt-16">
      <div className="max-w-[1200px] mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="group">
            <div className="text-[24px] font-bold text-gray-800 mb-4 leading-none transition-all duration-300 group-hover:scale-105">
              good<span className="text-green-600">reads</span>
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Upgrading the way readers connect and explore. Inspiring a seamless and enriching reading journey.
            </p>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Home</Link></li>
              <li><Link to="/my-books" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">My Books</Link></li>
              <li><Link to="/browse" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Browse</Link></li>
              <li><Link to="/community" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Help Center</a></li>
              <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Contact Us</a></li>
              <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">FAQs</a></li>
              <li><a href="#" className="text-[14px] text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-1">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Join the Community
            </h3>
            <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
              Connect with millions of readers and share your passion for books.
            </p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-button text-[14px] font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-3d">
              Join The Community
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
