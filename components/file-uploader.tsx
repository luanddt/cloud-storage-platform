"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useState
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {
  convertFileToUrl,
  getFileType
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Thumbnail from "@/components/thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { uploadFile } from "@/lib/actions/file.actions";

const FileUploader = ({
  ownerId,
  accountId,
  onClose
}: FileUploaderProps) => {
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

    onClose?.();
  }, [ownerId, accountId, onClose, path]);

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
          size="upload"
          className="w-full"
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
        <div className="bg-background sm:p-7 p-5 w-full sm:max-w-120 shadow-drop-3 sm:rounded-4xl rounded-tl-4xl rounded-tr-4xl fixed sm:bottom-10 bottom-0 sm:right-10 max-sm:left-0 right-0 z-50 flex flex-col gap-3">
          <h3 className="h3">
            In Progress
          </h3>

          <ul className="flex flex-col gap-2">
            {files.map((item) => {
              const { type, extension } = getFileType(item.name);

              return (
                <li
                  key={item.name}
                  className="p-3 shadow-drop-3 rounded-2xl flex-between"
                >
                  <div className="flex items-center gap-3">
                    <Thumbnail
                      name={item.name}
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(item)}
                      className="size-15"
                      imageClassName="size-8"
                    />

                    <div className="sm:w-70 w-40 flex flex-col gap-1">
                      <p className="sub-2 line-clamp-1">
                        {item.name}
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
                    className="cursor-pointer hover:opacity-90"
                    onClick={(e) => handleRemoveFile(e, item.name)}
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