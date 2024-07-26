import { ID, Permission, Role } from "appwrite";
import { account, DATABASE_ID, databases, COLLECTION_ID } from ".";
import type { JobApplicationType } from "@/schema/Application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queries";
import { toast } from "sonner";

async function createApplication(values: JobApplicationType) {
  const { $id: userId } = await account.get();
  if (!userId) throw new Error("User ID not found");
  await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    values,
    [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ],
  );
}
async function deleteApplication(id: string) {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
}
async function updateApplication({
  id,
  values,
}: {
  id: string;
  values: JobApplicationType;
}) {
  await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, values);
}

export function useCreateApplication(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Application created");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Application deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export function useUpdateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success("Application updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
