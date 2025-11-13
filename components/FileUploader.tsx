"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Thumbnail from "@/components/Thumbnail";
import { toast } from "sonner";
import { MAX_FILE_SIZE } from "@/constants";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

const FileUploader = ({ ownerId, accountId, className }: FileUploaderProps) => {
  const path = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast.error(`File ${file.name} is too large. Maximum allowed size is 50 MB.`);
      };

      return uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
        if (uploadedFile) {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
        };
      });
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
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />

      <Button
        type="button"
        className={cn("max-sm:w-full px-10 py-3.5", className)}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="Upload"
          width={24}
          height={24}
        />

        <h5 className="h5">
          Upload
        </h5>
      </Button>

      {files.length > 0 && (
        <div className="bg-background w-full sm:max-w-[480px] max-w-[calc(100%-80px)] p-7 shadow-drop-3 rounded-[20px] fixed bottom-10 right-10 z-50 flex flex-col gap-3">
          <h4 className="h4">
            Uploading
          </h4>

          <Separator />

          <ul className="flex flex-col gap-3">
            {files.map((file, index) => {
              const { type, extension } = getFileType(file.name);

              return (
                <li
                  key={`${file.name}-${index}`}
                  className="p-3 shadow-drop-3 rounded-[12px] flex-between"
                >
                  <div className="flex items-center gap-3">
                    <Thumbnail
                      name={file.name}
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                    />

                    <div className="flex flex-col gap-2">
                      <p className="sm:max-w-[300px] max-w-[100px] sub-2 line-clamp-1">
                        {file.name}
                      </p>

                      <Image
                        src="/assets/images/file-loader.gif"
                        alt="Loader"
                        width={80}
                        height={4}
                      />
                    </div>
                  </div>

                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    onClick={(e) => handleRemoveFile(e, file.name)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;