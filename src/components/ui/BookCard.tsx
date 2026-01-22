import { FC } from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  showRating?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * BookCard - Ethereal Archive book display
 * Features grayscale-to-color hover effect, glass styling, and violet accents
 */
const BookCard: FC<BookCardProps> = ({
  book,
  onClick,
  showRating = true,
  size = 'medium',
  className = ''
}: BookCardProps) => {
  const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
    small: 'w-12 h-16',
    medium: 'w-16 h-24',
    large: 'w-20 h-28'
  };

  const selectedSizeClass = sizeClasses[size];

  return (
    <motion.div
      className={`group flex space-x-3 p-3 rounded-element bg-white/[0.02] border border-transparent hover:border-glass-border hover:bg-white/[0.04] transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Book Cover with Grayscale-to-Color Effect */}
      <div className="relative overflow-hidden rounded-element flex-shrink-0">
        <img
          src={book.coverUrl}
          alt={book.title}
          className={`${selectedSizeClass} object-cover rounded-element img-ethereal shadow-glass`}
        />
        {/* Holographic shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-accent-violet/10 via-transparent to-accent-fuchsia/10 rounded-element" />
      </div>

      {/* Book Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-medium text-text-primary text-sm mb-1 line-clamp-2 group-hover:text-gradient-holographic transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-xs text-text-secondary mb-2">{book.author}</p>

        {/* Star Rating */}
        {showRating && book.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs transition-transform duration-200 hover:scale-110 ${i < Math.floor(book.rating!) ? 'star-filled' : 'star-empty'
                    }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-text-tertiary ml-1 font-accent italic">
              {book.rating}
            </span>
          </div>
        )}

        {/* Genre Tags */}
        {book.genres && book.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {book.genres.slice(0, 2).map((genre: string) => (
              <span
                key={genre}
                className="tag-glass"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
