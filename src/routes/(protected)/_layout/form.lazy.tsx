import {
  JobApplicationTrackerForm,
  type JobApplicationTrackerFormRefHandlers,
} from "@/components/JobApplicationTrackerForm";
import { useCreateApplication } from "@/lib/appwrite/mutation";
import { JobApplicationType } from "@/schema/Application";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback, useRef } from "react";

export const Route = createLazyFileRoute("/(protected)/_layout/form")({
  component: () => <NewApplication />,
});

function NewApplication() {
  const mutation = useCreateApplication();
  const formRef = useRef<JobApplicationTrackerFormRefHandlers>(null);

  const handleSubmit = useCallback(
    async (values: JobApplicationType) => {
      mutation.mutate(values);
      formRef.current?.resetWithDefaultValues();
    },
    [mutation]
  );

  return <JobApplicationTrackerForm ref={formRef} onSubmit={handleSubmit} />;
}
