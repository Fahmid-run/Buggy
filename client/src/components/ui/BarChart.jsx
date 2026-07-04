export default function BarChart({ data = [], height = 200 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
          <div className="w-full flex items-end justify-center" style={{ height: height - 40 }}>
            <div
              className="w-full max-w-[36px] rounded-t-lg bg-primary/80 group-hover:bg-primary transition-all duration-300 relative"
              style={{ height: `${(d.value / max) * 100}%` }}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {d.value}
              </span>
            </div>
          </div>
          <span className="text-xs text-base-content/60">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
