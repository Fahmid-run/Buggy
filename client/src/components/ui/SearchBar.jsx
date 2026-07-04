import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <label className={`input input-bordered input-sm md:input-md flex items-center gap-2 bg-base-100 ${className}`}>
      <HiMagnifyingGlass className="h-4 w-4 opacity-50" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="grow"
      />
    </label>
  );
}
