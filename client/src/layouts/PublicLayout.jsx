import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HiBars3, HiMoon, HiSun } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Sign in' },
  { to: '/register', label: 'Get started' },
];

export default function PublicLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center text-primary-content font-bold">B</div>
            <span className="text-lg font-bold tracking-tight">BugFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-8">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="px-3 py-2 text-sm font-medium text-base-content/70 hover:text-base-content rounded-lg hover:bg-base-200 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={toggleTheme} className="btn btn-ghost btn-square btn-sm">
              {theme === 'dark' ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="hidden sm:block"><Button size="sm" variant="ghost">Sign in</Button></Link>
            <Link to="/register" className="hidden sm:block"><Button size="sm">Get started</Button></Link>
            <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-square btn-sm md:hidden">
              <HiBars3 className="h-5 w-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-base-300 p-3 flex flex-col gap-1 animate-fade-in">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="px-3 py-2 rounded-lg hover:bg-base-200">{l.label}</Link>
            ))}
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
