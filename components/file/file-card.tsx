import { Models } from "node-appwrite";
import FileThumbnail from "./file-thumbnail";
import FileAction from "./file-action";
import { convertFileSize } from "@/lib/utils";
import DateTime from "../shared/date-time";

const FileCard = ({ file }: { file: Models.Document & { name: string, type: string, extension: string, url: string, size: number } }) => {
  return (
    <div className="bg-background p-4 rounded-20 flex flex-col gap-5">
      <div className="flex justify-between">
        <FileThumbnail
          name={file.name}
          type={file.type}
          extension={file.extension}
          url={file.url}
          size={40}
          className="size-20"
          iconClassName="size-10 invert dark:invert-0"
        />

        <div className="flex flex-col justify-between items-end">
          <FileAction />

          <p className="body-1">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="subtitle-2 line-clamp-1">
          {file.name}
        </p>

        <DateTime
          date={file.$createdAt}
          className="body-2 line-clamp-1"
        />
      </div>
    </div>
  );
};

export default FileCard;