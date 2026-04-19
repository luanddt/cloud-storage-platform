"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl, getFileType } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { toast } from "sonner";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

const FileUploader = ({ accountId, ownerId, onClose }: FileUploaderProps) => {
  const path = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast.error(`File "${file.name}" is too large. Max size is 50MB.`);
      };

      return uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
        if (uploadedFile) {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
        };
      });
    });

    await Promise.all(uploadPromises);

    onClose?.();
  }, [ownerId, accountId, path, onClose]);

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
          className="w-full px-6 py-3.5"
        >
          <Image
            src="/assets/icons/upload.svg"
            alt="Upload"
            width={24}
            height={24}
          />

          <p className="button">
            Upload
          </p>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="bg-popover w-full sm:max-w-120 fixed sm:bottom-10 bottom-0 sm:right-10 max-sm:left-0 z-50 p-6 sm:rounded-20 rounded-t-20 flex flex-col gap-5">
          <h3 className="h3">
            In Progress
          </h3>

          <ul className="flex flex-col gap-4">
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);

              return (
                <li
                  key={file.name}
                  className="p-3 rounded-12 shadow-3 flex-between"
                >
                  <div className="flex items-center gap-3">
                    <Thumbnail
                      name={file.name}
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                      size={60}
                      className="size-15"
                      imageClassName="size-8"
                    />

                    <div className="sm:w-70 w-40 flex flex-col gap-1">
                      <p className="subtitle-2 line-clamp-1">
                        {file.name}
                      </p>

                      <Image
                        src="/assets/images/file-loader.gif"
                        alt="Loader"
                        width={80}
                        height={4}
                        className="h-1"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>

                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="cursor-pointer opacity-70 hover:opacity-100"
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