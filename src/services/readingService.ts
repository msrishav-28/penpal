import api from './api';
import { ReadingProgress } from '../types';

export interface UpdateProgressData {
  book: string;
  currentPage: number;
  totalPages: number;
  status: 'want-to-read' | 'currently-reading' | 'finished';
}

export const readingService = {
  // Get user's reading progress
  getReadingProgress: async (): Promise<ReadingProgress[]> => {
    return await api.get<ReadingProgress[]>('/reading/progress');
  },

  // Update reading progress
  updateProgress: async (data: UpdateProgressData): Promise<ReadingProgress> => {
    return await api.post<ReadingProgress>('/reading/progress', data);
  },

  // Delete reading progress
  deleteProgress: async (bookId: string): Promise<{ message: string }> => {
    return await api.delete<{ message: string }>(`/reading/progress/${bookId}`);
  },

  // Get currently reading books
  getCurrentlyReading: async (): Promise<ReadingProgress[]> => {
    const allProgress = await api.get<ReadingProgress[]>('/reading/progress');
    return allProgress.filter((progress) => progress.status === 'currently-reading');
  },

  // Get want to read books
  getWantToRead: async (): Promise<ReadingProgress[]> => {
    const allProgress = await api.get<ReadingProgress[]>('/reading/progress');
    return allProgress.filter((progress) => progress.status === 'want-to-read');
  },

  // Get finished books
  getFinished: async (): Promise<ReadingProgress[]> => {
    const allProgress = await api.get<ReadingProgress[]>('/reading/progress');
    return allProgress.filter((progress) => progress.status === 'finished');
  },
};
