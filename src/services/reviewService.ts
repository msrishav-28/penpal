import api from './api';
import { Review } from '../types';

export interface CreateReviewData {
  book: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

export const reviewService = {
  // Create a review
  createReview: async (data: CreateReviewData): Promise<Review> => {
    return await api.post<Review>('/reviews', data);
  },

  // Update a review
  updateReview: async (id: string, data: UpdateReviewData): Promise<Review> => {
    return await api.put<Review>(`/reviews/${id}`, data);
  },

  // Delete a review
  deleteReview: async (id: string): Promise<{ message: string }> => {
    return await api.delete<{ message: string }>(`/reviews/${id}`);
  },

  // Like/unlike a review
  likeReview: async (id: string): Promise<{ likesCount: number; liked: boolean }> => {
    return await api.post<{ likesCount: number; liked: boolean }>(`/reviews/${id}/like`);
  },
};
