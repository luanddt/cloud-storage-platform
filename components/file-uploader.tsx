"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { CircleX } from "lucide-react";
import { toast } from "sonner";
import { convertFileToUrl, getFileType } from "@/lib/utils";
import { uploadFile } from "@/lib/actions/file.actions";
import { MAX_FILE_SIZE } from "@/constants";
import { Button } from "@/components/ui/button";
import Thumbnail from "@/components/thumbnail";

const FileUploader = ({ ownerId, accountId, onClose }: FileUploaderProps) => {
  const path = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    const uploadPromises = acceptedFiles.map(async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast.error(`"${file.name}" is too large. Maximum file size is 50MB.`);
      };

      return uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
        if (uploadedFile) {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
        };
      });
    });

    await Promise.all(uploadPromises);

    onClose?.();
  }, [ownerId, accountId, path]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();

    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <Button type="button" size="upload">
          <Image
            src="/assets/icons/upload.svg"
            alt="Upload"
            width={24}
            height={24}
          />

          <p>Upload</p>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="fixed sm:bottom-10 bottom-0 max-sm:left-0 sm:right-10 right-0 z-50 bg-background w-full sm:max-w-120 p-6 sm:rounded-20 rounded-t-20 shadow-3 flex flex-col gap-4.5">
          <h3 className="h3">
            In Progress
          </h3>

          <ul className="flex flex-col gap-5">
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);

              return (
                <li
                  key={file.name}
                  className="p-4 rounded-12 shadow-3 flex-between"
                >
                  <div className="flex items-center gap-4">
                    <Thumbnail
                      name={file.name}
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                      size={60}
                      className="size-15"
                      iconClassName="size-8"
                    />

                    <div className="sm:max-w-60 max-w-40 flex flex-col gap-1">
                      <p className="subtitle-2 line-clamp-1">
                        {file.name}
                      </p>

                      <Image
                        src="/assets/images/file-loader.gif"
                        alt="Loader"
                        width={150}
                        height={8}
                      />
                    </div>
                  </div>

                  <CircleX
                    className="hover:opacity-70 cursor-pointer"
                    onClick={(e) => handleRemoveFile(e, file.name)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default FileUploader;