import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="size-20"
          imageClassName="size-11"
        />

        <div className="flex flex-col justify-between items-end">
          <ActionDropdown file={file} />

          <p className="body-1">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="">
        <p>{file.name}</p>

        <FormattedDateTime date={file.$createdAt} className="" />

        <p className="">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;