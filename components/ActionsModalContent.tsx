import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";

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