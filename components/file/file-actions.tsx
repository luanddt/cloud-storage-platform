"use client";

import { Models } from "node-appwrite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { actionItems } from "@/constants";
import { ActionType } from "@/types";
import { constructDownloadUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "../ui/spinner";

const FileActions = ({ file }: { file: Models.Document & { name: string, bucketFileId: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
  };

  const handleAction = async () => { };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>

        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeAllModals}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleAction}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading && <Spinner />}

              {label}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisVertical className="cursor-pointer hover:opacity-80" />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>{file.name}</DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {actionItems.map((action) => (
              <DropdownMenuItem
                key={action.value}
                onClick={() => {
                  setAction(action);

                  if (["rename", "details", "share", "delete"].includes(action.value)) {
                    setIsModalOpen(true);
                  };
                }}
              >
                {action.value === "download" ? (
                  <Link
                    href={constructDownloadUrl(file.bucketFileId)}
                    download={file.name}
                    className="w-full flex items-center gap-3"
                  >
                    <Image
                      src={action.icon}
                      alt={action.label}
                      width={24}
                      height={24}
                      className="invert dark:invert-0"
                    />

                    {action.label}
                  </Link>
                ) : (
                  <div className="w-full flex items-center gap-3">
                    <Image
                      src={action.icon}
                      alt={action.label}
                      width={24}
                      height={24}
                      className="invert dark:invert-0"
                    />

                    {action.label}
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default FileActions;