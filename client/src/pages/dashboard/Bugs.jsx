import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import SearchBar from '../../components/ui/SearchBar';
import FilterDropdown from '../../components/ui/FilterDropdown';
import EmptyState from '../../components/ui/EmptyState';
import ConfirmModal from '../../components/ui/ConfirmModal';
import Modal from '../../components/ui/Modal';
import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../contexts/ToastContext';
import { bugService } from '../../services/bugService';
import { projectService } from '../../services/projectService';
import { PRIORITY, STATUS } from '../../constants';
import { formatDate, getUser, getProject } from '../../utils/helpers';

const priorityOptions = [{ value: 'all', label: 'All priorities' }, ...Object.values(PRIORITY).map((p) => ({ value: p.value, label: p.label }))];
const statusOptions = [{ value: 'all', label: 'All statuses' }, ...Object.values(STATUS).map((s) => ({ value: s.value, label: s.label }))];
const sortOptions = [{ value: 'newest', label: 'Newest' }, { value: 'oldest', label: 'Oldest' }, { value: 'priority', label: 'Priority' }];

export default function Bugs() {
  const { toast } = useToast();
  const { data: bugs, loading, setData } = useFetch(() => bugService.getAll(), []);
  const { data: projects } = useFetch(() => projectService.getAll(), []);
  
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', projectId: '' });
  const [deleteId, setDeleteId] = useState(null);

    const projectArray = Array.isArray(projects)
      ? projects
      : projects?.data || [];

    const bugArray = Array.isArray(bugs) ? bugs : bugs?.data || [];

  

  const filtered = useMemo(() => {

    let list = bugArray.filter(b => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      // const matchPriority = priority === 'all' || b.priority === priority;
      // const matchStatus = status === 'all' || b.status === status;
      // return matchSearch && matchPriority && matchStatus;
    });
    // const priorityRank = { critical: 0, high: 1, medium: 2, low: 3 };
    // list = [...list].sort((a, b) => {
    //   if (sort === 'newest') return new Date(b.created) - new Date(a.created);
    //   if (sort === 'oldest') return new Date(a.created) - new Date(b.created);
    //   if (sort === 'priority') return priorityRank[a.priority] - priorityRank[b.priority];
    //   return 0;
    // });
    return list;
  }, [bugs, search, priority, status, sort]);

  const create = async () => {
    if (!form.title) return toast('Title is required.', 'warning');
    const created = await bugService.create(form);
    const newCurrentBug= created.data|| created

    const newBugArray = Array.isArray(bugs) ? bugs : bugs?.data || [];


    setData([newCurrentBug, ...newBugArray]);
    setCreateOpen(false);
    setForm({ title: '', description: '', priority: 'Medium', projectId: '' });
    toast('Bug reported.', 'success');
  };

  const remove = async () => {
    await bugService.remove(deleteId);
    setData((bugs || []).filter((b) => b.id !== deleteId));
    setDeleteId(null);
    toast('Bug deleted.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Bugs
          </h1>
          <p className="text-base-content/60 mt-1">
            {filtered.length} bugs tracked
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Icons.HiPlus className="h-4 w-4" /> Report Bug
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 flex-wrap">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search bugs..."
          className="flex-1 min-w-[200px]"
        />
        <FilterDropdown
          label="Priority"
          value={priority}
          onChange={setPriority}
          options={priorityOptions}
        />
        <FilterDropdown
          label="Status"
          value={status}
          onChange={setStatus}
          options={statusOptions}
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
            <div key={i} className="skeleton h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No bugs found"
          message="Try adjusting filters or report a new bug."
          action={
            <Button onClick={() => setCreateOpen(true)}>Report Bug</Button>
          }
        />
      ) : view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(b => (
            <Card key={b.id} hover>
              <CardBody>
                <div className="flex items-center gap-2 mb-3">
                  <Badge tone={b.priority}>
                    {PRIORITY[b.priority.toUpperCase()]?.label}
                  </Badge>
                  <Badge tone={b.status}>
                    {STATUS[b.status.toUpperCase()]?.label}
                  </Badge>
                </div>
                <Link to={`/bugs/${b.id}`}>
                  <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                    {b.title}
                  </h3>
                </Link>
                <p className="text-sm text-base-content/60 mt-1 line-clamp-2">
                  {b.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={getUser(b.assignee)?.avatar}
                      name={getUser(b.assignee)?.name}
                      size="xs"
                    />
                    <span className="text-xs text-base-content/60">
                      {getUser(b.assignee)?.name}
                    </span>
                  </div>
                  <span className="text-xs text-base-content/50">
                    {getProject(b.projectId)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Link to={`/bugs/${b.id}`} className="btn btn-ghost btn-xs">
                    View
                  </Link>
                  <button
                    onClick={() => setDeleteId(b.id)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    Delete
                  </button>
                </div>
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
                    <th>Bug</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th className="hidden md:table-cell">Assignee</th>
                    <th className="hidden lg:table-cell">Project</th>
                    <th className="hidden lg:table-cell">Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-base-200">
                      <td>
                        <Link
                          to={`/bugs/${b.id}`}
                          className="font-medium hover:text-primary line-clamp-1 max-w-xs"
                        >
                          {b.title}
                        </Link>
                      </td>
                      <td>
                        <Badge tone={b.priority}>
                          {PRIORITY[b.priority.toUpperCase()]?.label}
                        </Badge>
                      </td>
                      <td>
                        <Badge tone={b.status}>
                          {STATUS[b.status.toUpperCase()]?.label}
                        </Badge>
                      </td>
                      <td className="hidden md:table-cell">
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
                      <td className="hidden lg:table-cell text-sm">
                        {getProject(b.projectId)?.name}
                      </td>
                      <td className="hidden lg:table-cell text-sm text-base-content/50">
                        {formatDate(b.created)}
                      </td>
                      <td>
                        <button
                          onClick={() => setDeleteId(b.id)}
                          className="btn btn-ghost btn-xs text-error"
                        >
                          Delete
                        </button>
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
        title="Report a new bug"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={create}>Report</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Brief summary of the issue"
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
              placeholder="Steps to reproduce, expected vs actual"
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
                className="select select-bordered w-full"
              >
                {Object.values(PRIORITY).map(p => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Project</span>
              </label>
              <select
                value={form.projectId}
                onChange={e => setForm({ ...form, projectId: e.target.value })}
                className="select select-bordered w-full"
              >
                {projectArray.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={remove}
        title="Delete bug?"
        message="This bug and its comments will be permanently removed."
        confirmText="Delete"
      />
    </div>
  );
}
