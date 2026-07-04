import * as Icons from 'react-icons/hi2';
import StatCard from '../../components/ui/StatCard';
import ChartCard from '../../components/ui/ChartCard';
import BarChart from '../../components/ui/BarChart';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Timeline from '../../components/ui/Timeline';
import { useFetch } from '../../hooks/useFetch';
import { adminService } from '../../services/adminService';
import { mockActivity } from '../../data/mockData';
import { getUser } from '../../utils/helpers';

const monthly = [
  { label: 'Jan', value: 24 }, { label: 'Feb', value: 31 }, { label: 'Mar', value: 28 },
  { label: 'Apr', value: 42 }, { label: 'May', value: 38 }, { label: 'Jun', value: 51 },
  { label: 'Jul', value: 47 },
];

export default function AdminDashboard() {
  const { data: stats, loading } = useFetch(() => adminService.getStats(), []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-base-content/60 mt-1">Platform-wide overview and system health.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Icons.HiUsers} label="Total Users" value={stats?.totalUsers} trend={{ up: true, value: '8%', label: 'this month' }} tone="primary" />
        <StatCard icon={Icons.HiFolder} label="Projects" value={stats?.totalProjects} trend={{ up: true, value: '3', label: 'this month' }} tone="info" />
        <StatCard icon={Icons.HiBugAnt} label="Open Bugs" value={stats?.openBugs} trend={{ up: false, value: '5%', label: 'this week' }} tone="error" />
        <StatCard icon={Icons.HiCurrencyDollar} label="MRR" value={`$${(stats?.revenue / 1000).toFixed(1)}k`} trend={{ up: true, value: '12%', label: 'vs last month' }} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Bugs resolved" subtitle="Monthly resolution across the platform" action={<Badge tone="success">+18%</Badge>}>
            <BarChart data={monthly} />
          </ChartCard>
        </div>
        <Card><CardBody>
          <CardTitle>System Health</CardTitle>
          <div className="mt-4 space-y-3">
            {[
              { label: 'API', value: 'Operational', tone: 'success' },
              { label: 'Database', value: 'Operational', tone: 'success' },
              { label: 'Webhooks', value: 'Degraded', tone: 'warning' },
              { label: 'Background jobs', value: 'Operational', tone: 'success' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-sm">{s.label}</span>
                <Badge tone={s.tone}>{s.value}</Badge>
              </div>
            ))}
          </div>
        </CardBody></Card>
      </div>

      <Card><CardBody>
        <CardTitle>Latest Activity</CardTitle>
        <div className="mt-5"><Timeline items={mockActivity} /></div>
      </CardBody></Card>
    </div>
  );
}
