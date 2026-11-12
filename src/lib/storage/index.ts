import browser from "webextension-polyfill";
import type { JobApplicationType } from "@/schema/Application";

const STORAGE_KEY = "applications";

export type Document<T> = T & {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
};
export type ApplicationDocument = Document<JobApplicationType>;

export async function readApplications(): Promise<ApplicationDocument[]> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return (result[STORAGE_KEY] as ApplicationDocument[] | undefined) ?? [];
}

export async function writeApplications(applications: ApplicationDocument[]) {
  // Dates are stored as ISO strings; the schema coerces them back on read
  await browser.storage.local.set({
    [STORAGE_KEY]: JSON.parse(JSON.stringify(applications)),
  });
}
