"use server";

import { cookies } from "next/headers";
import { Account, Client, TablesDB } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value) throw new Error("Session not found");

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get tablesDB() {
      return new TablesDB(client);
    }
  };
};