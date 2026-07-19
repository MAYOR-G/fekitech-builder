export default function Loading() {
  return (
    <div className="min-h-screen bg-ft-surface px-4 py-12 sm:px-8" role="status" aria-label="Loading dashboard">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-10 w-52 rounded-xl bg-ft-border-light" />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="overflow-hidden rounded-2xl border border-ft-border bg-white"><div className="h-40 bg-ft-surface-cool" /><div className="space-y-3 p-5"><div className="h-5 w-2/3 rounded bg-ft-border-light" /><div className="h-4 w-1/2 rounded bg-ft-border-light" /><div className="h-11 rounded-xl bg-ft-border-light" /></div></div>)}
        </div>
        <span className="sr-only">Loading your websites…</span>
      </div>
    </div>
  );
}
