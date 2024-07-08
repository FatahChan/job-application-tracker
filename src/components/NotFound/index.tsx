import { checkIfUserIsLoggedIn } from "@/lib/appwrite/util";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

function NotFound() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  useEffect(() => {
    console.log(routerState.location.pathname);
    // Redirect to the root if the user is on the index page
    (async () => {
      if (routerState.location.pathname === "/index.html") {
        try {
          await checkIfUserIsLoggedIn();
        } catch (e) {
          navigate({ to: "/login" });
          return;
        }
        navigate({ to: "/" });
      }
    })();
  }, [navigate, routerState.location.pathname]);

  if (routerState.location.pathname === "/index.html" || routerState.isLoading)
    return null;

  return <>Not Found</>;
}

export default NotFound;
