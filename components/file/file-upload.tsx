"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { CircleX, CloudUpload } from "lucide-react";
import { MAX_FILE_SIZE } from "@/constants";
import { toast } from "@/components/ui/toast";
import { convertFileToUrl, getFileType } from "@/lib/utils";
import FileThumbnail from "./file-thumbnail";
import { uploadFile } from "@/lib/actions/file.actions";
import { FileUploadProps } from "@/types";

const FileUpload = ({ ownerId, accountId, onClose }: FileUploadProps) => {
  const path = usePathname();

  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

          return toast.add({
            type: "error",
            description: `${file.name} is too large. Maximum file size is 50 MB.`,
            priority: "high"
          });
        };

        return uploadFile({ file, ownerId, accountId, path }).then((uploadedFile) => {
          if (uploadedFile) {
            setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
          };
        });
      });

      await Promise.all(uploadPromises);

      onClose?.();
    }
  });

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
        <Button type="button" variant="icon" size="icon" className="max-sm:w-full">
          <CloudUpload className="size-6" />

          <h5 className="h5 sm:hidden">Upload</h5>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="fixed sm:bottom-10 bottom-0 sm:right-10 max-sm:left-0 right-0 z-50 bg-background w-full sm:max-w-120 p-6 sm:rounded-20 rounded-t-20 shadow-drop-3 flex flex-col gap-5">
          <h3 className="h3">
            In Progress
          </h3>

          <ul className="flex flex-col gap-4">
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);

              return (
                <li key={file.name} className="p-4 shadow-drop-3 rounded-12 flex-between">
                  <div className="flex items-center gap-4">
                    <FileThumbnail
                      name={file.name}
                      type={type}
                      extension={extension}
                      size={32}
                      url={convertFileToUrl(file)}
                      className="size-15"
                      iconClassName="size-8 invert dark:invert-0"
                    />

                    <p className="subtitle-2 line-clamp-1 sm:max-w-60 max-w-30">
                      {file.name}
                    </p>
                  </div>

                  <CircleX
                    className="hover:opacity-80 cursor-pointer"
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

export default FileUpload;