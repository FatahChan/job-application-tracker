import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to the root if the user is on the index page
    if (window.location.pathname === "/index.html") navigate({ to: "/" });
  }, [navigate]);
  if (window.location.pathname === "/index.html") return null;

  return <>Not Found</>;
}

export default NotFound;
