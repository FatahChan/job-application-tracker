/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as LoginImport } from "./routes/login";
import { Route as protectedLayoutImport } from "./routes/(protected)/_layout";
import { Route as protectedLayoutIndexImport } from "./routes/(protected)/_layout/index";

// Create Virtual Routes

const protectedImport = createFileRoute("/(protected)")();
const protectedLayoutFormLazyImport = createFileRoute(
  "/(protected)/_layout/form",
)();

// Create/Update Routes

const protectedRoute = protectedImport.update({
  id: "/(protected)",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const protectedLayoutRoute = protectedLayoutImport.update({
  id: "/_layout",
  getParentRoute: () => protectedRoute,
} as any);

const protectedLayoutIndexRoute = protectedLayoutIndexImport.update({
  path: "/",
  getParentRoute: () => protectedLayoutRoute,
} as any);

const protectedLayoutFormLazyRoute = protectedLayoutFormLazyImport
  .update({
    path: "/form",
    getParentRoute: () => protectedLayoutRoute,
  } as any)
  .lazy(() =>
    import("./routes/(protected)/_layout/form.lazy").then((d) => d.Route),
  );

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/(protected)": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof protectedImport;
      parentRoute: typeof rootRoute;
    };
    "/(protected)/_layout": {
      id: "/_layout";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof protectedLayoutImport;
      parentRoute: typeof protectedRoute;
    };
    "/(protected)/_layout/form": {
      id: "/_layout/form";
      path: "/form";
      fullPath: "/form";
      preLoaderRoute: typeof protectedLayoutFormLazyImport;
      parentRoute: typeof protectedLayoutImport;
    };
    "/(protected)/_layout/": {
      id: "/_layout/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof protectedLayoutIndexImport;
      parentRoute: typeof protectedLayoutImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  LoginRoute,
  protectedRoute: protectedRoute.addChildren({
    protectedLayoutRoute: protectedLayoutRoute.addChildren({
      protectedLayoutFormLazyRoute,
      protectedLayoutIndexRoute,
    }),
  }),
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/login",
        "/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/": {
      "filePath": "(protected)",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "(protected)/_layout.tsx",
      "parent": "/",
      "children": [
        "/_layout/form",
        "/_layout/"
      ]
    },
    "/_layout/form": {
      "filePath": "(protected)/_layout/form.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "(protected)/_layout/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */