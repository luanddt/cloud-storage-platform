"use server";

import {
  ID,
  Query
} from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { avatar } from "@/constants";

const handleError = (message: string, error: unknown): never => {
  console.error(`[APPWRITE_ERROR] ${message}:`, error);

  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`);
  };

  throw new Error(message);
};

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userTableId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  try {
    const { account } = await createAdminClient();

    const token = await account.createEmailToken(ID.unique(), email);

    return token.userId;
  } catch (error) {
    handleError(`Failed to send OTP to ${email}`, error);
  };
};

export const createAccount = async ({
  fullName,
  email
}: CreateAccountProps) => {
  try {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({ email });

    if (!accountId) throw new Error("Failed to generate OTP");

    if (!existingUser) {
      const { databases } = await createAdminClient();

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userTableId,
        ID.unique(),
        {
          fullName,
          email,
          avatar: avatar,
          accountId
        }
      );
    };

    return parseStringify({ accountId });
  } catch (error) {
    handleError(`Failed to create account for ${email}`, error);
  };
};