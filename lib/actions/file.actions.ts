"use server";

import { createAdminClient } from "@/lib/appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      type: getFileType(bucketFile.name).type,
      bucketFileId: bucketFile.$id,
      accountId,
      owner: ownerId,
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      users: []
    };

    const newFile = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      ID.unique(),
      fileDocument
    ).catch(async (error) => {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);

      handleError("Failed to create file document", error);
    });

    revalidatePath(path);

    return parseStringify(newFile);
  } catch (error) {
    handleError("Failed to upload file", error);
  };
};