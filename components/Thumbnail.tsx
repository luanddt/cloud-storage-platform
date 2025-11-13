import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";

const Thumbnail = ({ name, type, extension, url = "", className, imageClassName }: ThumbnailProps) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("bg-primary/10 size-[52px] rounded-full flex-center", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt={name}
        width={32}
        height={32}
        className={cn(
          imageClassName,
          isImage && "size-full rounded-full object-cover"
        )}
      />
    </figure>
  );
};

export default Thumbnail;