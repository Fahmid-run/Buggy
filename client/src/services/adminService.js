import api, { mockRequest } from './axios';
import { mockUsers, mockProjects, mockBugs, mockStats } from '../data/mockData';

export const adminService = {
  async getStats() {
    try {
      const { data } = await api.get('/admin/stats');
      return data;
    } catch {
      return mockRequest(mockStats);
    }
  },
  async getUsers() {
    try {
      const { data } = await api.get('/admin/users');
      return data;
    } catch {
      return mockRequest(mockUsers);
    }
  },
  async getProjects() {
    try {
      const { data } = await api.get('/admin/projects');
      return data;
    } catch {
      return mockRequest(mockProjects);
    }
  },
  async getBugs() {
    try {
      const { data } = await api.get('/admin/bugs');
      return data;
    } catch {
      return mockRequest(mockBugs);
    }
  },
  async updateUser(id, payload) {
    try {
      const { data } = await api.put(`/admin/users/${id}`, payload);
      return data;
    } catch {
      return mockRequest({ ...payload, id });
    }
  },
  async deleteUser(id) {
    try {
      const { data } = await api.delete(`/admin/users/${id}`);
      return data;
    } catch {
      return mockRequest({ success: true });
    }
  },
};
