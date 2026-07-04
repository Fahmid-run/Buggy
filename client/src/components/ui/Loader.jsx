export default function Loader({ fullScreen = false, label = 'Loading...' }) {
  if (fullScreen) {
    return (
      <div className="min-h-screen grid place-items-center bg-base-100">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/60">{label}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-16">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
