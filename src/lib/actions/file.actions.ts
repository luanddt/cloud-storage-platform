"use server";

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

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

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileDocument = {
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      type: getFileType(bucketFile.name).type,
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      users: [],
      bucketFileId: bucketFile.$id,
      accountId,
      owner: ownerId
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.fileTableId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);

        handleError("Failed to create file document", error);
      });

    revalidatePath(path);

    return parseStringify(newFile);
  } catch (error) {
    handleError("Failed to upload file", error);
  };
};

const createQueries = (currentUser: Models.Document & { email: string }) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email])
    ])
  ];

  return queries;
};

export const getFiles = async () => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      queries
    );

    return parseStringify(files);
  } catch (error) {
    handleError("Failed to get files", error);
  };
};

export const renameFile = async ({
  fileId,
  name,
  extension,
  path
}: RenameFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;

    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      fileId,
      {
        name: newName
      }
    );

    revalidatePath(path);

    return parseStringify(updatedFile);
  } catch (error) {
    handleError("Failed to rename file", error);
  };
};

export const shareFile = async ({
  fileId,
  emails,
  path
}: ShareFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      fileId,
      {
        users: emails
      }
    );

    revalidatePath(path);

    return parseStringify(updatedFile);
  } catch (error) {
    handleError("Failed to share file", error);
  };
};

export const deleteFile = async ({
  fileId,
  bucketFileId,
  path
}: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      fileId
    );

    if (deletedFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    }

    revalidatePath(path);

    return parseStringify({ status: "success" });
  } catch (error) {
    handleError("Failed to delete file", error);
  };
};