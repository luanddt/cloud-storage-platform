import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";

const ImageThumbnail = ({ file }: {
  file: Models.Document & {
    name: string;
    type: string;
    extension: string;
    url: string;
  };
}) => {
  return (
    <div className="p-3.5 border border-[#A3B2C7] rounded-12 flex items-center gap-4">
      <Thumbnail
        name={file.name}
        type={file.type}
        extension={file.extension}
        url={file.url}
        size={52}
        className="size-13"
        imageClassName="size-7"
      />

      <div className="flex flex-col gap-1 flex-1 min-w-0">
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

const DetailRow = ({
  title,
  value
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex">
      <p className="body-2 w-2/5">
        {title}
      </p>

      <p className="subtitle-2">
        {value}
      </p>
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
  };
}) => {
  return (
    <div className="flex flex-col gap-4">
      <ImageThumbnail file={file} />

      <div className="flex flex-col gap-4.5">
        <DetailRow title="Format:" value={file.extension} />
        <DetailRow title="Size:" value={convertFileSize(file.size)} />
        <DetailRow title="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </div>
  );
};

export default FileDetails;