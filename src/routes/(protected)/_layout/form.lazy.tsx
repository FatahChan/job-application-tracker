import {
  JobApplicationTrackerForm,
  type JobApplicationTrackerFormRefHandlers,
} from "@/components/JobApplicationTrackerForm";
import RequestJobPostingContentButton from "@/components/RequestJobPostingContentButton";
import { useCreateApplication } from "@/lib/appwrite/mutation";
import { JobApplicationType } from "@/schema/Application";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createLazyFileRoute("/(protected)/_layout/form")({
  component: () => <NewApplication />,
});

function NewApplication() {
  const mutation = useCreateApplication();
  const [defaultValues, setDefaultValues] = useState<
    Partial<JobApplicationType>
  >({});
  const formRef = useRef<JobApplicationTrackerFormRefHandlers>(null);

  const handleSubmit = useCallback(
    async (values: JobApplicationType) => {
      mutation.mutate(values);
      formRef.current?.resetWithDefaultValues();
    },
    [mutation]
  );
  useEffect(() => {
    for (const key in defaultValues) {
      const k = key as keyof JobApplicationType;
      formRef.current?.setValue(k, defaultValues[k]);
    }
  }, [defaultValues]);

  return (
    <div className="relative">
      <RequestJobPostingContentButton
        className="top-0 right-0 absolute"
        onSuccess={setDefaultValues}
      />
      <JobApplicationTrackerForm
        ref={formRef}
        className="pt-8"
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
}
