export interface Book {
  _id?: string;
  id: string;
  title: string;
  author: string;
  authorId?: string;
  isbn?: string;
  coverUrl: string;
  rating?: number;
  genres?: string[];
  description?: string;
  pages?: number;
  publishedDate?: string;
  publisher?: string;
  language?: string;
  averageRating?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  addedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReadingProgress {
  _id?: string;
  bookId: string;
  book?: Book;
  currentPage: number;
  totalPages: number;
  percentage: number;
  status: 'want-to-read' | 'currently-reading' | 'finished';
  startDate?: Date | string;
  finishDate?: Date | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  readingGoal?: {
    year: number;
    target: number;
    completed: number;
  };
  booksRead?: string[] | Book[];
  currentlyReading?: string[] | Book[];
  wantToRead?: string[] | Book[];
  followers?: string[] | User[];
  following?: string[] | User[];
  favoriteGenres?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id?: string;
  id: string;
  bookId: string;
  book?: Book;
  userId: string;
  user?: User;
  rating: number;
  comment: string;
  likes?: string[];
  likesCount?: number;
  createdAt: Date | string;
  updatedAt?: string;
}

export interface Author {
  _id?: string;
  id: string;
  name: string;
  bio?: string;
  photoUrl?: string;
  birthDate?: Date | string;
  nationality?: string;
  website?: string;
  books?: string[] | Book[];
  followers?: string[] | User[];
  followersCount?: number;
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Activity {
  _id?: string;
  id: string;
  user: User;
  type: 'review' | 'rating' | 'started-reading' | 'finished-reading' | 'added-book' | 'followed-user' | 'followed-author';
  book?: Book;
  review?: Review;
  targetUser?: User;
  author?: Author;
  rating?: number;
  createdAt: string;
}

