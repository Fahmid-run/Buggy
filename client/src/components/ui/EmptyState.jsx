import { HiInbox } from 'react-icons/hi2';

export default function EmptyState({ title = 'Nothing here yet', message, icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-base-200 grid place-items-center mb-4">
        {icon || <HiInbox className="h-8 w-8 text-base-content/40" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="text-sm text-base-content/60 mt-1 max-w-sm">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
