import { Models } from "node-appwrite";
import DateTime from "../shared/date-time";
import FileThumbnail from "./file-thumbnail";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";

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

const FileShare = ({ file, onInputChange, onRemove }: {
  file: Models.Document & {
    name: string;
    type: string;
    extension: string;
    url: string;
    users: string[];
  };
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="flex flex-col gap-2">
        <p className="subtitle-2">
          Share file with other users:
        </p>

        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex-between">
          <p className="subtitle-2">
            Share with users
          </p>

          <p className="subtitle-2 text-muted-foreground">
            {file.users.length} users
          </p>
        </div>

        {file.users.length > 0 && (
          <ul className="flex flex-col gap-1">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex-between"
              >
                <p className="subtitle-2">
                  {email}
                </p>

                <CircleX
                  onClick={() => onRemove(email)}
                  className="cursor-pointer hover:opacity-80"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FileShare;