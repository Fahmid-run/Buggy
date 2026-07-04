import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Icons from 'react-icons/hi2';
import Card, { CardBody, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Tabs from '../../components/ui/Tabs';
import Timeline from '../../components/ui/Timeline';
import EmptyState from '../../components/ui/EmptyState';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../contexts/ToastContext';
import { bugService } from '../../services/bugService';
import { mockTimeline, mockComments } from '../../data/mockData';
import { PRIORITY, STATUS } from '../../constants';
import { formatDate, getUser, getProject } from '../../utils/helpers';

export default function BugDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const { data: bug, loading, setData } = useFetch(() => bugService.getById(id), [id]);
  const [comment, setComment] = useState('');

  if (loading) return <div className="space-y-4">{[1,2,3].map((i) => <div key={i} className="skeleton h-24 w-full rounded-2xl" />)}</div>;
  if (!bug) return <EmptyState title="Bug not found" action={<Link to="/bugs"><Button>Back to bugs</Button></Link>} />;

  const close = async () => { await bugService.close(bug.id); setData({ ...bug, status: 'closed' }); toast('Bug closed.', 'success'); };
  const reopen = async () => { await bugService.reopen(bug.id); setData({ ...bug, status: 'open' }); toast('Bug reopened.', 'success'); };

  const tabs = [
    { label: 'Comments', count: mockComments.length, content: <CommentsTab comment={comment} setComment={setComment} /> },
    { label: 'Activity', content: <div className="pt-5"><Timeline items={mockTimeline} /></div> },
    { label: 'Attachments', content: <EmptyState icon={<Icons.HiPaperClip className="h-8 w-8 text-base-content/40" />} title="No attachments" message="Drag files here to attach them." /> },
    { label: 'History', content: <div className="pt-5"><Timeline items={mockTimeline} /></div> },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Bugs', to: '/bugs' }, { label: `#${bug.id}` }]} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge tone={bug.priority}>{PRIORITY[bug.priority.toUpperCase()]?.label} priority</Badge>
                <Badge tone={bug.status}>{STATUS[bug.status.toUpperCase()]?.label}</Badge>
                <span className="text-sm text-base-content/50">#{bug.id}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{bug.title}</h1>
              <p className="text-base-content/70 mt-3 leading-relaxed">{bug.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {bug.status !== 'closed' ? (
                  <Button variant="success" size="sm" onClick={close}><Icons.HiCheck className="h-4 w-4" /> Close bug</Button>
                ) : (
                  <Button variant="warning" size="sm" onClick={reopen}><Icons.HiArrowPath className="h-4 w-4" /> Reopen</Button>
                )}
                <Button variant="outline" size="sm"><Icons.HiPencil className="h-4 w-4" /> Edit</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Tabs tabs={tabs} />
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card><CardBody>
            <CardTitle className="text-base mb-4">Details</CardTitle>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-base-content/50">Project</dt><dd className="font-medium">{getProject(bug.projectId)?.name}</dd></div>
              <div className="flex justify-between"><dt className="text-base-content/50">Priority</dt><dd><Badge tone={bug.priority}>{PRIORITY[bug.priority.toUpperCase()]?.label}</Badge></dd></div>
              <div className="flex justify-between"><dt className="text-base-content/50">Status</dt><dd><Badge tone={bug.status}>{STATUS[bug.status.toUpperCase()]?.label}</Badge></dd></div>
              <div className="flex justify-between"><dt className="text-base-content/50">Created</dt><dd className="font-medium">{formatDate(bug.created)}</dd></div>
              <div className="flex justify-between"><dt className="text-base-content/50">Updated</dt><dd className="font-medium">{formatDate(bug.updated)}</dd></div>
            </dl>
          </CardBody></Card>

          <Card><CardBody>
            <CardTitle className="text-base mb-4">People</CardTitle>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar src={getUser(bug.assignee)?.avatar} name={getUser(bug.assignee)?.name} size="sm" />
                <div><p className="text-xs text-base-content/50">Assignee</p><p className="text-sm font-medium">{getUser(bug.assignee)?.name}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar src={getUser(bug.reporter)?.avatar} name={getUser(bug.reporter)?.name} size="sm" />
                <div><p className="text-xs text-base-content/50">Reporter</p><p className="text-sm font-medium">{getUser(bug.reporter)?.name}</p></div>
              </div>
            </div>
          </CardBody></Card>
        </div>
      </div>
    </div>
  );
}

function CommentsTab({ comment, setComment }) {
  const { toast } = useToast();
  const submit = (e) => { e.preventDefault(); if (!comment.trim()) return; setComment(''); toast('Comment posted.', 'success'); };
  return (
    <div className="space-y-5">
      <div className="space-y-4">
        {mockComments.map((c) => {
          const u = getUser(c.user);
          return (
            <div key={c.id} className="flex gap-3">
              <Avatar src={u?.avatar} name={u?.name} size="sm" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{u?.name}</p>
                  <span className="text-xs text-base-content/40">{c.created}</span>
                </div>
                <p className="text-sm text-base-content/80 mt-1">{c.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={submit} className="flex gap-3 pt-4 border-t border-base-300">
        <Avatar name="You" size="sm" />
        <div className="flex-1">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." className="textarea textarea-bordered w-full" rows={2} />
          <div className="flex justify-end mt-2"><Button size="sm" type="submit">Comment</Button></div>
        </div>
      </form>
    </div>
  );
}
