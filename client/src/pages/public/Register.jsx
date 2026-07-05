import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function Register() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
   const { user } = useAuth();

   if (user) {
     navigate("/dashboard", { replace: true });
   }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (!form.terms) return setError('Please accept the terms to continue.');
    setLoading(true);
    try {
      const user = await register(form);
      
      toast(`Account created`);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-base-200 border-r border-base-300">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary grid place-items-center text-primary-content font-bold">B</div>
          <span className="text-xl font-bold">Buggy</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold tracking-tight leading-tight">Start tracking bugs the modern way.</h2>
          <p className="mt-4 text-base-content/60 max-w-md">Create your free workspace in seconds. No credit card required.</p>
        </div>
        <p className="text-sm text-base-content/40">© 2024 Buggy, Inc.</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-base-content/60 mt-1">Get started with a free workspace.</p>

          {error && <Alert tone="error" className="mt-5">{error}</Alert>}

          <form onSubmit={submit} className="mt-6 space-y-4">
            
            <div>
              <label className="label"><span className="label-text">Name</span></label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="janedoe" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label"><span className="label-text">Password</span></label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="input input-bordered w-full pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="btn btn-ghost btn-sm btn-square absolute right-1 top-1/2 -translate-y-1/2">
                  {showPass ? <HiEyeSlash className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="label"><span className="label-text">Confirm password</span></label>
              <input type={showPass ? 'text' : 'password'} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder="••••••••" className="input input-bordered w-full" />
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.checked })} className="checkbox checkbox-sm checkbox-primary mt-0.5" />
              <span className="text-sm text-base-content/70">I agree to the <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</span>
            </label>
            <Button type="submit" loading={loading} className="w-full">Create account</Button>
          </form>

          <p className="text-sm text-center mt-6 text-base-content/60">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
