import { Button } from "@/components/ui/button";
import {
  exportApplications,
  useImportApplications,
} from "@/lib/storage/mutation";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createRootRoute({
  component: () => <Root />,
});

function Root() {
  const importMutation = useImportApplications();
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <nav className="flex justify-between items-center">
        <div className="flex gap-4 p-2">
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
        <div className="flex gap-2 p-2">
          <Button variant={"outline"} size={"sm"} onClick={exportApplications}>
            Export
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            disabled={importMutation.isPending}
            onClick={() => fileInputRef.current?.click()}
          >
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) importMutation.mutate(await file.text());
            }}
          />
        </div>
      </nav>
      <hr />
      <div className="py-4">
        <Outlet />
      </div>
    </>
  );
}
