import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/helpers';

export default function AdminProfile() {
  const { user } = useAuth();
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Profile</h1>

      <Card><CardBody>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Avatar src={user?.avatar} name={user?.name} size="xl" ring />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <Badge tone="warning">Administrator</Badge>
            </div>
            <p className="text-base-content/60 mt-1">{user?.email}</p>
            <p className="text-sm text-base-content/50 mt-1">Joined {formatDate(user?.joined)}</p>
          </div>
        </div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Admin Information</CardTitle>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div><label className="label"><span className="label-text">Full name</span></label><input defaultValue={user?.name} className="input input-bordered w-full" /></div>
          <div><label className="label"><span className="label-text">Email</span></label><input defaultValue={user?.email} className="input input-bordered w-full" /></div>
        </div>
        <div className="flex justify-end mt-4"><Button>Save changes</Button></div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Security</CardTitle>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Two-factor authentication</p><p className="text-xs text-base-content/50">Required for admin accounts.</p></div><Badge tone="success">Enabled</Badge></div>
          <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Last password change</p><p className="text-xs text-base-content/50">14 days ago</p></div><Button size="sm" variant="outline">Change</Button></div>
        </div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Change Password</CardTitle>
        <div className="mt-4 space-y-4">
          <div><label className="label"><span className="label-text">Current password</span></label><input type="password" className="input input-bordered w-full" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label"><span className="label-text">New password</span></label><input type="password" className="input input-bordered w-full" /></div>
            <div><label className="label"><span className="label-text">Confirm</span></label><input type="password" className="input input-bordered w-full" /></div>
          </div>
          <div className="flex justify-end"><Button variant="outline">Update password</Button></div>
        </div>
      </CardBody></Card>
    </div>
  );
}
