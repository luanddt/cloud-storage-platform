import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";

const Card = ({ file }: { file: ModelsDocument }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="bg-background p-5 shadow-drop-3 rounded-[20px] flex flex-col gap-6"
    >
      <div className="flex justify-between">
        <Thumbnail
          name={file.name}
          type={file.type}
          extension={file.extension}
          url={file.url}
        />

        <div className="flex flex-col justify-between items-end">
          <ActionDropdown file={file} />

          <p className="body-1">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="sub-2 line-clamp-1">
          {file.name}
        </p>

        <FormattedDateTime date={file.$createdAt} />

        <p className="caption text-[#A3B2C7] line-clamp-1">
          By:{" "}

          {file.owner}
        </p>
      </div>
    </Link>
  );
};

export default Card;