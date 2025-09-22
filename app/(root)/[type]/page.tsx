import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";

  const files = await getFiles();

  return (
    <div className="">
      <section className="">
        <h1 className="h1">
          {type}
        </h1>

        <div className="">
          <p className="">
            Total: <span className="">0 MB</span>
          </p>

          <div className="">
            <p className="">
              Sort by:
            </p>

            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;