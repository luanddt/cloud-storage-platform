import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";

interface ThumbnailProps {
  type: string;
  extension: string;
  url?: string;
  className?: string;
  imageClassName?: string;
};

const Thumbnail = ({ type, extension, url = "", className, imageClassName }: ThumbnailProps) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt=""
        width={100}
        height={100}
        className={cn("size-8 object-contain", imageClassName, isImage && "")}
      />
    </figure>
  );
};

export default Thumbnail;