declare type FileType = "document" | "image" | "video" | "audio" | "other";

declare interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
};

declare interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}