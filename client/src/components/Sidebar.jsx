import { NavLink, useNavigate } from 'react-router-dom';
import * as Icons from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';
import { NAV_ITEMS } from '../constants';
import { classNames } from '../utils/helpers';

export default function Sidebar({ items = NAV_ITEMS, adminSection = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="h-full flex flex-col bg-base-100 border-r border-base-300 w-64">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-base-300">
        <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center text-primary-content font-bold">B</div>
        <span className="text-lg font-bold tracking-tight">BugFlow</span>
        {adminSection && <span className="badge badge-sm badge-warning ml-auto">Admin</span>}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="menu menu-md gap-1">
          {items.map((item) => {
            const Icon = Icons[item.icon] || Icons.HiSquares2X2;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/dashboard' || item.to === '/admin'}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-lg transition-colors',
                      isActive ? 'active font-medium' : 'hover:bg-base-200'
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {!adminSection && (
          <div className="mt-6">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-base-content/40">Admin</p>
            <ul className="menu menu-md gap-1">
              <li>
                <NavLink to="/admin" className={({ isActive }) => classNames('rounded-lg', isActive && 'active')}>
                  <Icons.HiShieldCheck className="h-5 w-5" />
                  Admin Panel
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-base-300">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <div className="avatar">
            <div className="w-9 h-9 rounded-full">
              <img src={user?.avatar} alt={user?.name} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-base-content/50 truncate capitalize">{user?.role}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm w-full justify-start mt-1 gap-2 text-base-content/70">
          <Icons.HiArrowRightOnRectangle className="h-4 w-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
