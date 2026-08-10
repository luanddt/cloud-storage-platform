"use server";

import { ID, Query } from "node-appwrite";
import { CreateAccountProps } from "@/types";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { avatarPlaceholderUrl } from "@/constants";
import { parseStringify } from "@/lib/utils";

const handleError = (message: string, error: unknown): never => {
  console.error(`[Error] ${message}`, error);

  if (error instanceof Error) {
    throw new Error(message, { cause: error });
  };

  throw new Error(message);
};

const getUserByEmail = async (email: string) => {
  const { tablesDB } = await createAdminClient();

  const result = await tablesDB.listRows(
    appwriteConfig.databaseId,
    appwriteConfig.usersTableId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.rows[0] : null;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError("Failed to send email OTP", error);
  };
};

export const createAccount = async ({ fullName, email }: CreateAccountProps) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });

  if (!accountId) throw new Error("Failed to send an OTP");

  if (!existingUser) {
    const { tablesDB } = await createAdminClient();

    await tablesDB.createRow(
      appwriteConfig.databaseId,
      appwriteConfig.usersTableId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId
      }
    );
  };

  return parseStringify({ accountId });
};

export const login = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOTP({ email });

      return parseStringify({ accountId: existingUser.accountId });
    };

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError("Failed to login", error);
  };
};