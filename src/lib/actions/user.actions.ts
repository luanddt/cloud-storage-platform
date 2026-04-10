"use server";

import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { avatar } from "@/constants";

const handleError = (
  message: string,
  error?: unknown,
  options?: HandleErrorOptions
): never => {
  const code = options?.code || "APP_ERROR";

  console.error(`[${code}] ${message}`, error);

  let finalMessage = message;

  if (options?.showDetails && error instanceof Error) {
    finalMessage = `${message}: ${error.message}`;
  };

  const err = new Error(finalMessage) as Error & { code?: string };

  err.code = code;

  throw err;
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
}: CreateAccountProps) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });

  if (!accountId) throw new Error("Failed to send email OTP");

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
};

export const verifyEmailOTP = async ({
  accountId,
  password
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError("Failed to verify email OTP", error);
  };
};