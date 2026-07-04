import { useState } from 'react';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';

export default function AdminSettings() {
  const { toast } = useToast();
  const [siteName, setSiteName] = useState('BugFlow');
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Settings</h1><p className="text-base-content/60 mt-1">Configure platform-wide settings.</p></div>

      <Card><CardBody>
        <CardTitle>General Settings</CardTitle>
        <div className="mt-4 space-y-4">
          <div><label className="label"><span className="label-text">Site name</span></label>
            <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="input input-bordered w-full max-w-sm" /></div>
          <div><label className="label"><span className="label-text">Logo</span></label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary grid place-items-center text-primary-content font-bold text-xl">B</div>
              <Button variant="outline" size="sm"><Icons.HiArrowUpTray className="h-4 w-4" /> Upload new logo</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4"><Button onClick={() => toast('Settings saved.', 'success')}>Save</Button></div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Maintenance Mode</CardTitle>
        <div className="flex items-center justify-between mt-4">
          <div><p className="text-sm font-medium">Enable maintenance mode</p><p className="text-xs text-base-content/50">Temporarily disable user access while you update the platform.</p></div>
          <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} className="toggle toggle-warning" />
        </div>
      </CardBody></Card>

      <Card><CardBody>
        <CardTitle>Email Settings</CardTitle>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div><label className="label"><span className="label-text">SMTP host</span></label><input defaultValue="smtp.bugflow.io" className="input input-bordered w-full" /></div>
          <div><label className="label"><span className="label-text">SMTP port</span></label><input defaultValue="587" className="input input-bordered w-full" /></div>
          <div><label className="label"><span className="label-text">From email</span></label><input defaultValue="noreply@bugflow.io" className="input input-bordered w-full" /></div>
          <div><label className="label"><span className="label-text">From name</span></label><input defaultValue="BugFlow" className="input input-bordered w-full" /></div>
        </div>
        <div className="flex justify-end mt-4"><Button variant="outline">Test connection</Button></div>
      </CardBody></Card>
    </div>
  );
}
