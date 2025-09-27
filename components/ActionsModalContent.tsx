import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className="">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />

      <div className="flex flex-col gap-1">
        <p className="subtitle-2">{file.name}</p>

        <FormattedDateTime date={file.$createdAt} className="caption" />
      </div>
    </div>
  )
};

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex">
      <p className="">{label}</p>
      <p className="">{value}</p>
    </div>
  )
}

const ActionsModalContent = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={file.size} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={file.$updatedAt} />
      </div>
    </>
  );
};

export default ActionsModalContent;

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
};

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="">
        <p className="">
          Share file with other address
        </p>

        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className=""
        />

        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2">Shared with</p>
            <p className="subtitle-2">{file.users.length} users</p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li key={email} className="flex justify-between items-center gap-2">
                <p className="subtitle-2">{email}</p>

                <Button onClick={() => onRemove(email)}>
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};