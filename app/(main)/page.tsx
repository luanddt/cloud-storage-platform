import FileActions from "@/components/file/file-actions";
import FileChart from "@/components/file/file-chart";
import FileThumbnail from "@/components/file/file-thumbnail";
import DateTime from "@/components/shared/date-time";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

export const metadata: Metadata = {
  title: "Dashboard - Storage",
  description: "Cloud Storage Platform"
};

type FileDocument = Models.Document & {
  name: string;
  type: string;
  extension: string;
  url: string;
  bucketFileId: string;
  size: number;
  users: string[];
};

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed()
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="h-full grid md:grid-cols-2 grid-cols-1 gap-6">
      <div className="flex flex-col gap-6">
        <FileChart used={totalSpace.used} />

        <ul className="grid xl:grid-cols-2 grid-cols-1 gap-6">
          {usageSummary.map((summary) => (
            <li key={summary.title}>
              <Link
                href={summary.url}
                className="relative bg-background p-5 rounded-20 hover:scale-105 transition-all flex flex-col items-center gap-4"
              >
                <Image
                  src={summary.icon}
                  alt={summary.title}
                  width={100}
                  height={100}
                  className="absolute -top-6.25 -left-3 z-10 w-47.5"
                />

                <h4 className="h4 w-full text-right z-10">
                  {convertFileSize(summary.size) || 0}
                </h4>

                <h5 className="h5 z-10">{summary.title}</h5>

                <Separator />

                <p className="body-1 text-muted-foreground">
                  Last update
                </p>

                <DateTime
                  date={summary.latestDate}
                  className="body-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-background p-6 rounded-20 flex flex-col gap-7">
        <h2 className="h2">
          Recent files uploaded
        </h2>

        {files.rows.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {files.rows.map((file: FileDocument) => (
              <li key={file.$id} className="flex-between">
                <div className="flex items-center gap-3">
                  <Link
                    href={file.url}
                    target="_blank"
                  >
                    <FileThumbnail
                      name={file.name}
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      size={50}
                      className="size-12.5"
                      iconClassName="size-5"
                    />
                  </Link>

                  <div className="w-90 flex flex-col gap-1">
                    <Link
                      href={file.url}
                      target="_blank"
                      className="subtitle-2 hover:text-primary hover:underline line-clamp-1"
                    >
                      {file.name}
                    </Link>

                    <DateTime
                      date={file.$createdAt}
                      className="body-2 text-muted-foreground"
                    />
                  </div>
                </div>

                <FileActions file={file} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="body-1 text-muted-foreground text-center">
            No files found
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;