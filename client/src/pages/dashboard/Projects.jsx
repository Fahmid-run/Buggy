import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import SearchBar from '../../components/ui/SearchBar';
import FilterDropdown from '../../components/ui/FilterDropdown';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../contexts/ToastContext';
import { projectService } from '../../services/projectService';
import { formatDate, getUser } from '../../utils/helpers';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'bugs', label: 'Most open bugs' },
  { value: 'name', label: 'Name (A-Z)' },
];

export default function Projects() {
  const { toast } = useToast();
  const { data: projects, loading, setData } = useFetch(() => projectService.getAll(), []);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
   
   const projectArray = Array.isArray(projects)
     ? projects
     : projects?.data || [];

  const filtered = useMemo(() => {
    let list = projectArray.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
   

    return list;
  }, [projectArray, search]);

  const create = async () => {
    if (!form.name) return toast('Project name is required.', 'warning');
    try {
    const created = await projectService.create(form);
      const newProject = created.data || created
    const currentProjectArray = Array.isArray(projects)
    ? projects
    : projects?.data || [];
      setData([newProject, ...currentProjectArray]);
      setCreateOpen(false);
      setForm({ name: '', description: '' });
      toast('Project created.', 'success');

    } catch (error) {
      toast(error.message || "Failed To Create Project");
      
    }
    
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-base-content/60 mt-1">
            {filtered.length} projects in your workspace
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Icons.HiPlus className="h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search projects..."
          className="flex-1"
        />
        <FilterDropdown
          label="Sort"
          value={sort}
          onChange={setSort}
          options={sortOptions}
        />
        <div className="join">
          <button
            className={`btn btn-sm btn-outline join-item ${view === 'grid' ? 'btn-active' : ''}`}
            onClick={() => setView('grid')}
          >
            <Icons.HiSquares2X2 className="h-4 w-4" />
          </button>
          <button
            className={`btn btn-sm btn-outline join-item ${view === 'list' ? 'btn-active' : ''}`}
            onClick={() => setView('list')}
          >
            <Icons.HiListBullet className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton h-48 w-full rounded-2xl" />
          ))}
        </div>
      ) : projectArray.length === 0 ? (
        <EmptyState
          title="No projects found"
          message="Try adjusting your search or create a new project."
          action={
            <Button onClick={() => setCreateOpen(true)}>New Project</Button>
          }
        />
      ) : view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <Card key={p.id} hover>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                    <Icons.HiFolder className="h-5 w-5" />
                  </div>
                  <Badge tone="success">Active</Badge>
                </div>
                <Link to={`/projects/${p.id}`}>
                  <CardTitle className="mt-3 hover:text-primary transition-colors">
                    {p.name}
                  </CardTitle>
                </Link>
                <p className="text-sm text-base-content/60 mt-1 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex items-center gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-1.5 text-error">
                    <Icons.HiBugAnt className="h-4 w-4" /> {p.openBugs}
                  </span>
                  <span className="flex items-center gap-1.5 text-success">
                    <Icons.HiCheckCircle className="h-4 w-4" /> {p.closedBugs}
                  </span>
                </div>

                {/* <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
                  <div className="flex -space-x-2">
                    {p.members.slice(0, 4).map((id) => {
                      const u = getUser(id);
                      return <Avatar key={id} src={u?.avatar} name={u?.name} size="xs" />;
                    })}
                    {p.members.length > 4 && <div className="avatar avatar-placeholder"><div className="w-6 h-6 rounded-full bg-base-300 text-xs grid place-items-center">+{p.members.length - 4}</div></div>}
                  </div>
                  <span className="text-xs text-base-content/50">{formatDate(p.created)}</span>
                </div> */}
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-base-content/50">
                    <th>Project</th>
                    {/* <th className="hidden md:table-cell">Members</th> */}
                    {/* <th>Open</th> */}
                    {/* <th className="hidden md:table-cell">Closed</th> */}
                    {/* <th className="hidden lg:table-cell">Created</th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-base-200">
                      <td>
                        <Link
                          to={`/projects/${p.id}`}
                          className="flex items-center gap-3"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary grid place-items-center">
                            <Icons.HiFolder className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-base-content/50 line-clamp-1">
                              {p.description}
                            </p>
                          </div>
                        </Link>
                      </td>
                      {/* <td className="hidden md:table-cell">
                        <div className="flex -space-x-2">
                          {p.members.slice(0, 3).map(id => (
                            <Avatar
                              key={id}
                              src={getUser(id)?.avatar}
                              name={getUser(id)?.name}
                              size="xs"
                            />
                          ))}
                        </div>
                      </td> */}
                      {/* <td>
                        <Badge tone="error">{p.openBugs}</Badge>
                      </td>
                      <td className="hidden md:table-cell">
                        <Badge tone="success">{p.closedBugs}</Badge>
                      </td> */}
                      {/* <td className="hidden lg:table-cell text-sm text-base-content/50">
                        {formatDate(p.created)}
                      </td> */}
                      <td>
                        <Link to={`/projects/${p.id}`}>
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new project"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={create}>Create</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Project name</span>
            </label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Mobile App v3"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="What is this project about?"
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
