import { Models } from "node-appwrite";
import FileThumbnail from "./file-thumbnail";
import FileActions from "./file-actions";
import { convertFileSize } from "@/lib/utils";
import DateTime from "../shared/date-time";
import Link from "next/link";

const FileCard = ({ file }: { file: Models.Document & { name: string, type: string, extension: string, url: string, size: number, bucketFileId: string } }) => {
  return (
    <div className="bg-background p-4 rounded-20 flex flex-col gap-5">
      <div className="flex justify-between">
        <Link href={file.url} target="_blank">
          <FileThumbnail
            name={file.name}
            type={file.type}
            extension={file.extension}
            url={file.url}
            size={40}
            className="size-20"
            iconClassName="size-10 invert dark:invert-0"
          />
        </Link>

        <div className="flex flex-col justify-between items-end">
          <FileActions file={file} />

          <p className="body-1">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={file.url}
          target="_blank"
          className="subtitle-2 hover:text-primary hover:underline line-clamp-1"
        >
          {file.name}
        </Link>

        <DateTime
          date={file.$createdAt}
          className="body-2 line-clamp-1"
        />
      </div>
    </div>
  );
};

export default FileCard;