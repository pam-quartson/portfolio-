import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8">
              The page hit an unexpected error. Try refreshing or return to the portfolio home.
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

    return this.props.children;
  }
}
