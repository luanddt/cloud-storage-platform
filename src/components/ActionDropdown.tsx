"use client";

import { Models } from "node-appwrite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { renameFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

const ActionDropdown = ({ file }: {
  file: Models.Document & {
    name: string;
    bucketFileId: string;
    extension: string;
  };
}) => {
  const path = usePathname();

  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionProps | null>(null);

  const handleClose = () => {
    setName(file.name);
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
  };

  const handleAction = async () => {
    if (!action) return;

    setIsLoading(true);

    let success = false;

    const actions = {
      rename: () => renameFile({ fileId: file.$id, name, extension: file.extension, path })
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) handleClose();

    setIsLoading(false);
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { title, value } = action;

    return (
      <DialogContent>
        <Image
          src="/assets/icons/close-black.svg"
          alt="Close"
          width={24}
          height={24}
          className="absolute top-2 right-2 opacity-70 hover:opacity-100 cursor-pointer"
          onClick={handleClose}
        />

        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        {value === "rename" && (
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="py-4 button flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="py-4 flex-1"
              onClick={handleAction}
              disabled={isLoading}
            >
              {isLoading && (
                <Image
                  src="/assets/icons/loader-white.svg"
                  alt="Loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}

              <p className="button">
                {title}
              </p>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DropdownMenu
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
      >
        <DropdownMenuTrigger>
          <Image
            src="/assets/icons/dots.svg"
            alt="Dots"
            width={24}
            height={24}
            className="cursor-pointer opacity-70 hover:opacity-100"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>{file.name}</DropdownMenuLabel>

          <div className="flex flex-col">
            {actionsDropdownItems.map((actionItem) => (
              <DropdownMenuItem
                key={actionItem.value}
                onClick={() => {
                  setAction(actionItem);

                  if (["rename", "details", "share", "delete"].includes(actionItem.value)) {
                    setIsModalOpen(true);
                  };
                }}
              >
                {actionItem.value === "download" ? (
                  <Link
                    href={constructDownloadUrl(file.bucketFileId)}
                    className="w-full flex items-center gap-3"
                    download={file.name}
                  >
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.title}
                      width={30}
                      height={30}
                    />

                    <p className="body-2 line-clamp-1">
                      {actionItem.title}
                    </p>
                  </Link>
                ) : (
                  <div className="w-full flex items-center gap-3">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.title}
                      width={30}
                      height={30}
                    />

                    <p className="body-2 line-clamp-1">
                      {actionItem.title}
                    </p>
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;