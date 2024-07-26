import { checkIfUserIsLoggedIn } from "@/lib/appwrite/util";
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
    (async () => {
      if (isIndexPage) {
        try {
          await checkIfUserIsLoggedIn();
        } catch (e) {
          navigate({ to: "/login" });
          return;
        }
        navigate({ to: "/" });
      }
    })();
  }, [navigate, isIndexPage]);

  if (isIndexPage || routerState.isLoading) return null;

  return <>Not Found</>;
}

export default NotFound;
