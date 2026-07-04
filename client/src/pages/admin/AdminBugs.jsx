import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import SearchBar from '../../components/ui/SearchBar';
import FilterDropdown from '../../components/ui/FilterDropdown';
import { useFetch } from '../../hooks/useFetch';
import { adminService } from '../../services/adminService';
import { PRIORITY, STATUS } from '../../constants';
import { formatDate, getUser, getProject } from '../../utils/helpers';
import { useState, useMemo } from 'react';

const priorityOptions = [{ value: 'all', label: 'All' }, ...Object.values(PRIORITY).map((p) => ({ value: p.value, label: p.label }))];
const statusOptions = [{ value: 'all', label: 'All' }, ...Object.values(STATUS).map((s) => ({ value: s.value, label: s.label }))];

export default function AdminBugs() {
  const { data: bugs, loading } = useFetch(() => adminService.getBugs(), []);
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => (bugs || []).filter((b) => {
    const ms = b.title.toLowerCase().includes(search.toLowerCase());
    const mp = priority === 'all' || b.priority === priority;
    const mst = status === 'all' || b.status === status;
    return ms && mp && mst;
  }), [bugs, search, priority, status]);

  const priorityCounts = Object.values(PRIORITY).map((p) => ({ ...p, count: (bugs || []).filter((b) => b.priority === p.value).length }));
  const statusCounts = Object.values(STATUS).map((s) => ({ ...s, count: (bugs || []).filter((b) => b.status === s.value).length }));

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Bug Management</h1><p className="text-base-content/60 mt-1">Oversee all bugs across the platform.</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {priorityCounts.map((p) => (
          <Card key={p.value}><CardBody className="p-4">
            <p className="text-sm text-base-content/60">{p.label}</p>
            <p className="text-2xl font-bold mt-1">{p.count}</p>
          </CardBody></Card>
        ))}
      </div>

      <Card><CardBody>
        <CardTitle>Status Overview</CardTitle>
        <div className="mt-4 flex flex-wrap gap-2">
          {statusCounts.map((s) => <Badge key={s.value} tone={s.value} className="text-sm py-3 px-4">{s.label}: {s.count}</Badge>)}
        </div>
      </CardBody></Card>

      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search bugs..." className="flex-1" />
        <FilterDropdown label="Priority" value={priority} onChange={setPriority} options={priorityOptions} />
        <FilterDropdown label="Status" value={status} onChange={setStatus} options={statusOptions} />
      </div>

      <Card><CardBody className="p-0">
        {loading ? <div className="p-6 space-y-3">{[1,2,3,4].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div> : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead><tr className="text-base-content/50">
                <th>Bug</th><th>Priority</th><th>Status</th><th className="hidden md:table-cell">Assignee</th><th className="hidden lg:table-cell">Project</th><th className="hidden lg:table-cell">Created</th>
              </tr></thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-base-200">
                    <td className="font-medium line-clamp-1 max-w-xs">{b.title}</td>
                    <td><Badge tone={b.priority}>{PRIORITY[b.priority.toUpperCase()]?.label}</Badge></td>
                    <td><Badge tone={b.status}>{STATUS[b.status.toUpperCase()]?.label}</Badge></td>
                    <td className="hidden md:table-cell"><div className="flex items-center gap-2"><Avatar src={getUser(b.assignee)?.avatar} name={getUser(b.assignee)?.name} size="xs" /><span className="text-sm">{getUser(b.assignee)?.name}</span></div></td>
                    <td className="hidden lg:table-cell text-sm">{getProject(b.projectId)?.name}</td>
                    <td className="hidden lg:table-cell text-sm text-base-content/50">{formatDate(b.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody></Card>
    </div>
  );
}
