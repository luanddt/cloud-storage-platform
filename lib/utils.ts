import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FileType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = ["doc", "docx", "pdf", "txt", "rtf", "odt", "pages", "md"];
  const imageExtensions = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg", "ico"];
  const videoExtensions = ["mp4", "webm", "mov", "avi", "mkv", "wmv", "flv", "m4v"];
  const audioExtensions = ["mp3", "wav", "ogg", "m4a", "aac", "flac", "wma"];

  if (documentExtensions.includes(extension)) return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string
) => {
  switch (extension) {
    case "doc":
    case "docx":
    case "pdf":
    case "txt":
    case "rtf":
    case "odt":
    case "pages":
    case "md":
      return "/assets/icons/documents.svg";

    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "webp":
    case "bmp":
    case "svg":
    case "ico":
      return "/assets/icons/images.svg";

    case "mp4":
    case "webm":
    case "mov":
    case "avi":
    case "mkv":
    case "wmv":
    case "flv":
    case "m4v":
      return "/assets/icons/media.svg";

    case "mp3":
    case "wav":
    case "ogg":
    case "m4a":
    case "aac":
    case "flac":
    case "wma":
      return "/assets/icons/media.svg";

    default:
      switch (type) {
        case "document":
          return "/assets/icons/documents.svg";

        case "image":
          return "/assets/icons/images.svg";

        case "video":
          return "/assets/icons/media.svg";

        case "audio":
          return "/assets/icons/media.svg";

        default:
          return "/assets/icons/others.svg";
      };
  };
};

export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};