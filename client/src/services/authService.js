import api, { mockRequest } from './axios';
import { mockUsers } from '../data/mockData';

export const authService = {
  async login(credentials) {
    try {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    } catch {
      return mockRequest({ user: mockUsers[0], token: 'mock.jwt.token' });
    }
  },
  async register(payload) {
    try {
      const { data } = await api.post('/auth/register', payload);
      return data;
    } catch {
      return mockRequest({ user: { ...payload, id: 'u_new' }, token: 'mock.jwt.token' });
    }
  },
  async forgotPassword(email) {
    try {
      const { data } = await api.post('/auth/forgot', { email });
      return data;
    } catch {
      return mockRequest({ message: 'Reset link sent (mock).' });
    }
  },
};
