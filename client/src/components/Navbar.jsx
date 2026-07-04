import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiBars3, HiMagnifyingGlass, HiBell, HiMoon, HiSun, HiChevronDown, HiCog6Tooth, HiUser, HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './ui/Avatar';

export default function Navbar({ onMenuClick, title }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-base-300 bg-base-100/80 backdrop-blur-md">
      <div className="h-full px-4 md:px-6 flex items-center gap-3">
        <button onClick={onMenuClick} className="btn btn-ghost btn-square btn-sm md:hidden">
          <HiBars3 className="h-5 w-5" />
        </button>

        {title && <h1 className="text-lg font-semibold hidden md:block">{title}</h1>}

        <div className="hidden lg:flex items-center gap-2 ml-2 flex-1 max-w-md">
          <label className="input input-bordered input-sm flex items-center gap-2 w-full bg-base-200/50">
            <HiMagnifyingGlass className="h-4 w-4 opacity-50" />
            <input type="text" placeholder="Search bugs, projects, notes..." className="grow" />
            <kbd className="kbd kbd-sm">⌘K</kbd>
          </label>
        </div>

        <div className="flex items-center gap-1 md:gap-2 ml-auto">
          <button className="btn btn-ghost btn-square btn-sm lg:hidden">
            <HiMagnifyingGlass className="h-5 w-5" />
          </button>

          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-square btn-sm relative" onClick={() => setNotifOpen(!notifOpen)}>
              <HiBell className="h-5 w-5" />
              <span className="badge badge-xs badge-error absolute -top-0.5 -right-0.5" />
            </button>
            {notifOpen && (
              <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-xl bg-base-100 border border-base-300 rounded-box w-80 animate-fade-in">
                <li className="menu-title">Notifications</li>
                <li><a><b>OAuth callback fails</b> — escalated to critical</a></li>
                <li><a><b>Invoice PDF hangs</b> — Sophia commented</a></li>
                <li><a><b>Webhook validation</b> — resolved by Lucas</a></li>
                <li className="border-t border-base-300 mt-1 pt-1"><a className="text-primary">View all</a></li>
              </ul>
            )}
          </div>

          <button onClick={toggleTheme} className="btn btn-ghost btn-square btn-sm">
            {theme === 'dark' ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </button>

          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost gap-2 pr-2 pl-1">
              <Avatar src={user?.avatar} name={user?.name} size="sm" />
              <span className="hidden md:block text-sm font-medium">{user?.name?.split(' ')[0]}</span>
              <HiChevronDown className="h-4 w-4 opacity-50 hidden md:block" />
            </button>
            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-xl bg-base-100 border border-base-300 rounded-box w-56 animate-fade-in">
              <li className="menu-title">
                <span className="truncate">{user?.name}</span>
                <span className="text-xs opacity-60 truncate">{user?.email}</span>
              </li>
              <li><Link to="/profile"><HiUser className="h-4 w-4" /> Profile</Link></li>
              <li><Link to="/settings"><HiCog6Tooth className="h-4 w-4" /> Settings</Link></li>
              <li><Link to="/admin"><HiCog6Tooth className="h-4 w-4" /> Admin Panel</Link></li>
              <li className="border-t border-base-300 mt-1 pt-1"><a onClick={handleLogout}><HiArrowRightOnRectangle className="h-4 w-4" /> Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
