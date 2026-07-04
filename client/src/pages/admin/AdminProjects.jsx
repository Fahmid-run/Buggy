import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { useFetch } from '../../hooks/useFetch';
import { adminService } from '../../services/adminService';
import { formatDate, getUser } from '../../utils/helpers';

export default function AdminProjects() {
  const { data: projects, loading } = useFetch(() => adminService.getProjects(), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h1><p className="text-base-content/60 mt-1">Manage all projects on the platform.</p></div>
        <Button><Icons.HiPlus className="h-4 w-4" /> New project</Button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1,2,3,4,5,6].map((i) => <div key={i} className="skeleton h-40 w-full rounded-2xl" />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((p) => (
            <Card key={p.id} hover><CardBody>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><Icons.HiFolder className="h-5 w-5" /></div>
                <Badge tone="success">Active</Badge>
              </div>
              <CardTitle className="mt-3 text-base">{p.name}</CardTitle>
              <p className="text-sm text-base-content/60 mt-1 line-clamp-2">{p.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1.5 text-error"><Icons.HiBugAnt className="h-4 w-4" /> {p.openBugs}</span>
                <span className="flex items-center gap-1.5 text-success"><Icons.HiCheckCircle className="h-4 w-4" /> {p.closedBugs}</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
                <div className="flex -space-x-2">{p.members.slice(0, 3).map((id) => <Avatar key={id} src={getUser(id)?.avatar} name={getUser(id)?.name} size="xs" />)}</div>
                <span className="text-xs text-base-content/50">{formatDate(p.created)}</span>
              </div>
            </CardBody></Card>
          ))}
        </div>
      )}
    </div>
  );
}
