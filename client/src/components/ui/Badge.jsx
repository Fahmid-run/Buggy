import { classNames } from '../../utils/helpers';
import { PRIORITY, STATUS } from '../../constants';

const toneMap = {
  ...Object.fromEntries(Object.values(PRIORITY).map((p) => [p.value, p.color])),
  ...Object.fromEntries(Object.values(STATUS).map((s) => [s.value, s.color])),
  neutral: 'badge-neutral',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  default: 'badge-ghost',
};

export default function Badge({ children, tone = 'default', size = 'md', className = '' }) {
  const badgeClass = toneMap[tone] || toneMap.default;
  return (
    <span
      className={classNames(
        'badge badge-soft border-0 font-medium',
        badgeClass,
        size === 'sm' ? 'badge-sm' : '',
        className
      )}
    >
      {children}
    </span>
  );
}
