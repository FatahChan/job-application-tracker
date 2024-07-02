import { Account, Client, Databases, Models } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

if (!PROJECT_ID) {
  throw new Error("VITE_APPWRITE_PROJECT_ID is not set");
}
if (!DATABASE_ID) {
  throw new Error("VITE_APPWRITE_DATABASE_ID is not set");
}
if (!COLLECTION_ID) {
  throw new Error("VITE_APPWRITE_COLLECTION_ID is not set");
}

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export type Document<T> = T & Models.Document;
export default client;
