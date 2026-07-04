import api, { mockRequest } from './axios';
import { mockBugs } from '../data/mockData';

export const bugService = {
  async getAll() {
    try {
      const { data } = await api.get('/bugs');
      return data;
    } catch {
      return mockRequest(mockBugs);
    }
  },
  async getById(id) {
    try {
      const { data } = await api.get(`/bugs/${id}`);
      return data;
    } catch {
      const found = mockBugs.find((b) => b.id === id);
      return mockRequest(found || null);
    }
  },
  async create(payload) {
    try {
      const { data } = await api.post('/bugs', payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id: 'b' + Date.now() });
    }
  },
  async update(id, payload) {
    try {
      const { data } = await api.put(`/bugs/${id}`, payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id });
    }
  },
  async remove(id) {
    try {
      const { data } = await api.delete(`/bugs/${id}`);
      return data;
    } catch {
      return mockRequest({ success: true });
    }
  },
  async close(id) {
    try {
      const { data } = await api.post(`/bugs/${id}/close`);
      return data;
    } catch {
      return mockRequest({ id, status: 'closed' });
    }
  },
  async reopen(id) {
    try {
      const { data } = await api.post(`/bugs/${id}/reopen`);
      return data;
    } catch {
      return mockRequest({ id, status: 'open' });
    }
  },
};
