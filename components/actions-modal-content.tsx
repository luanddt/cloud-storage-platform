import { Models } from "node-appwrite";
import { CircleX } from "lucide-react";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Thumbnail from "@/components/thumbnail";
import FormattedDateTime from "@/components/formatted-date-time";

const ImageThumbnail = ({ file }: {
  file: Models.Document & {
    name: string;
    url: string;
    type: string;
    extension: string;
  };
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

export const FileDetails = ({ file }: {
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

interface FileShareProps {
  file: Models.Document & {
    name: string;
    url: string;
    type: string;
    extension: string;
    users: string[];
  };
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
};

export const FileShare = ({ file, onChange, onRemove }: FileShareProps) => {
  return (
    <div className="flex flex-col gap-8">
      <ImageThumbnail file={file} />

      <div className="flex flex-col gap-2.5">
        <p className="subtitle-2">
          Share file with other users:
        </p>

        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onChange(e.target.value.trim().split(","))}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex-between">
          <p className="subtitle-2">Share with users</p>
          <p className="subtitle-2 text-muted-foreground">{file.users.length} users</p>
        </div>

        {file.users.length > 0 && (
          <ul className="flex flex-col gap-1">
            {file.users.map((email: string) => (
              <li key={email} className="flex-between">
                <p className="subtitle-2">
                  {email}
                </p>

                <CircleX
                  onClick={() => onRemove(email)}
                  className="cursor-pointer hover:opacity-70"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};