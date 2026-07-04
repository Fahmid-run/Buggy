import Avatar from './Avatar';
import { getUser } from '../../utils/helpers';

export default function Timeline({ items = [] }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-base-300" />
      <ul className="space-y-5">
        {items.map((item) => {
          const user = getUser(item.user);
          return (
            <li key={item.id} className="relative">
              <div className="absolute -left-[26px] top-0">
                <Avatar src={user?.avatar} name={user?.name} size="xs" />
              </div>
              <p className="text-sm">
                <span className="font-medium">{user?.name || 'Someone'}</span>{' '}
                <span className="text-base-content/60">{item.action}</span>{' '}
                {item.target && <span className="font-medium">{item.target}</span>}
              </p>
              <p className="text-xs text-base-content/40 mt-0.5">{item.time}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
