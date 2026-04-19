import FileCard from "@/components/FileCard";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";

const Home = async ({ params }: HomeProps) => {
  const type = ((await params)?.type as string) || "";

  const files = await getFiles();

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-2.5">
        <h1 className="h1 capitalize">
          {type}
        </h1>

        <div className="flex-between">
          <div className="flex items-center gap-1">
            <p className="body-1">
              Total:
            </p>

            <h5 className="h5">
              0MB
            </h5>
          </div>

          <div className="flex items-center gap-2.5">
            <p className="font-medium text-[14px] leading-5 text-[#A3B2C7]">
              Sort by:
            </p>

            <Sort />
          </div>
        </div>
      </div>

      {files.total > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {files.documents.map((file: Models.Document & {
            name: string;
            url: string;
            type: string;
            extension: string;
            size: number;
            bucketFileId: string;
          }) => (
            <FileCard
              key={file.$id}
              file={file}
            />
          ))}
        </div>
      ) : (
        <p className="body-1 text-center text-[#A3B2C7]">
          No files found
        </p>
      )}
    </div>
  );
};

export default Home;