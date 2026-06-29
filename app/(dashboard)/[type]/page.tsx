import { Models } from "node-appwrite";
import { getFiles } from "@/lib/actions/file.actions";
import Sort from "@/components/sort";
import FileCard from "@/components/file-card";
import { getFileTypesParams } from "@/lib/utils";

const Home = async ({ params }: HomeProps) => {
  const { type } = await params;

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types });

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
            <p className="body-4 text-muted-foreground">
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
            users: string[];
          }) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </div>
      ) : (
        <p className="body-1 text-muted-foreground text-center">
          No files uploaded
        </p>
      )}
    </div>
  );
};

export default Home;