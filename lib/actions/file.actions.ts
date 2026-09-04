"use server";

import { UploadFileProps } from "@/types";
import { createAdminClient } from "@/lib/appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";

const handleError = (message: string, error: unknown): never => {
  console.error(`[Error] ${message}`, error);

  if (error instanceof Error) {
    throw new Error(message, { cause: error });
  };

  throw new Error(message);
};

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
  const { tablesDB, storage } = await createAdminClient();

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
      owner: ownerId,
      accountId,
      bucketFileId: bucketFile.$id
    };

    const newFile = await tablesDB.createRow(
      appwriteConfig.databaseId,
      appwriteConfig.filesTableId,
      ID.unique(),
      fileDocument
    ).catch(async (error: unknown) => {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);

      handleError("Failed to create file document", error);
    });

    revalidatePath(path);

    return parseStringify(newFile);
  } catch (error) {
    handleError("Failed to upload file", error);
  };
};