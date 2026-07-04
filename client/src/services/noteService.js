import api, { mockRequest } from './axios';
import { mockNotes } from '../data/mockData';

export const noteService = {
  async getAll() {
    try {
      const { data } = await api.get('/notes');
      return data;
    } catch {
      return mockRequest(mockNotes);
    }
  },
  async create(payload) {
    try {
      const { data } = await api.post('/notes', payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id: 'n' + Date.now() });
    }
  },
  async update(id, payload) {
    try {
      const { data } = await api.put(`/notes/${id}`, payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id });
    }
  },
  async remove(id) {
    try {
      const { data } = await api.delete(`/notes/${id}`);
      return data;
    } catch {
      return mockRequest({ success: true });
    }
  },
};
