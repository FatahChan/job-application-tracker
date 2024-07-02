import { ApplicationTable } from "@/components/ApplicationTable";
import { useGetApplications } from "@/lib/appwrite/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/_layout/")({
  component: () => <DashboardPage />,
});

function DashboardPage() {
  const { data, isLoading } = useGetApplications();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ApplicationTable data={data ?? []} />
    </div>
  );
}
