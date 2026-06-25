import { Models } from "node-appwrite";
import Thumbnail from "./thumbnail";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import FormattedDateTime from "./formatted-date-time";

const ImageThumbnail = ({ file }: {
  file: Models.Document & {
    name: string;
    url: string;
    type: string;
    extension: string;
  }
}) => {
  return (
    <div className="p-3 border border-input rounded-12 flex items-center gap-4">
      <Thumbnail
        name={file.name}
        type={file.type}
        extension={file.extension}
        url={file.url}
        size={52}
        className="size-13"
        iconClassName="size-7"
      />

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="subtitle-2 line-clamp-1">
          {file.name}
        </p>

        <FormattedDateTime
          date={file.$createdAt}
          className="caption text-muted-foreground"
        />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex">
      <p className="w-1/5 body-2">{label}</p>
      <p className="subtitle-2">{value}</p>
    </div>
  );
};

const FileDetails = ({ file }: {
  file: Models.Document & {
    name: string;
    url: string;
    type: string;
    extension: string;
    size: number;
  };
}) => {
  return (
    <div className="flex flex-col gap-4">
      <ImageThumbnail file={file} />

      <div className="flex flex-col gap-5">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </div>
  );
};

export default FileDetails;