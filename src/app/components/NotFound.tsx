import { Link } from "react-router";

export function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">404</p>
        <h1 className="text-3xl mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          That narrative path doesn&apos;t exist. Start from the portfolio selector.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
        >
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
