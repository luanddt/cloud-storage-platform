import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import ActionDropdown from "@/components/ActionDropdown";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";

const FileCard = ({ file }: {
  file: Models.Document & {
    name: string;
    url: string;
    type: string;
    extension: string;
    size: number;
    users: string[];
    bucketFileId: string;
  };
}) => {
  return (
    <div className="bg-popover p-4.5 rounded-18 flex flex-col gap-5.5">
      <div className="flex justify-between">
        <Link
          href={file.url}
          target="_blank"
        >
          <Thumbnail
            name={file.name}
            type={file.type}
            extension={file.extension}
            url={file.url}
            size={82}
            className="size-20.5"
            imageClassName="size-10.5"
          />
        </Link>

        <div className="flex flex-col justify-between items-end">
          <ActionDropdown file={file} />

          <p className="body-1">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Link
          href={file.url}
          target="_blank"
          className="subtitle-2 hover:text-primary hover:underline line-clamp-1"
        >
          {file.name}
        </Link>

        <FormattedDateTime
          date={file.$createdAt}
          className="body-2"
        />
      </div>
    </div>
  );
};

export default FileCard;