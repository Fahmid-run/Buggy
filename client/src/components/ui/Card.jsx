import { classNames } from '../../utils/helpers';

export default function Card({ children, className = '', hover = false, ...rest }) {
  return (
    <div
      className={classNames(
        'card bg-base-100 border border-base-300 rounded-2xl shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-base-content/10 hover:-translate-y-0.5',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={classNames('card-body p-5', className)}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={classNames('card-title text-base font-semibold', className)}>{children}</h3>;
}
