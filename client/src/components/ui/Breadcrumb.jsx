import { HiChevronRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-base-content/60">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <HiChevronRight className="h-3.5 w-3.5 opacity-50" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-base-content transition-colors">{item.label}</Link>
          ) : (
            <span className={i === items.length - 1 ? 'text-base-content font-medium' : ''}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
