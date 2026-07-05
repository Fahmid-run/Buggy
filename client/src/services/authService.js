import api, { mockRequest } from './axios';
import { mockUsers } from '../data/mockData';
import { PiYarn } from 'react-icons/pi';

export const authService = {
  async login(payload) {
    try {
       const email = payload.email;
       const password = payload.password;
      const { data } = await api.post('/api/auth/login', { email, password }, {
        withCredentials: true
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },
  async register(payload) {
    try {
      const name = payload.name;
      const email = payload.email;
      const password = payload.password;
      const { data } = await api.post('/api/register', {
        name,
        email,
        password,
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
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
