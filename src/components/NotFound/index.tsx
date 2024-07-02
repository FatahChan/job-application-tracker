import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

function NotFound() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  useEffect(() => {
    // Redirect to the root if the user is on the index page
    if (routerState.location.pathname === "/index.html") navigate({ to: "/" });
  }, [navigate, routerState.location.pathname]);

  if (routerState.location.pathname === "/index.html") return null;

  return <>Not Found</>;
}

export default NotFound;
