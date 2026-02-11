"use server";

import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import {
  constructFileUrl,
  getFileType,
  parseStringify
} from "@/lib/utils";

const handleError = (
  message: string,
  error: unknown
) => {
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
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      type: getFileType(bucketFile.name).type,
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      bucketFileId: bucketFile.$id,
      users: []
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

        handleError("Failed to create file document.", error);
      });

    revalidatePath(path);

    return parseStringify(newFile);
  } catch (error) {
    handleError("Failed to upload file.", error);
  };
};