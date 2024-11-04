import type { JobApplicationType } from "@/schema/Application";
import { formSchema } from "@/schema/Application";
import { DATABASE_ID, databases, COLLECTION_ID, type Document } from ".";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";

export const QUERY_KEY = "jobApplications";

async function getApplications(): Promise<Document<JobApplicationType>[]> {
  return (
    await databases.listDocuments<Document<JobApplicationType>>(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(1000)], // TODO: pagination
    )
  ).documents;
}

export async function getApplication(id: string) {
  return databases.getDocument<Document<JobApplicationType>>(
    DATABASE_ID,
    COLLECTION_ID,
    id,
  );
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
