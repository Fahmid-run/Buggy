import { mockUsers, mockProjects } from '../data/mockData';

export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatRelative = (date) => {
  if (!date) return '—';
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1mo ago' : `${months}mo ago`;
};

export const getUser = (id) => mockUsers.find((u) => u.id === id);
export const getProject = (id) => mockProjects.find((p) => p.id === id);

export const getInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const classNames = (...c) => c.filter(Boolean).join(' ');

export const paginate = (items, page, perPage = 8) => {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};
