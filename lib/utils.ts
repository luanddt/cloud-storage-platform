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
      return "/assets/icons/file-minus.svg";

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
          return "/assets/icons/file-minus.svg";

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

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " " + "B";
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " " + "KB";
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " " + "MB";
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " " + "GB";
  };
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const time = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${time}, ${day} ${month} ${year}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  };
};

export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-light.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-light.svg",
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: "/assets/icons/file-video-light.svg",
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-light.svg",
      url: "/others",
    },
  ];
};

export const calculatePercentage = (sizeInBytes: number) => {
  const totalSizeInBytes = 2 * 1024 * 1024 * 1024;
  const percentage = (sizeInBytes / totalSizeInBytes) * 100;
  return Number(percentage.toFixed(2));
};