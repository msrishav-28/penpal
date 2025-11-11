import { useState, useEffect } from 'react';
import { readingService } from '../services';
import { ReadingProgress } from '../types';

export const useReadingProgress = () => {
  const [progress, setProgress] = useState<ReadingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await readingService.getReadingProgress();
      setProgress(data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch reading progress');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return { progress, loading, error, refetch: fetchProgress };
};

export const useCurrentlyReading = () => {
  const [books, setBooks] = useState<ReadingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentlyReading = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await readingService.getCurrentlyReading();
        setBooks(data);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to fetch currently reading books');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentlyReading();
  }, []);

  return { books, loading, error };
};

export const useUpdateProgress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProgress = async (data: {
    book: string;
    currentPage: number;
    totalPages: number;
    status: 'want-to-read' | 'currently-reading' | 'finished';
  }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await readingService.updateProgress(data);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to update progress');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProgress, loading, error };
};
