import { useState } from 'react';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import SearchBar from '../../components/ui/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { noteService } from '../../services/noteService';
import { projectService } from '../../services/projectService';
import { formatDate, getUser, getProject } from '../../utils/helpers';

export default function Notes() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: notes, loading, setData } = useFetch(() => noteService.getAll(), []);
  const { data: projects } = useFetch(() => projectService.getAll(), []);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', projectId: 'p1', tags: [] });
   const projectArray = Array.isArray(projects)
        ? projects
        : projects?.data || [];

  const noteArray= Array.isArray(notes) ? notes: notes?.data || []
  const filtered = noteArray.filter(
    n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()),
  );

  const create = async () => {
    if (!form.title || !form.content) return toast('Title and content are required.', 'warning');
    const created = await noteService.create({ ...form, id: 'n' + Date.now(), author: user?.id || 'u1', created: new Date().toISOString().slice(0, 10) });
    setData([created, ...(notes || [])]);
    setCreateOpen(false);
    setForm({ title: '', content: '', projectId: 'p1', tags: [] });
    toast('Note created.', 'success');
  };

  const remove = async () => {
    await noteService.remove(deleteId);
    setData((notes || []).filter((n) => n.id !== deleteId));
    setDeleteId(null);
    toast('Note deleted.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Notes
          </h1>
          <p className="text-base-content/60 mt-1">
            {filtered.length} notes across your workspace
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Icons.HiPlus className="h-4 w-4" /> New Note
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search notes..."
        className="w-full max-w-md"
      />

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton h-44 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No notes found"
          message="Create a note to capture decisions and context."
          action={<Button onClick={() => setCreateOpen(true)}>New Note</Button>}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(n => (
            <Card key={n.id} hover>
              <CardBody>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{n.title}</CardTitle>
                  <button
                    onClick={() => setDeleteId(n.id)}
                    className="btn btn-ghost btn-xs btn-square text-base-content/40 hover:text-error"
                  >
                    <Icons.HiTrash className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-base-content/60 mt-2 line-clamp-4">
                  {n.content}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {n.tags?.map(t => (
                    <Badge key={t} tone="neutral">
                      #{t}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={getUser(n.author)?.avatar}
                      name={getUser(n.author)?.name}
                      size="xs"
                    />
                    <span className="text-xs text-base-content/60">
                      {getUser(n.author)?.name}
                    </span>
                  </div>
                  <span className="text-xs text-base-content/50">
                    {getProject(n.projectId)?.name}
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create note"
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
              <span className="label-text">Title</span>
            </label>
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Note title"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Write your note..."
              className="textarea textarea-bordered w-full"
              rows={4}
            />
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
      </Modal>

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={remove}
        title="Delete note?"
        message="This note will be permanently removed."
        confirmText="Delete"
      />
    </div>
  );
}
