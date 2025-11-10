export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  userTableId: process.env.NEXT_PUBLIC_APPWRITE_USER_TABLE_ID || "",
  fileTableId: process.env.NEXT_PUBLIC_APPWRITE_FILE_TABLE_ID || "",
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
  apiKey: process.env.APPWRITE_API_KEY || ""
}