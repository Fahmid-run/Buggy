import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="join">
      <button
        className="join-item btn btn-sm btn-outline"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <HiChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`join-item btn btn-sm ${p === page ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="join-item btn btn-sm btn-outline"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        <HiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
