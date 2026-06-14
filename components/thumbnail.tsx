import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

const Thumbnail = ({
  name,
  type,
  extension,
  size,
  url = "",
  className,
  iconClassName
}: ThumbnailProps) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("bg-primary/10 rounded-full flex-center", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt={name}
        width={size}
        height={size}
        className={cn(isImage ? "size-full object-cover object-center rounded-full" : iconClassName)}
      />
    </figure>
  );
};

export default Thumbnail;