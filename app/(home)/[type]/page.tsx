import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";

const Home = async ({ params }: HomeProps) => {
  const type = ((await params)?.type as string) || "";

  const files = await getFiles();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="h1 capitalize">
          {type}
        </h1>

        <div className="flex-between max-sm:flex-col max-sm:items-start max-sm:gap-5">
          <div className="flex items-center gap-1">
            <p className="body-1">
              Total:
            </p>

            <h5 className="h5">
              0 MB
            </h5>
          </div>

          <div className="flex items-center gap-1">
            <p className="font-medium text-[14px] leading-5 text-[#A3B2C7] max-sm:hidden">
              Sort by:
            </p>

            <Sort />
          </div>
        </div>
      </div>

      {files.total > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {files.documents.map((file: ModelsDocument) => (
            <Card key={file.$id} file={file} />
          ))}
        </div>
      ) : (
        <p className="body-1 text-[#A3B2C7] text-center">
          No files uploaded
        </p>
      )}
    </div>
  );
};

export default Home;