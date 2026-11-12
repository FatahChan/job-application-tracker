import { formSchema } from "@/schema/Application";
import { readApplications } from ".";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEY = "jobApplications";

async function getApplications() {
  const applications = await readApplications();
  return applications.sort((a, b) => b.$createdAt.localeCompare(a.$createdAt));
}

export async function getApplication(id: string) {
  const application = (await readApplications()).find((a) => a.$id === id);
  if (!application) throw new Error("Application not found");
  return application;
}

export function useGetApplications() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getApplications,
  });
}

export function useGetApplication(id: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getApplication(id),
    select: (data) => {
      const {
        data: validatedData,
        success,
        error,
      } = formSchema.safeParse(data);

      if (!success) {
        console.error(error);
        throw new Error("Invalid data");
      }
      return validatedData;
    },
  });
}
