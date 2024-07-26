import { JobApplicationTrackerForm } from "@/components/JobApplicationTrackerForm";
import { useCreateApplication } from "@/lib/appwrite/mutation";
import { JobApplicationType } from "@/schema/Application";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createLazyFileRoute("/(protected)/_layout/form")({
  component: () => <NewApplication />,
});

function NewApplication() {
  const mutation = useCreateApplication();
  const handleSubmit = useCallback(
    async (values: JobApplicationType) => {
      mutation.mutate(values);
    },
    [mutation],
  );

  return <JobApplicationTrackerForm onSubmit={handleSubmit} />;
}
