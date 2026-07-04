export const mockUsers = [
  { id: 'u1', name: 'Ava Mitchell', username: 'avamitch', email: 'ava.mitchell@bugflow.io', role: 'admin', status: 'active', avatar: 'https://i.pravatar.cc/150?img=1', joined: '2024-01-12' },
  { id: 'u2', name: 'Liam Carter', username: 'liamc', email: 'liam.carter@bugflow.io', role: 'manager', status: 'active', avatar: 'https://i.pravatar.cc/150?img=12', joined: '2024-02-03' },
  { id: 'u3', name: 'Sophia Nguyen', username: 'sophnguyen', email: 'sophia.nguyen@bugflow.io', role: 'developer', status: 'active', avatar: 'https://i.pravatar.cc/150?img=5', joined: '2024-02-20' },
  { id: 'u4', name: 'Noah Patel', username: 'noahp', email: 'noah.patel@bugflow.io', role: 'developer', status: 'active', avatar: 'https://i.pravatar.cc/150?img=15', joined: '2024-03-01' },
  { id: 'u5', name: 'Emma Rodriguez', username: 'emmarod', email: 'emma.rodriguez@bugflow.io', role: 'tester', status: 'active', avatar: 'https://i.pravatar.cc/150?img=9', joined: '2024-03-15' },
  { id: 'u6', name: 'Mason Lee', username: 'masonlee', email: 'mason.lee@bugflow.io', role: 'developer', status: 'inactive', avatar: 'https://i.pravatar.cc/150?img=13', joined: '2024-04-02' },
  { id: 'u7', name: 'Olivia Brooks', username: 'oliviab', email: 'olivia.brooks@bugflow.io', role: 'tester', status: 'active', avatar: 'https://i.pravatar.cc/150?img=20', joined: '2024-04-18' },
  { id: 'u8', name: 'Lucas Walker', username: 'lucasw', email: 'lucas.walker@bugflow.io', role: 'manager', status: 'active', avatar: 'https://i.pravatar.cc/150?img=11', joined: '2024-05-05' },
];

export const mockProjects = [
  { id: 'p1', name: 'Orbit Web App', description: 'Customer-facing analytics dashboard for the Orbit SaaS platform.', members: ['u1', 'u2', 'u3', 'u5'], openBugs: 12, closedBugs: 34, priority: { low: 4, medium: 5, high: 2, critical: 1 }, created: '2024-05-10', status: 'active' },
  { id: 'p2', name: 'Mobile Banking SDK', description: 'Cross-platform SDK for secure mobile banking integrations.', members: ['u2', 'u4', 'u7'], openBugs: 8, closedBugs: 21, priority: { low: 2, medium: 4, high: 1, critical: 1 }, created: '2024-05-22', status: 'active' },
  { id: 'p3', name: 'Marketplace API', description: 'REST and GraphQL APIs powering the partner marketplace.', members: ['u3', 'u6', 'u8'], openBugs: 5, closedBugs: 18, priority: { low: 1, medium: 3, high: 1, critical: 0 }, created: '2024-06-01', status: 'active' },
  { id: 'p4', name: 'Design System v2', description: 'Reusable component library and design tokens for all products.', members: ['u1', 'u5', 'u7'], openBugs: 3, closedBugs: 27, priority: { low: 2, medium: 1, high: 0, critical: 0 }, created: '2024-06-14', status: 'active' },
  { id: 'p5', name: 'Billing Engine', description: 'Usage-based billing, invoicing, and Stripe integration.', members: ['u2', 'u4', 'u8'], openBugs: 15, closedBugs: 9, priority: { low: 3, medium: 6, high: 4, critical: 2 }, created: '2024-06-28', status: 'active' },
  { id: 'p6', name: 'Notification Service', description: 'Multi-channel notifications: email, push, SMS, in-app.', members: ['u3', 'u6'], openBugs: 6, closedBugs: 12, priority: { low: 2, medium: 3, high: 1, critical: 0 }, created: '2024-07-05', status: 'active' },
];

