import { createRootRoute, Outlet } from "@tanstack/react-router";
import React from "react";
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
const Route = createRootRoute({
  component: () => <Root />,
});

function Root() {
  return (
    <>
      <main className="p-4 md:p-16">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
}

export { Route };
