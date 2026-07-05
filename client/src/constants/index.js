export const PRIORITY = {
  LOW: { value: 'Low', label: 'Low', color: 'badge-success' },
  MEDIUM: { value: 'Medium', label: 'Medium', color: 'badge-warning' },
  HIGH: { value: 'High', label: 'High', color: 'badge-error' },
};

export const STATUS = {
  OPEN: { value: 'open', label: 'Open', color: 'badge-info' },
  IN_PROGRESS: { value: 'in_progress', label: 'In Progress', color: 'badge-warning' },
  RESOLVED: { value: 'resolved', label: 'Resolved', color: 'badge-success' },
  CLOSED: { value: 'closed', label: 'Closed', color: 'badge-neutral' },
  REOPENED: { value: 'reopened', label: 'Reopened', color: 'badge-error' },
};

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DEVELOPER: 'developer',
  TESTER: 'tester',
};

export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'HiSquares2X2' },
  { to: '/projects', label: 'Projects', icon: 'HiFolder' },
  { to: '/bugs', label: 'Bugs', icon: 'HiBugAnt' },
  { to: '/notes', label: 'Notes', icon: 'HiDocumentText' },
  { to: '/profile', label: 'Profile', icon: 'HiUser' },
  { to: '/settings', label: 'Settings', icon: 'HiCog6Tooth' },
];

export const ADMIN_NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: 'HiSquares2X2' },
  { to: '/admin/analytics', label: 'Analytics', icon: 'HiChartBar' },
  { to: '/admin/users', label: 'Users', icon: 'HiUsers' },
  { to: '/admin/projects', label: 'Projects', icon: 'HiFolder' },
  { to: '/admin/bugs', label: 'Bugs', icon: 'HiBugAnt' },
  { to: '/admin/settings', label: 'Settings', icon: 'HiCog6Tooth' },
  { to: '/admin/profile', label: 'Profile', icon: 'HiUser' },
];

export const STORAGE_KEYS = {
  THEME: 'bugflow_theme',
  AUTH: 'bugflow_auth',
  USER: 'bugflow_user',
};
