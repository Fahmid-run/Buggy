import { classNames } from '../../utils/helpers';

export default function StatCard({ icon: Icon, label, value, trend, tone = 'primary', className = '' }) {
  const toneBg = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
  };

  return (
    <div className={classNames('card bg-base-100 border border-base-300 rounded-2xl p-5 transition-all hover:shadow-md hover:border-base-content/10', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-base-content/60 font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className={classNames('w-11 h-11 rounded-xl grid place-items-center', toneBg[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className={trend.up ? 'text-success font-medium' : 'text-error font-medium'}>
            {trend.up ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-base-content/50">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
