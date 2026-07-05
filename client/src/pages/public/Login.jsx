import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form);
      toast(`Welcome back`);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-base-200 border-r border-base-300">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary grid place-items-center text-primary-content font-bold">B</div>
          <span className="text-xl font-bold">Buggy</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold tracking-tight leading-tight">Welcome back to your workspace.</h2>
          <p className="mt-4 text-base-content/60 max-w-md">Sign in to track bugs, manage projects, and ship with confidence.</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,12,5,15].map((i) => <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} className="w-9 h-9 rounded-full border-2 border-base-200" alt="" />)}
            </div>
            <p className="text-sm text-base-content/60">Trusted by 12,000+ teams</p>
          </div>
        </div>
        <p className="text-sm text-base-content/40">© 2024 Buggy, Inc.</p>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary grid place-items-center text-primary-content font-bold">B</div>
              <span className="text-xl font-bold">BugFlow</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-base-content/60 mt-1">Enter your credentials to access your workspace.</p>

          {error && <Alert tone="error" className="mt-5">{error}</Alert>}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label"><span className="label-text">Email</span></label>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="avamitch"
                className="input input-bordered w-full"
                autoComplete="username"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="label"><span className="label-text">Password</span></label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="btn btn-ghost btn-sm btn-square absolute right-1 top-1/2 -translate-y-1/2">
                  {showPass ? <HiEyeSlash className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="checkbox checkbox-sm checkbox-primary" />
              <span className="text-sm text-base-content/70">Remember me</span>
            </label>
            <Button type="submit" loading={loading} className="w-full">Sign in</Button>
          </form>

          <p className="text-sm text-center mt-6 text-base-content/60">
            Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
