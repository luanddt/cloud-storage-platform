import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";
import { FileThumbnailProps } from "@/types";

const FileThumbnail = ({ name, type, extension, size, url = "", className, iconClassName }: FileThumbnailProps) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("bg-primary/10 rounded-full flex-center", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt={name}
        width={size}
        height={size}
        className={isImage ? "size-full object-cover object-center rounded-full" : iconClassName}
      />
    </figure>
  );
};

export default FileThumbnail;