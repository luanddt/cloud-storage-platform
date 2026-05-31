"use server";

import { ID, Query } from "node-appwrite";
import { avatarPlaceholderUrl } from "@/constants";
import { parseStringify } from "@/lib/utils";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

const handleError = (message: string, error: unknown) => {
  console.log(message, error);

  throw error;
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
  const { account } = await createAdminClient();

  try {
    const token = await account.createEmailToken(ID.unique(), email);

    return token.userId;
  } catch (error) {
    handleError("Failed to send email OTP", error);
  };
};

export const createAccount = async ({
  fullName,
  email
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });

  if (!accountId) throw new Error("Failed to send an OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userTableId,
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

export const loginUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOTP({ email });

      return parseStringify({ accountId: existingUser.accountId });
    };

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError("Failed to login user", error);
  };
};