import { HiExclamationTriangle } from 'react-icons/hi2';
import { classNames } from '../../utils/helpers';

const tones = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

export default function Alert({ tone = 'info', title, children, className = '' }) {
  return (
    <div className={classNames('alert rounded-xl', tones[tone], className)}>
      <HiExclamationTriangle className="h-5 w-5" />
      <div>
        {title && <h4 className="font-semibold">{title}</h4>}
        {children && <p className="text-sm opacity-80">{children}</p>}
      </div>
    </div>
  );
}
