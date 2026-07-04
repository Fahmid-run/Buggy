import { HiChevronDown } from 'react-icons/hi2';

export default function FilterDropdown({ label, value, onChange, options }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-sm btn-outline gap-2">
        {label}: <span className="font-semibold">{options.find((o) => o.value === value)?.label || 'All'}</span>
        <HiChevronDown className="h-4 w-4" />
      </div>
      <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-lg bg-base-100 border border-base-300 rounded-box w-52 animate-fade-in">
        {options.map((o) => (
          <li key={o.value}>
            <button
              className={value === o.value ? 'active' : ''}
              onClick={() => onChange(o.value)}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
