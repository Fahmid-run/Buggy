import api, { mockRequest } from './axios';
import { mockProjects } from '../data/mockData';

export const projectService = {
  async getAll() {
    try {
      const { data } = await api.get('/projects');
      return data;
    } catch {
      return mockRequest(mockProjects);
    }
  },
  async getById(id) {
    try {
      const { data } = await api.get(`/projects/${id}`);
      return data;
    } catch {
      const found = mockProjects.find((p) => p.id === id);
      return mockRequest(found || null);
    }
  },
  async create(payload) {
    try {
      const { data } = await api.post('/projects', payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id: 'p' + Date.now() });
    }
  },
  async update(id, payload) {
    try {
      const { data } = await api.put(`/projects/${id}`, payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id });
    }
  },
  async remove(id) {
    try {
      const { data } = await api.delete(`/projects/${id}`);
      return data;
    } catch {
      return mockRequest({ success: true });
    }
  },
};
