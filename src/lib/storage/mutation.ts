import { readApplications, writeApplications } from ".";
import type { ApplicationDocument } from ".";
import { formSchema, type JobApplicationType } from "@/schema/Application";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./queries";
import { toast } from "sonner";
import { z } from "zod";

async function createApplication(values: JobApplicationType) {
  const now = new Date().toISOString();
  const applications = await readApplications();
  applications.push({
    ...values,
    $id: crypto.randomUUID(),
    $createdAt: now,
    $updatedAt: now,
  });
  await writeApplications(applications);
}
async function deleteApplication(id: string) {
  const applications = await readApplications();
  await writeApplications(applications.filter((a) => a.$id !== id));
}
async function updateApplication({
  id,
  values,
}: {
  id: string;
  values: JobApplicationType;
}) {
  const applications = await readApplications();
  const index = applications.findIndex((a) => a.$id === id);
  if (index === -1) throw new Error("Application not found");
  applications[index] = {
    ...applications[index],
    ...values,
    $updatedAt: new Date().toISOString(),
  };
  await writeApplications(applications);
}

const importSchema = z.array(
  formSchema.extend({
    $id: z.string().optional(),
    $createdAt: z.string().optional(),
    $updatedAt: z.string().optional(),
  }),
);

/** Merges a JSON backup into storage; entries with an existing $id replace it. */
async function importApplications(json: string) {
  const parsed = importSchema.parse(JSON.parse(json));
  const byId = new Map(
    (await readApplications()).map((a) => [a.$id, a] as const),
  );
  const now = new Date().toISOString();
  for (const entry of parsed) {
    const doc: ApplicationDocument = {
      ...entry,
      $id: entry.$id ?? crypto.randomUUID(),
      $createdAt: entry.$createdAt ?? now,
      $updatedAt: entry.$updatedAt ?? now,
    };
    byId.set(doc.$id, doc);
  }
  await writeApplications([...byId.values()]);
  return parsed.length;
}

export async function exportApplications() {
  const json = JSON.stringify(await readApplications(), null, 2);
  const url = URL.createObjectURL(
    new Blob([json], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `job-applications-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
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

export function useImportApplications() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: importApplications,
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success(`Imported ${count} applications`);
    },
    onError: (error) => {
      toast.error(`Import failed: ${error.message}`);
    },
  });
}
