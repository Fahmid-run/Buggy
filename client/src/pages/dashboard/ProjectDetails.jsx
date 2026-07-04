import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Tabs from '../../components/ui/Tabs';
import StatCard from '../../components/ui/StatCard';
import Timeline from '../../components/ui/Timeline';
import EmptyState from '../../components/ui/EmptyState';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { useFetch } from '../../hooks/useFetch';
import { projectService } from '../../services/projectService';
import { bugService } from '../../services/bugService';
import { noteService } from '../../services/noteService';
import { mockActivity, mockTimeline } from '../../data/mockData';
import { PRIORITY, STATUS } from '../../constants';
import { formatDate, getUser } from '../../utils/helpers';

export default function ProjectDetails() {
  const { id } = useParams();
  const { data: project, loading } = useFetch(() => projectService.getById(id), [id]);
  const { data: allBugs } = useFetch(() => bugService.getAll(), []);
  const { data: allNotes } = useFetch(() => noteService.getAll(), []);

  const bugs = (allBugs || []).filter((b) => b.projectId === id);
  const notes = (allNotes || []).filter((n) => n.projectId === id);

  if (loading) return <div className="space-y-4">{[1,2,3].map((i) => <div key={i} className="skeleton h-24 w-full rounded-2xl" />)}</div>;
  if (!project) return <EmptyState title="Project not found" message="This project may have been deleted." action={<Link to="/projects"><Button>Back to projects</Button></Link>} />;

  const tabs = [
    { label: 'Overview', content: <Overview project={project} /> },
    { label: 'Bugs', count: bugs.length, content: <BugsTab bugs={bugs} /> },
    { label: 'Notes', count: notes.length, content: <NotesTab notes={notes} /> },
    { label: 'Activity', content: <div className="pt-5"><Timeline items={mockActivity} /></div> },
    { label: 'Files', content: <FilesTab /> },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Projects', to: '/projects' }, { label: project.name }]} />

      <Card>
        <CardBody>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary grid place-items-center shrink-0">
              <Icons.HiFolder className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
                <Badge tone="success">Active</Badge>
              </div>
              <p className="text-base-content/60 mt-2 max-w-2xl">{project.description}</p>
              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-base-content/60">
                <span className="flex items-center gap-2"><Icons.HiCalendar className="h-4 w-4" /> Created {formatDate(project.created)}</span>
                <span className="flex items-center gap-2"><Icons.HiUsers className="h-4 w-4" /> {project.members.length} members</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Icons.HiUserPlus className="h-4 w-4" /> Add Member</Button>
              <Button size="sm"><Icons.HiPlus className="h-4 w-4" /> New Bug</Button>
            </div>
          </div>

          <div className="flex -space-x-2 mt-6 pt-6 border-t border-base-300">
            {project.members.map((mid) => {
              const u = getUser(mid);
              return <Avatar key={mid} src={u?.avatar} name={u?.name} size="md" ring />;
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Icons.HiBugAnt} label="Open Bugs" value={project.openBugs} tone="error" />
        <StatCard icon={Icons.HiCheckCircle} label="Closed Bugs" value={project.closedBugs} tone="success" />
        <StatCard icon={Icons.HiUsers} label="Members" value={project.members.length} tone="primary" />
        <StatCard icon={Icons.HiFire} label="Critical" value={project.priority.critical} tone="warning" />
      </div>

      <Card>
        <CardBody>
          <Tabs tabs={tabs} />
        </CardBody>
      </Card>
    </div>
  );
}

function Overview({ project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Priority breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(project.priority).map(([k, v]) => (
            <div key={k} className="p-4 rounded-xl bg-base-200 border border-base-300">
              <p className="text-sm text-base-content/60 capitalize">{k}</p>
              <p className="text-2xl font-bold mt-1">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Description</h3>
        <p className="text-base-content/70 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}

function BugsTab({ bugs }) {
  if (bugs.length === 0) return <EmptyState title="No bugs yet" message="Report a bug to get started." />;
  return (
    <div className="space-y-2">
      {bugs.map((b) => (
        <Link key={b.id} to={`/bugs/${b.id}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors">
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{b.title}</p>
            <p className="text-xs text-base-content/50 mt-0.5">#{b.id} · {formatDate(b.created)}</p>
          </div>
          <Badge tone={b.priority}>{PRIORITY[b.priority.toUpperCase()]?.label}</Badge>
          <Badge tone={b.status}>{STATUS[b.status.toUpperCase()]?.label}</Badge>
        </Link>
      ))}
    </div>
  );
}

function NotesTab({ notes }) {
  if (notes.length === 0) return <EmptyState title="No notes yet" message="Create a note for this project." />;
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {notes.map((n) => (
        <Card key={n.id}><CardBody>
          <CardTitle className="text-base">{n.title}</CardTitle>
          <p className="text-sm text-base-content/60 mt-1 line-clamp-3">{n.content}</p>
          <div className="flex items-center gap-2 mt-3 text-xs text-base-content/50">
            <Avatar src={getUser(n.author)?.avatar} name={getUser(n.author)?.name} size="xs" />
            {getUser(n.author)?.name} · {formatDate(n.created)}
          </div>
        </CardBody></Card>
      ))}
    </div>
  );
}

function FilesTab() {
  return <EmptyState icon={<Icons.HiDocument className="h-8 w-8 text-base-content/40" />} title="No files uploaded" message="Drag and drop files to attach them to this project." />;
}
