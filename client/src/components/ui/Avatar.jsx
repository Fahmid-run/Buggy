import { classNames, getInitials } from '../../utils/helpers';

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

export default function Avatar({ src, name = '', size = 'md', className = '', ring = false }) {
  return (
    <div className={classNames('avatar', ring && 'ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full', className)}>
      <div className={classNames('rounded-full bg-neutral text-neutral-content grid place-items-center font-semibold', sizes[size])}>
        {src ? (
          <img src={src} alt={name} />
        ) : (
          <span>{getInitials(name || '?')}</span>
        )}
      </div>
    </div>
  );
}
