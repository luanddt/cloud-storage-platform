"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";

type ModelsDocument = Models.Document & {
  name: string;
  type: string;
  extension: string;
  url: string;
};

const Search = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<ModelsDocument[]>([]);

  const searchQuery = searchParams.get("query") || "";

  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setIsOpen(false);

        return;
      };

      const files = await getFiles({ types: [], searchText: debouncedQuery });

      setResults(files.documents);

      setIsOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery, path, router, searchQuery]);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document & { type: string }) => {
    setIsOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`
    );
  };

  return (
    <div className="relative">
      <div className="px-3.5 shadow-3 rounded-full flex items-center gap-2">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="size-6"
        />

        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-0 py-4 border-none focus-visible:ring-0"
        />
      </div>

      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 z-50 bg-background p-4 rounded-20 flex flex-col gap-3">
          {results.length > 0 ? (
            results.map((file) => (
              <li
                key={file.$id}
                className="flex-between"
                onClick={() => handleClickItem(file)}
              >
                <div className="flex items-center gap-4 cursor-pointer">
                  <Thumbnail
                    name={file.name}
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    size={36}
                    className="size-9"
                    imageClassName="size-6"
                  />

                  <p className="subtitle-2 line-clamp-1">
                    {file.name}
                  </p>
                </div>

                <FormattedDateTime
                  date={file.$createdAt}
                  className="caption"
                />
              </li>
            ))
          ) : (
            <p className="body-1 text-center text-[#A3B2C7]">
              No files found
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;