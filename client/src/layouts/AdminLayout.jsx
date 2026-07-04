import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ADMIN_NAV_ITEMS } from '../constants';

const titles = {
  '/admin': 'Admin Dashboard',
  '/admin/analytics': 'Analytics',
  '/admin/users': 'User Management',
  '/admin/projects': 'Project Management',
  '/admin/bugs': 'Bug Management',
  '/admin/settings': 'Admin Settings',
  '/admin/profile': 'Admin Profile',
};

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const title = titles[location.pathname] || 'Admin';

  return (
    <div className="min-h-screen bg-base-200/50">
      <div className="flex">
        <aside className="hidden md:block sticky top-0 h-screen shrink-0">
          <Sidebar items={ADMIN_NAV_ITEMS} adminSection />
        </aside>

        <div className="flex-1 min-w-0">
          <Navbar title={title} onMenuClick={() => setDrawerOpen(true)} />
          <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>

      <div className={`drawer ${drawerOpen ? 'drawer-on' : ''} md:hidden fixed inset-0 z-50`}>
        <div className="drawer-backdrop bg-black/50" onClick={() => setDrawerOpen(false)} />
        <div className={`drawer-side left-0 top-0 h-full transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar items={ADMIN_NAV_ITEMS} adminSection />
        </div>
      </div>
    </div>
  );
}
