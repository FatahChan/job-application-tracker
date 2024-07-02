import { JobApplicationTrackerForm } from "@/components/JobApplicationTrackerForm";
import { useUpdateApplication } from "@/lib/appwrite/mutation";
import { useGetApplication } from "@/lib/appwrite/queries";
import { JobApplicationType } from "@/schema/Application";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createLazyFileRoute(
  "/(protected)/_layout/application/$id",
)({
  component: () => <Page />,
});
function Page() {
  const { id } = Route.useParams();
  const { data } = useGetApplication(id);
  const mutation = useUpdateApplication();
  const handleSubmit = useCallback(
    async (values: JobApplicationType) => {
      mutation.mutate({ id, values });
    },
    [id, mutation],
  );

  return (
    <JobApplicationTrackerForm defaultValues={data} onSubmit={handleSubmit} />
  );
}
