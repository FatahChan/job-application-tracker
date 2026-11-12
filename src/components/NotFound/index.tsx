import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

function NotFound() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const isIndexPage = useMemo(
    () => routerState.location.pathname.includes("/index.html"),
    [routerState.location.pathname],
  );
  useEffect(() => {
    // Redirect to the root if the user is on the index page
    if (isIndexPage) navigate({ to: "/" });
  }, [navigate, isIndexPage]);

  if (isIndexPage || routerState.isLoading) return null;

  return <>Not Found</>;
}

export default NotFound;