export const mockBugs = [
  { id: 'b1', title: 'Chart tooltip overlaps legend on narrow viewports', description: 'When the dashboard is viewed below 768px, the chart tooltip renders on top of the legend, hiding series labels.', projectId: 'p1', priority: 'high', status: 'open', assignee: 'u3', reporter: 'u5', created: '2024-07-12', updated: '2024-07-14', comments: 4 },
  { id: 'b2', title: 'OAuth callback fails with expired session token', description: 'Users with an expired session token receive a 500 instead of being redirected to login.', projectId: 'p1', priority: 'critical', status: 'in_progress', assignee: 'u3', reporter: 'u2', created: '2024-07-10', updated: '2024-07-15', comments: 9 },
  { id: 'b3', title: 'Date picker does not respect timezone offset', description: 'Selecting a date in PST shows the previous day in the saved record due to UTC conversion.', projectId: 'p2', priority: 'medium', status: 'open', assignee: 'u4', reporter: 'u7', created: '2024-07-08', updated: '2024-07-08', comments: 2 },
  { id: 'b4', title: 'GraphQL resolver returns duplicate edges on cursor pagination', description: 'After the first page, edges from the previous page are repeated in the response.', projectId: 'p3', priority: 'high', status: 'open', assignee: 'u6', reporter: 'u8', created: '2024-07-06', updated: '2024-07-06', comments: 3 },
  { id: 'b5', title: 'Button focus ring invisible in dark mode', description: 'The focus-visible outline uses a dark color that blends into the background.', projectId: 'p4', priority: 'low', status: 'resolved', assignee: 'u5', reporter: 'u1', created: '2024-07-04', updated: '2024-07-13', comments: 1 },
  { id: 'b6', title: 'Invoice PDF generation hangs for accounts with > 500 line items', description: 'The PDF worker times out after 30s on large invoices, leaving the download stuck.', projectId: 'p5', priority: 'critical', status: 'in_progress', assignee: 'u4', reporter: 'u2', created: '2024-07-03', updated: '2024-07-15', comments: 7 },
  { id: 'b7', title: 'SMS provider fallback not triggered on rate limit', description: 'When Twilio returns 429, the fallback provider is not used and the message is dropped.', projectId: 'p6', priority: 'high', status: 'open', assignee: 'u3', reporter: 'u7', created: '2024-07-02', updated: '2024-07-02', comments: 2 },
  { id: 'b8', title: 'Empty state illustration overflows on small screens', description: 'The SVG illustration is not constrained and causes horizontal scroll on mobile.', projectId: 'p4', priority: 'low', status: 'closed', assignee: 'u7', reporter: 'u5', created: '2024-06-30', updated: '2024-07-10', comments: 0 },
  { id: 'b9', title: 'Webhook signature validation rejects valid payloads', description: 'The HMAC comparison fails intermittently due to a timing-safe comparison bug.', projectId: 'p5', priority: 'critical', status: 'resolved', assignee: 'u8', reporter: 'u2', created: '2024-06-28', updated: '2024-07-12', comments: 5 },
  { id: 'b10', title: 'Search results not debounced, causing 429s', description: 'Each keystroke fires a request; the backend rate-limits the client.', projectId: 'p1', priority: 'medium', status: 'open', assignee: 'u3', reporter: 'u5', created: '2024-06-26', updated: '2024-06-26', comments: 3 },
  { id: 'b11', title: 'Profile avatar upload strips EXIF orientation', description: 'Uploaded portraits appear rotated on iOS devices after processing.', projectId: 'p2', priority: 'medium', status: 'in_progress', assignee: 'u4', reporter: 'u7', created: '2024-06-24', updated: '2024-07-14', comments: 2 },
  { id: 'b12', title: 'Admin user table does not sort by joined date', description: 'Clicking the joined column header has no effect.', projectId: 'p3', priority: 'low', status: 'open', assignee: 'u6', reporter: 'u8', created: '2024-06-22', updated: '2024-06-22', comments: 1 },
];

export const mockNotes = [
  { id: 'n1', title: 'Release checklist for v2.4', content: 'Verify changelog, run smoke tests on staging, confirm rollback plan, and notify support team 24h before deploy.', author: 'u2', projectId: 'p1', created: '2024-07-15', tags: ['release', 'ops'] },
  { id: 'n2', title: 'OAuth debugging notes', content: 'Reproduced the 500 by letting the session expire for 30+ minutes. The refresh token endpoint returns 401 but the client does not catch it. Fix path: auth.interceptor.ts.', author: 'u3', projectId: 'p1', created: '2024-07-13', tags: ['auth', 'bug'] },
  { id: 'n3', title: 'Billing architecture decisions', content: 'Decided to move invoice generation to a background worker with idempotency keys. Redis queue, 3 retries with exponential backoff.', author: 'u4', projectId: 'p5', created: '2024-07-11', tags: ['architecture', 'billing'] },
  { id: 'n4', title: 'Design system token audit', content: 'Found 14 hardcoded color values in the codebase. Migrating to CSS variables this sprint. Tracking in DS-118.', author: 'u5', projectId: 'p4', created: '2024-07-09', tags: ['design', 'tech-debt'] },
  { id: 'n5', title: 'Notification provider SLAs', content: 'Twilio 99.95%, SendGrid 99.9%, APNs best-effort. Fallback chain documented in runbook NR-7.', author: 'u3', projectId: 'p6', created: '2024-07-07', tags: ['ops', 'notifications'] },
];

export const mockActivity = [
  { id: 'a1', user: 'u3', action: 'closed bug', target: 'Button focus ring invisible in dark mode', time: '2h ago' },
  { id: 'a2', user: 'u2', action: 'created project', target: 'Billing Engine', time: '5h ago' },
  { id: 'a3', user: 'u5', action: 'reported bug', target: 'Search results not debounced', time: '8h ago' },
  { id: 'a4', user: 'u4', action: 'commented on', target: 'Invoice PDF generation hangs', time: '1d ago' },
  { id: 'a5', user: 'u8', action: 'resolved', target: 'Webhook signature validation', time: '1d ago' },
  { id: 'a6', user: 'u7', action: 'created note', target: 'Design system token audit', time: '2d ago' },
];

export const mockStats = {
  totalProjects: 6,
  openBugs: 49,
  closedBugs: 121,
  highPriorityBugs: 9,
  totalUsers: 8,
  revenue: 48200,
};

export const mockTimeline = [
  { id: 't1', user: 'u5', action: 'reported this bug', time: '2024-07-12 09:14' },
  { id: 't2', user: 'u2', action: 'assigned to Sophia Nguyen', time: '2024-07-12 10:02' },
  { id: 't3', user: 'u3', action: 'changed priority to High', time: '2024-07-12 11:30' },
  { id: 't4', user: 'u3', action: 'moved to In Progress', time: '2024-07-13 14:45' },
  { id: 't5', user: 'u5', action: 'commented: "Still reproducible on Safari 17"', time: '2024-07-14 08:20' },
];

export const mockComments = [
  { id: 'c1', user: 'u5', content: 'Reproduced on Chrome 126 and Safari 17. Does not happen on Firefox.', created: '2024-07-12 09:30' },
  { id: 'c2', user: 'u3', content: 'Looks like the tooltip container has a fixed z-index. Bumping it above the legend should fix it.', created: '2024-07-12 11:10' },
  { id: 'c3', user: 'u2', content: 'Agreed. Let\'s also add a responsive test to the CI suite so this does not regress.', created: '2024-07-13 16:00' },
];
