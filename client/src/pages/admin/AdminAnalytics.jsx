import * as Icons from 'react-icons/hi2';
import StatCard from '../../components/ui/StatCard';
import ChartCard from '../../components/ui/ChartCard';
import BarChart from '../../components/ui/BarChart';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useFetch } from '../../hooks/useFetch';
import { adminService } from '../../services/adminService';

const growth = [
  { label: 'W1', value: 120 }, { label: 'W2', value: 145 }, { label: 'W3', value: 138 },
  { label: 'W4', value: 162 }, { label: 'W5', value: 178 }, { label: 'W6', value: 195 },
];

const distribution = [
  { label: 'Dev', value: 42 }, { label: 'QA', value: 18 }, { label: 'PM', value: 12 }, { label: 'Admin', value: 8 },
];

export default function AdminAnalytics() {
  const { data: stats } = useFetch(() => adminService.getStats(), []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-base-content/60 mt-1">Platform metrics and trends.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Icons.HiUsers} label="Active Users" value="1,284" trend={{ up: true, value: '14%', label: 'MoM' }} tone="primary" />
        <StatCard icon={Icons.HiFolder} label="Active Projects" value={stats?.totalProjects} tone="info" />
        <StatCard icon={Icons.HiBugAnt} label="Open Bugs" value={stats?.openBugs} tone="error" />
        <StatCard icon={Icons.HiCurrencyDollar} label="Revenue" value={`$${stats?.revenue?.toLocaleString()}`} trend={{ up: true, value: '12%', label: 'MoM' }} tone="success" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="User growth" subtitle="Weekly active users">
          <BarChart data={growth} />
        </ChartCard>
        <ChartCard title="Role distribution" subtitle="Users by role">
          <BarChart data={distribution} />
        </ChartCard>
      </div>

      <Card><CardBody>
        <CardTitle>Top projects by activity</CardTitle>
        <div className="mt-4 space-y-3">
          {['Orbit Web App', 'Billing Engine', 'Mobile Banking SDK', 'Marketplace API'].map((p, i) => (
            <div key={p} className="flex items-center gap-4">
              <span className="text-base-content/40 text-sm w-4">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{p}</p>
                <div className="h-2 bg-base-200 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${90 - i * 18}%` }} />
                </div>
              </div>
              <span className="text-sm text-base-content/60">{90 - i * 18}%</span>
            </div>
          ))}
        </div>
      </CardBody></Card>
    </div>
  );
}
