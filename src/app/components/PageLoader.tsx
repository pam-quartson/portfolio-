export function PageLoader() {
  return (
    <main
      className="min-h-screen bg-white flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="size-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm text-gray-500">Loading…</span>
      </div>
    </main>
  );
}
