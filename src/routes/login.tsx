import { account } from "@/lib/appwrite";
import {
  createFileRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";

const LoginForm = lazyRouteComponent(
  () => import("../components/LoginForm"),
  "LoginForm",
);

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ location }) => {
    try {
      const user = await account.get();
      if (user?.$id) {
        throw redirect({
          to: "/",
          search: { redirect: location.href },
        });
      }
    } catch (e: unknown) {
      console.error(e);
    }
  },
  component: () => <LoginPage />,
});

function LoginPage() {
  return (
    <div className="flex flex-col justify-center h-screen gap-40 max-w-96 m-auto">
      <h1 className="text-2xl font-extrabold text-center">Job Tracker</h1>
      <LoginForm />;
    </div>
  );
}
