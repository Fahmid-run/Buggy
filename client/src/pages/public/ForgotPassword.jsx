import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiEnvelope, HiArrowLeft } from 'react-icons/hi2';
import { useToast } from '../../contexts/ToastContext';
import { authService } from '../../services/authService';
import Button from '../../components/ui/Button';

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
      toast('Reset link sent to your email.', 'success');
    } catch {
      toast('Could not send reset link.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-base-200/50 p-6">
      <div className="w-full max-w-md">
        <Link to="/login" className="flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content mb-6">
          <HiArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
        <div className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm">
          <div className="card-body p-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
              <HiEnvelope className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-sm text-base-content/60 mt-1">
              {sent ? `We've sent a reset link to ${email}.` : 'Enter your email and we\'ll send you a link to reset your password.'}
            </p>

            {!sent ? (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <label className="label"><span className="label-text">Email</span></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="input input-bordered w-full" required />
                </div>
                <Button type="submit" loading={loading} className="w-full">Send reset link</Button>
              </form>
            ) : (
              <div className="mt-6">
                <Link to="/login"><Button variant="outline" className="w-full">Return to sign in</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
