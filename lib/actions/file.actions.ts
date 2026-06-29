"use server";

import { revalidatePath } from "next/cache";
import { ID, Models, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";

const handleError = (message: string, error: unknown) => {
  console.log(message, error);

  throw error;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path
}: {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}) => {
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
      accountId,
      owner: ownerId,
      bucketFileId: bucketFile.$id
    };

    const newFile = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
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

const createQueries = (
  currentUser: Models.Document & { email: string },
  types: string[]
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email])
    ])
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));

  return queries;
};

export const getFiles = async ({
  types = []
}: {
  types: FileType[];
}) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User not found");

    const queries = createQueries(currentUser, types);

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
}: {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}) => {
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
  path,
}: {
  fileId: string;
  emails: string[];
  path: string;
}) => {
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
}: {
  fileId: string;
  bucketFileId: string;
  path: string;
}) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFile = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      fileId
    );

    if (deletedFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    };

    revalidatePath(path);

    return parseStringify({ status: "success" });
  } catch (error) {
    handleError("Failed to delete file", error);
  };
};