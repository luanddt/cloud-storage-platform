import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

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

interface FileShareProps {
  file: Models.Document & {
    name: string;
    type: string;
    extension: string;
    url: string;
    users: string[];
  };
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
};

export const FileShare = ({
  file,
  onInputChange,
  onRemove
}: FileShareProps) => {
  return (
    <div className="flex flex-col gap-7">
      <ImageThumbnail file={file} />

      <div className="flex flex-col gap-2">
        <p className="subtitle-2">
          Share file with other users:
        </p>

        <Input
          type="email"
          placeholder="Enter Email Address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex-between">
          <p className="subtitle-2">
            Share with users
          </p>

          <p className="subtitle-2 text-[#A3B2C7]">
            {file.users.length} users
          </p>
        </div>

        <ul className="flex flex-col gap-1">
          {file.users.map((email) => (
            <li
              key={email}
              className="flex-between"
            >
              <p className="subtitle-2">
                {email}
              </p>

              <Button
                type="button"
                className="bg-transparent hover:bg-transparent"
                onClick={() => onRemove(email)}
              >
                <Image
                  src="/assets/icons/remove.svg"
                  alt="Remove"
                  width={24}
                  height={24}
                />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};