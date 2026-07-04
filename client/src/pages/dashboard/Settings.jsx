import { useState } from 'react';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { user } = useAuth();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [prefs, setPrefs] = useState({ email: true, push: true, mentions: true, weekly: false });
  const [lang, setLang] = useState('en');

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-base-content/60 mt-1">Manage your account and preferences.</p>
      </div>

      <Card><CardBody>
        <CardTitle>Profile Settings</CardTitle>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div><label className="label"><span className="label-text">Display name</span></label>
            <input defaultValue={user?.name} className="input input-bordered w-full" /></div>
          <div><label className="label"><span className="label-text">Email</span></label>
            <input defaultValue={user?.email} className="input input-bordered w-full" /></div>
        </div>
        <div className="flex justify-end mt-4"><Button onClick={() => toast('Profile saved.', 'success')}>Save</Button></div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Theme</CardTitle>
        <p className="text-sm text-base-content/60 mt-1">Choose how BugFlow looks to you.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 max-w-sm">
          {['light', 'dark'].map((t) => (
            <button key={t} onClick={() => setTheme(t)} className={`btn btn-outline justify-start capitalize ${theme === t ? 'btn-active' : ''}`}>
              {t === 'dark' ? <Icons.HiMoon className="h-4 w-4" /> : <Icons.HiSun className="h-4 w-4" />} {t}
            </button>
          ))}
        </div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Notification Preferences</CardTitle>
        <div className="mt-4 space-y-3">
          {[
            { key: 'email', label: 'Email notifications', desc: 'Receive updates about your bugs via email.' },
            { key: 'push', label: 'Push notifications', desc: 'Get real-time alerts in your browser.' },
            { key: 'mentions', label: 'Mentions', desc: 'Notify me when someone mentions me.' },
            { key: 'weekly', label: 'Weekly digest', desc: 'A summary of activity every Monday.' },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-2">
              <div><p className="text-sm font-medium">{n.label}</p><p className="text-xs text-base-content/50">{n.desc}</p></div>
              <input type="checkbox" checked={prefs[n.key]} onChange={(e) => setPrefs({ ...prefs, [n.key]: e.target.checked })} className="toggle toggle-primary" />
            </div>
          ))}
        </div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Language</CardTitle>
        <div className="mt-4 max-w-xs">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="select select-bordered w-full">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Account Settings</CardTitle>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Two-factor authentication</p><p className="text-xs text-base-content/50">Add an extra layer of security.</p></div><Button size="sm" variant="outline">Enable</Button></div>
          <div className="flex items-center justify-between py-2"><div><p className="text-sm font-medium">Active sessions</p><p className="text-xs text-base-content/50">Manage devices logged into your account.</p></div><Button size="sm" variant="ghost">View</Button></div>
        </div>
      </CardBody></Card>

      <Card className="border-error/30"><CardBody>
        <CardTitle className="text-error">Danger Zone</CardTitle>
        <Alert tone="error" className="mt-4">Deleting your account is permanent and cannot be undone. All your data will be removed.</Alert>
        <div className="flex justify-end mt-4"><Button variant="error" onClick={() => setDeleteOpen(true)}><Icons.HiTrash className="h-4 w-4" /> Delete account</Button></div>
      </CardBody></Card>

      <ConfirmModal open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={() => { setDeleteOpen(false); toast('Account deletion requested.', 'warning'); }} title="Delete account?" message="This action is permanent and cannot be undone." confirmText="Delete account" />
    </div>
  );
}
