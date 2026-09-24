import FileCard from "@/components/file/file-card";
import FileSort from "@/components/file/file-sort";
import { getFiles } from "@/lib/actions/file.actions";
import { FileType, HomeProps } from "@/types";
import { Models } from "node-appwrite";
import type { Metadata } from "next";
import { getFileTypesParams } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home - Storage",
  description: "Cloud Storage Platform"
};

const Home = async ({ params, searchParams }: HomeProps) => {
  const { type } = await params;

  const searchText = ((await searchParams)?.query as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const sort = ((await searchParams)?.sort as string) || "";

  const files = await getFiles({ types, searchText, sort });

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        <h1 className="h1 capitalize">
          {type}
        </h1>

        <div className="flex-between">
          <div className="flex items-center gap-1">
            <p className="body-1">Total:</p>

            <h5 className="h5">0 MB</h5>
          </div>

          <div className="flex items-center gap-1">
            <p className="body-2">Sort by:</p>

            <FileSort />
          </div>
        </div>
      </div>

      {files.total > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {files.rows.map((file: Models.Document & { name: string, type: string, extension: string, url: string, size: number, bucketFileId: string, users: string[] }) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </div>
      ) : (
        <p className="body-1 text-muted-foreground text-center">File not found</p>
      )}
    </div>
  );
};

export default Home;