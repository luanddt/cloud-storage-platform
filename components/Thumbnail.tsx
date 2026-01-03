import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

const Thumbnail = ({
  name,
  type,
  extension,
  url = "",
  className,
  iconClassName
}: ThumbnailProps) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn("bg-primary/10 rounded-full flex-center overflow-hidden", className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt={name}
        width={32}
        height={32}
        className={cn(isImage ? "size-full object-cover object-center" : iconClassName)}
      />
    </figure>
  );
};

export default Thumbnail;