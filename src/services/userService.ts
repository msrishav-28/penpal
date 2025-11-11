import api from './api';
import { User } from '../types';

export interface Activity {
  _id: string;
  user: User;
  type: 'review' | 'rating' | 'started-reading' | 'finished-reading' | 'added-book' | 'followed-user' | 'followed-author';
  book?: unknown;
  review?: unknown;
  targetUser?: User;
  author?: unknown;
  rating?: number;
  createdAt: string;
}

export const userService = {
  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    return await api.get<User>(`/users/${id}`);
  },

  // Follow/unfollow a user
  followUser: async (id: string): Promise<{ following: boolean; followersCount: number }> => {
    return await api.post<{ following: boolean; followersCount: number }>(`/users/${id}/follow`);
  },

  // Get user's followers
  getFollowers: async (id: string): Promise<User[]> => {
    return await api.get<User[]>(`/users/${id}/followers`);
  },

  // Get user's following
  getFollowing: async (id: string): Promise<User[]> => {
    return await api.get<User[]>(`/users/${id}/following`);
  },

  // Get activity feed
  getActivityFeed: async (): Promise<Activity[]> => {
    return await api.get<Activity[]>('/users/feed');
  },
};
