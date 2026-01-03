"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { convertFileToUrl, getFileType } from "@/lib/utils";
import { MAX_FILE_SIZE } from "@/constants";
import { uploadFile } from "@/lib/actions/file.actions";

const FileUploader = ({ ownerId, accountId }: FileUploaderProps) => {
  const path = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast.error(`File ${file.name} is too large. Maximum allowed size is 50 MB.`);
      };

      return (
        uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
          if (uploadedFile) {
            setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
          };
        })
      );
    });

    await Promise.all(uploadPromises);
  }, [ownerId, accountId, path]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();

    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <Button
          type="button"
          className="w-full px-10 py-3.5"
        >
          <Image
            src="/assets/icons/upload.svg"
            alt="Upload"
            width={24}
            height={24}
          />

          <p className="button text-primary-foreground">
            Upload
          </p>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="fixed bottom-10 right-10 z-50 bg-background p-6 w-full sm:max-w-120 max-w-[calc(100vw-80px)] rounded-4xl shadow-drop-3 flex flex-col gap-4.5">
          <h3 className="h3">
            In Progress
          </h3>

          <ul className="flex flex-col gap-5">
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);

              return (
                <li
                  key={file.name}
                  className="p-4 shadow-drop-3 rounded-2xl flex-between"
                >
                  <div className="flex items-center gap-4">
                    <Thumbnail
                      name={file.name}
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                      className="size-15"
                      iconClassName="size-8"
                    />

                    <div className="flex flex-col gap-1">
                      <p className="sub-2">
                        {file.name}
                      </p>

                      <Image
                        src="/assets/images/file-loader.gif"
                        alt="Loader"
                        width={80}
                        height={4}
                        className="h-1"
                      />
                    </div>
                  </div>

                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={(e) => handleRemoveFile(e, file.name)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default FileUploader;