import { Models } from "node-appwrite";
import FileThumbnail from "./file-thumbnail";
import DateTime from "../shared/date-time";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const ImageThumbnail = ({ file }: {
  file: Models.Document & {
    name: string;
    type: string;
    extension: string;
    url: string;
  }
}) => {
  return (
    <div className="p-3 border border-border rounded-12 flex items-center gap-4">
      <FileThumbnail
        name={file.name}
        type={file.type}
        extension={file.extension}
        url={file.url}
        size={52}
        className="size-13"
        iconClassName="size-8"
      />

      <div className="flex flex-1 min-w-0 flex-col gap-1">
        <p className="subtitle-2 line-clamp-1">
          {file.name}
        </p>

        <DateTime
          date={file.$createdAt}
          className="caption text-muted-foreground"
        />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className="flex">
      <p className="body-2 w-1/5">{label}</p>
      <p className="subtitle-2">{value}</p>
    </div>
  );
};

const FileDetails = ({ file }: {
  file: Models.Document & {
    name: string;
    type: string;
    extension: string;
    url: string;
    size: number;
  }
}) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="flex flex-col gap-4">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

export default FileDetails;