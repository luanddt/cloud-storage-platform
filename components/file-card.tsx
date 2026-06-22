import { Models } from "node-appwrite";
import { convertFileSize } from "@/lib/utils";
import Thumbnail from "@/components/thumbnail";
import ActionDropdown from "@/components/action-dropdown";
import FormattedDateTime from "@/components/formatted-date-time";

const FileCard = ({ file }: {
  file: Models.Document & {
    name: string;
    url: string;
    type: string;
    extension: string;
    size: number;
    bucketFileId: string;
  };
}) => {
  return (
    <div className="bg-background p-4.5 rounded-18 flex flex-col gap-5.5">
      <div className="flex justify-between">
        <Thumbnail
          name={file.name}
          type={file.type}
          extension={file.extension}
          url={file.url}
          size={82}
          className="size-20.5"
          iconClassName="size-10.5"
        />

        <div className="flex flex-col justify-between items-end">
          <ActionDropdown file={file} />

          <p className="body-1">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="subtitle-2 line-clamp-1">
          {file.name}
        </p>

        <FormattedDateTime
          date={file.$createdAt}
          className="body-2"
        />
      </div>
    </div>
  );
};

export default FileCard;