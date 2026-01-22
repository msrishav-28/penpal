import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ThumbsUp, MessageCircle, ExternalLink } from 'lucide-react';

/**
 * NewsSection - Ethereal Archive news and interviews widget
 * Features dark glass styling with violet accents
 */
const NewsSection: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Kristin Hannah Writes an American Epic',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=80&h=56&fit=crop',
      likes: 191,
      comments: 51
    }
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'My Books', href: '/my-books' },
    { label: 'Browse', href: '/browse' },
    { label: 'Community', href: '/community' },
  ];

  const supportLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="w-5 h-5 text-accent-violet" />
        <h2 className="text-[18px] font-display font-semibold text-text-primary">
          News & Interviews
        </h2>
      </div>

      {/* News Article */}
      <div className="space-y-4">
        {newsItems.map((item) => (
          <motion.article
            key={item.id}
            className="flex space-x-4 p-3 rounded-element bg-white/[0.02] border border-glass-border-subtle hover:border-glass-border transition-all duration-300 group cursor-pointer"
            whileHover={{ x: 4 }}
          >
            <img
              src={item.image}
              alt="News thumbnail"
              className="w-20 h-14 object-cover rounded-element flex-shrink-0 img-ethereal"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary text-[14px] mb-2 line-clamp-2 leading-tight group-hover:text-accent-violet transition-colors duration-300">
                {item.title}
              </h3>
              <div className="flex items-center space-x-4 text-[11px] text-text-tertiary">
                <motion.button
                  className="btn-holographic px-2 py-1 rounded-button text-[11px] font-medium flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                  <ExternalLink className="w-3 h-3" />
                </motion.button>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center gap-1 hover:text-accent-fuchsia transition-colors">
                    <ThumbsUp className="w-3 h-3" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1 hover:text-accent-violet transition-colors">
                    <MessageCircle className="w-3 h-3" /> {item.comments}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="mt-6 pt-6 border-t border-glass-border">
        <div className="grid grid-cols-2 gap-4 text-[12px]">
          <div>
            <h3 className="font-display font-medium text-text-primary mb-2 text-[14px]">Quick Links</h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent-violet transition-all duration-300 flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-medium text-text-primary mb-2 text-[14px]">Support</h3>
            <ul className="space-y-1.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-accent-violet transition-all duration-300 flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-6 pt-4 border-t border-glass-border">
          <p className="text-[11px] text-text-tertiary mb-3 leading-relaxed">
            Connect with passionate readers and explore the archive.
          </p>
          <motion.button
            className="w-full btn-holographic py-2 px-4 rounded-element text-[12px] font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Join The Archive
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsSection;