import { Link } from 'react-router-dom';
import { HiFaceFrown } from 'react-icons/hi2';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-base-200/50 p-6">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold tracking-tight text-primary">404</p>
        <div className="w-16 h-16 rounded-2xl bg-base-200 grid place-items-center mx-auto my-6">
          <HiFaceFrown className="h-8 w-8 text-base-content/40" />
        </div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-base-content/60 mt-2">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="inline-block mt-6"><Button>Back to dashboard</Button></Link>
      </div>
    </div>
  );
}
