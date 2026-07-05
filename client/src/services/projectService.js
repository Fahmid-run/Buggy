import api, { mockRequest } from './axios';
import { mockProjects } from '../data/mockData';

export const projectService = {
  async getAll() {
    try {
      const { data } = await api.get('/api/projects');

      return data.data;
    } catch {
      return mockRequest(mockProjects);
    }
  },
  async getById(id) {
    try {
      const { data } = await api.get(`/api/projects/${id}`);
      return data;
    } catch {
      const found = mockProjects.find((p) => p.id === id);
      return mockRequest(found || null);
    }
  },
  async create(payload) {
    try {
      const { data } = await api.post('/api/projects', {name:payload.name});
      return data;
    } catch(error) {
      throw new Error(error)
    }
  },
  async update(id, payload) {
    try {
      const { data } = await api.put(`/api/projects/${id}`, payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id });
    }
  },
  async remove(id) {
    try {
      const { data } = await api.delete(`/api/projects/${id}`);
      return data;
    } catch {
      return mockRequest({ success: true });
    }
  },
};
