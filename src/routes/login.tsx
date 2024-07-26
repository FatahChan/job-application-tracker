import { checkIfUserIsLoggedIn } from "@/lib/appwrite/util";
import {
  createFileRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";

const LoginForm = lazyRouteComponent(
  () => import("../components/LoginForm"),
  "LoginForm"
);

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const user = await checkIfUserIsLoggedIn();
    if (user?.$id) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <LoginPage />,
});

function LoginPage() {
  return (
    <div className="flex flex-col justify-center gap-40 m-auto max-w-96 h-screen">
      <h1 className="font-extrabold text-2xl text-center">Job Tracker</h1>
      <LoginForm />
    </div>
  );
}
