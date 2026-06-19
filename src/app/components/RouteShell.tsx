import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { PageLoader } from "./PageLoader";

export function RouteShell({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
