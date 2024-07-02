import { JobApplicationTrackerForm } from '@/components/JobApplicationTrackerForm';
import { useCreateApplication } from '@/lib/appwrite/mutation';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(protected)/_layout/form')({
  component: () => <NewApplication />,
});

function NewApplication() {
  const mutation = useCreateApplication();
  return (
    <JobApplicationTrackerForm
      onSubmit={async (values) => {
        mutation.mutate(values);
      }}
    />
  );
}
