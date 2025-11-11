import { FC } from 'react';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  showRating?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

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
    <div
      className={`flex space-x-3 p-3 rounded-element hover:bg-white/30 transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={book.coverUrl}
        alt={book.title}
        className={`${selectedSizeClass} object-cover rounded-element flex-shrink-0 shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:scale-105`}
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 hover:text-green-600 transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{book.author}</p>

        {showRating && book.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(book.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">{book.rating}</span>
          </div>
        )}

        {book.genres && book.genres.length > 0 && (
          <div className="flex space-x-1">
            {book.genres.slice(0, 2).map((genre: string) => (
              <span key={genre} className="px-2 py-1 glass-dark text-xs rounded-element text-gray-700">
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
