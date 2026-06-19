import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { NotFound } from "./components/NotFound";
import { RouteShell } from "./components/RouteShell";

const SystemsJourney = lazy(() =>
  import("./components/SystemsJourney").then((m) => ({ default: m.SystemsJourney })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteShell>
        <SystemsJourney />
      </RouteShell>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
