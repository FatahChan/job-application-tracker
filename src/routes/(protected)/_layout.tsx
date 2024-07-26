import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwrite";
import {
  createRootRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    let user;
    try {
      user = await account.get();
    } catch (e) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
    if (!user?.$id) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Root />,
});

function Root() {
  const navigate = useNavigate();
  const handleLogout = useCallback(async () => {
    await account.deleteSession("current");
    navigate({ to: "/login" });
  }, [navigate]);
  return (
    <>
      <nav className="flex justify-between items-center">
        <div className="p-2 flex gap-4">
          <Link to="/" className="[&.active]:font-bold [&.active]:underline">
            Dashboard
          </Link>
          <Link
            to="/form"
            className="[&.active]:font-bold [&.active]:underline"
          >
            New Application
          </Link>
        </div>
        <div className="p-2 flex gap-4">
          <Button variant={"destructive"} size={"sm"} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
      <hr />
      <div className="py-4">
        <Outlet />
      </div>
    </>
  );
}
