import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/hi2';
import StatCard from '../../components/ui/StatCard';
import ChartCard from '../../components/ui/ChartCard';
import BarChart from '../../components/ui/BarChart';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Timeline from '../../components/ui/Timeline';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { StatCardSkeleton } from '../../components/ui/Skeleton';
import { useFetch } from '../../hooks/useFetch';
import { projectService } from '../../services/projectService';
import { bugService } from '../../services/bugService';
import { adminService } from '../../services/adminService';
import { mockActivity } from '../../data/mockData';
import { PRIORITY, STATUS } from '../../constants';
import { formatDate, getUser } from '../../utils/helpers';

const weeklyData = [
  { label: 'Mon', value: 8 }, { label: 'Tue', value: 12 }, { label: 'Wed', value: 6 },
  { label: 'Thu', value: 14 }, { label: 'Fri', value: 9 }, { label: 'Sat', value: 4 }, { label: 'Sun', value: 3 },
];

const quickActions = [
  { label: 'New Project', icon: 'HiFolderPlus', to: '/projects', tone: 'primary' },
  { label: 'Report Bug', icon: 'HiBugAnt', to: '/bugs', tone: 'error' },
  { label: 'Add Note', icon: 'HiPencilSquare', to: '/notes', tone: 'warning' },
  { label: 'Invite Member', icon: 'HiUserPlus', to: '/settings', tone: 'info' },
];

export default function Dashboard() {
  const { data: projects, loading: lp } = useFetch(() => projectService.getAll(), []);
  const { data: bugs, loading: lb } = useFetch(() => bugService.getAll(), []);
  const { data: stats, loading: ls } = useFetch(() => adminService.getStats(), []);


  const projectArray = Array.isArray(projects)
    ? projects
    : projects?.data || [];
  const recentProjects = projectArray.slice(0, 4);

  const recentBugArray = Array.isArray(bugs) ? bugs : bugs?.data || [];
  const recentBugs = recentBugArray.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-base-content/60 mt-1">
          Welcome back — here's what's happening across your workspace.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ls ? (
          <>
            {[1, 2, 3, 4].map(i => (
              <StatCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            <StatCard
              icon={Icons.HiFolder}
              label="Total Projects"
              value={stats?.totalProjects}
              trend={{ up: true, value: '12%', label: 'vs last month' }}
              tone="primary"
            />
            <StatCard
              icon={Icons.HiBugAnt}
              label="Open Bugs"
              value={stats?.openBugs}
              trend={{ up: false, value: '4%', label: 'vs last month' }}
              tone="error"
            />
            <StatCard
              icon={Icons.HiCheckCircle}
              label="Closed Bugs"
              value={stats?.closedBugs}
              trend={{ up: true, value: '18%', label: 'vs last month' }}
              tone="success"
            />
            <StatCard
              icon={Icons.HiFire}
              label="High Priority"
              value={stats?.highPriorityBugs}
              trend={{ up: false, value: '2', label: 'this week' }}
              tone="warning"
            />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Bugs resolved this week"
            subtitle="Daily resolution across all projects"
            action={<Badge tone="success">+18% WoW</Badge>}
          >
            <BarChart data={weeklyData} />
          </ChartCard>
        </div>

        {/* Quick actions */}
        <Card>
          <CardBody>
            <CardTitle>Quick Actions</CardTitle>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {quickActions.map(a => {
                const Icon = Icons[a.icon];
                return (
                  <Link
                    key={a.label}
                    to={a.to}
                    className="btn btn-outline h-auto py-4 flex-col gap-2 hover:btn-primary"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{a.label}</span>
                  </Link>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent projects */}
        
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Recent Projects</CardTitle>
                <Link to="/projects" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              {lp ? (
                <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
              ) : recentProjects.length === 0 ? (
                <EmptyState title="No projects yet" message="Create your first project to get started." />
              ) : (
                <div className="space-y-2">
                  {recentProjects.map((p) => (
                    <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                        <Icons.HiFolder className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{p.name}</p>
                        <p className="text-xs text-base-content/50">{p.openBugs} open · {p.closedBugs} closed</p>
                      </div>
                      <div className="flex -space-x-2">
                        {p.members.slice(0, 3).map((id) => {
                          const u = getUser(id);
                          return <Avatar key={id} src={u?.avatar} name={u?.name} size="xs" />;
                        })}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        {/* Activity */}
        <Card>
          <CardBody>
            <CardTitle>Activity</CardTitle>
            <div className="mt-5">
              <Timeline items={mockActivity} />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent bugs */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Recent Bugs</CardTitle>
            <Link to="/bugs" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {lb ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="text-base-content/50">
                    <th>Bug</th>
                    <th className="hidden md:table-cell">Priority</th>
                    <th className="hidden md:table-cell">Status</th>
                    <th className="hidden lg:table-cell">Assignee</th>
                    <th className="hidden lg:table-cell">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBugs.map(b => (
                    <tr key={b.id} className="hover:bg-base-200">
                      <td>
                        <Link
                          to={`/bugs/${b.id}`}
                          className="font-medium hover:text-primary line-clamp-1"
                        >
                          {b.title}
                        </Link>
                      </td>
                      <td className="hidden md:table-cell">
                        <Badge tone={b.priority}>
                          {PRIORITY[b.priority.toUpperCase()]?.label}
                        </Badge>
                      </td>
                      <td className="hidden md:table-cell">
                        <Badge tone={b.status}>
                          {STATUS[b.status.toUpperCase()]?.label}
                        </Badge>
                      </td>
                      <td className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={getUser(b.assignee)?.avatar}
                            name={getUser(b.assignee)?.name}
                            size="xs"
                          />
                          <span className="text-sm">
                            {getUser(b.assignee)?.name}
                          </span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell text-sm text-base-content/50">
                        {formatDate(b.created)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
