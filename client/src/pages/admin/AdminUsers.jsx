import { useMemo, useState } from 'react';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import SearchBar from '../../components/ui/SearchBar';
import FilterDropdown from '../../components/ui/FilterDropdown';
import Pagination from '../../components/ui/Pagination';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../contexts/ToastContext';
import { adminService } from '../../services/adminService';
import { formatDate, paginate } from '../../utils/helpers';

const roleOptions = [{ value: 'all', label: 'All roles' }, { value: 'admin', label: 'Admin' }, { value: 'manager', label: 'Manager' }, { value: 'developer', label: 'Developer' }, { value: 'tester', label: 'Tester' }];

export default function AdminUsers() {
  const { toast } = useToast();
  const { data: users, loading, setData } = useFetch(() => adminService.getUsers(), []);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = useMemo(() => {
    return (users || []).filter((u) => {
      const ms = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const mr = role === 'all' || u.role === role;
      return ms && mr;
    });
  }, [users, search, role]);

  const paged = paginate(filtered, page, 6);

  const remove = async () => {
    await adminService.deleteUser(deleteId);
    setData((users || []).filter((u) => u.id !== deleteId));
    setDeleteId(null);
    toast('User removed.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Users</h1><p className="text-base-content/60 mt-1">{filtered.length} users</p></div>
        <Button><Icons.HiUserPlus className="h-4 w-4" /> Invite user</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search users..." className="flex-1" />
        <FilterDropdown label="Role" value={role} onChange={setRole} options={roleOptions} />
      </div>

      <Card><CardBody className="p-0">
        {loading ? (
          <div className="p-6 space-y-3">{[1,2,3,4].map((i) => <div key={i} className="skeleton h-12 w-full" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead><tr className="text-base-content/50">
                <th>User</th><th className="hidden md:table-cell">Role</th><th className="hidden md:table-cell">Status</th><th className="hidden lg:table-cell">Email</th><th className="hidden lg:table-cell">Joined</th><th></th>
              </tr></thead>
              <tbody>
                {paged.map((u) => (
                  <tr key={u.id} className="hover:bg-base-200">
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar src={u.avatar} name={u.name} size="sm" />
                        <div><p className="font-medium">{u.name}</p><p className="text-xs text-base-content/50">@{u.username}</p></div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell"><Badge tone="primary" className="capitalize">{u.role}</Badge></td>
                    <td className="hidden md:table-cell"><Badge tone={u.status === 'active' ? 'success' : 'neutral'} className="capitalize">{u.status}</Badge></td>
                    <td className="hidden lg:table-cell text-sm">{u.email}</td>
                    <td className="hidden lg:table-cell text-sm text-base-content/50">{formatDate(u.joined)}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-ghost btn-xs btn-square"><Icons.HiPencil className="h-4 w-4" /></button>
                        <button onClick={() => setDeleteId(u.id)} className="btn btn-ghost btn-xs btn-square text-error"><Icons.HiTrash className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody></Card>

      <div className="flex justify-center">
        <Pagination page={page} totalPages={Math.ceil(filtered.length / 6)} onChange={setPage} />
      </div>

      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={remove} title="Remove user?" message="This user will lose access to the workspace." confirmText="Remove" />
    </div>
  );
}
