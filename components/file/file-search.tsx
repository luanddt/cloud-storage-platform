"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Models } from "node-appwrite";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FileThumbnail from "./file-thumbnail";
import DateTime from "../shared/date-time";
import { useDebounce } from "use-debounce";
import { getFiles } from "@/lib/actions/file.actions";

type FileDocument = Models.Document & {
  name: string;
  type: string;
  extension: string;
  url: string;
};

const FileSearch = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<FileDocument[]>([]);
  const [debouncedQuery] = useDebounce(query, 300);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setIsOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      };

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.rows);
      setIsOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document & {
    type: string;
  }) => {
    setIsOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`
    );
  };

  return (
    <div className="relative flex-1">
      <div className="px-4 py-2.5 shadow-drop-3 rounded-30 flex items-center gap-2">
        <Search />

        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-0 border-none focus-visible:ring-0 flex-1"
        />
      </div>

      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 bg-background p-4 shadow-drop-3 rounded-20 flex flex-col gap-3">
          {results.length > 0 ? (
            results.map((file: FileDocument) => (
              <li
                key={file.$id}
                className="cursor-pointer flex-between"
                onClick={() => handleClickItem(file)}
              >
                <div className="flex items-center gap-4">
                  <FileThumbnail
                    name={file.name}
                    type={file.type}
                    extension={file.extension}
                    size={36}
                    url={file.url}
                    className="size-9"
                    iconClassName="size-5"
                  />

                  <p className="subtitle-2 line-clamp-1 max-sm:w-20">
                    {file.name}
                  </p>
                </div>

                <DateTime
                  date={file.$createdAt}
                  className="caption text-muted-foreground max-sm:hidden"
                />
              </li>
            ))
          ) : (
            <p className="body-2 text-muted-foreground text-center">
              No files found
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default FileSearch;