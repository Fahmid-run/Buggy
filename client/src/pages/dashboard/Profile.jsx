import { useState } from 'react';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import StatCard from '../../components/ui/StatCard';
import Timeline from '../../components/ui/Timeline';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { mockActivity, mockProjects, mockBugs } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', username: user?.username || '' });

  const save = (e) => { e.preventDefault(); updateProfile(form); toast('Profile updated.', 'success'); };

  const myProjects = mockProjects.filter((p) => p.members.includes(user?.id));
  const myBugs = mockBugs.filter((b) => b.assignee === user?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar src={user?.avatar} name={user?.name} size="xl" ring />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <Badge tone="primary" className="capitalize">{user?.role}</Badge>
                <Badge tone="success">Active</Badge>
              </div>
              <p className="text-base-content/60 mt-1">{user?.email}</p>
              <p className="text-sm text-base-content/50 mt-1">Joined {formatDate(user?.joined)}</p>
            </div>
            <Button variant="outline" size="sm"><Icons.HiCamera className="h-4 w-4" /> Change photo</Button>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Icons.HiFolder} label="Projects Joined" value={myProjects.length} tone="primary" />
        <StatCard icon={Icons.HiBugAnt} label="Open Bugs Assigned" value={myBugs.filter((b) => b.status !== 'closed').length} tone="error" />
        <StatCard icon={Icons.HiCheckCircle} label="Bugs Resolved" value={myBugs.filter((b) => b.status === 'resolved' || b.status === 'closed').length} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card><CardBody>
            <CardTitle>Personal Information</CardTitle>
            <form onSubmit={save} className="mt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label"><span className="label-text">Full name</span></label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input input-bordered w-full" /></div>
                <div><label className="label"><span className="label-text">Username</span></label>
                  <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input input-bordered w-full" /></div>
                <div><label className="label"><span className="label-text">Email</span></label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input input-bordered w-full" /></div>
                <div><label className="label"><span className="label-text">Role</span></label>
                  <input value={user?.role} disabled className="input input-bordered w-full capitalize" /></div>
              </div>
              <div className="flex justify-end"><Button type="submit">Save changes</Button></div>
            </form>
          </CardBody></Card>

          <Card className="mt-6"><CardBody>
            <CardTitle>Change Password</CardTitle>
            <div className="mt-4 space-y-4">
              <div><label className="label"><span className="label-text">Current password</span></label>
                <input type="password" className="input input-bordered w-full" /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="label"><span className="label-text">New password</span></label>
                  <input type="password" className="input input-bordered w-full" /></div>
                <div><label className="label"><span className="label-text">Confirm new</span></label>
                  <input type="password" className="input input-bordered w-full" /></div>
              </div>
              <div className="flex justify-end"><Button variant="outline">Update password</Button></div>
            </div>
          </CardBody></Card>
        </div>

        <Card><CardBody>
          <CardTitle>Recent Activity</CardTitle>
          <div className="mt-5"><Timeline items={mockActivity} /></div>
        </CardBody></Card>
      </div>
    </div>
  );
}
