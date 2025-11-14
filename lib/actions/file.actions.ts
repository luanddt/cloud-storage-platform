"use server";

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/actions/user.actions";

const handleError = (message: string, error: unknown) => {
  console.log(message, error);

  throw error;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path
}: UploadFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id
    };

    const newFile = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      ID.unique(),
      fileDocument
    ).catch(async (error: unknown) => {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);

      handleError("Failed to save file metadata to database", error);
    });

    revalidatePath(path);

    return parseStringify(newFile);
  } catch (error) {
    handleError("Failed to upload file. Please try again.", error);
  };
};

const createQueries = (currentUser: ModelsDocument) => {
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

    if (!currentUser) throw new Error("User not found.");

    const queries = createQueries(currentUser);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      queries
    );

    return parseStringify(files);
  } catch (error) {
    handleError("Failed to fetch files. Please try again.", error);
  };
};