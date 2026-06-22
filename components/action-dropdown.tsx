"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Models } from "node-appwrite";
import { EllipsisVertical } from "lucide-react";
import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ActionDropdown = ({ file }: {
  file: Models.Document & {
    name: string;
    bucketFileId: string;
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
  };

  const handleAction = () => {

  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { label, value } = action;

    return (
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>

        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter>
            <Button type="button" className="flex-1" variant="outline" onClick={closeAllModals}>
              Cancel
            </Button>

            <Button type="button" className="flex-1" onClick={handleAction}>
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
          <EllipsisVertical className="hover:opacity-70 cursor-pointer" />
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
                    download={file.name}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={30}
                      height={30}
                    />

                    <p className="body-2">
                      {actionItem.label}
                    </p>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={30}
                      height={30}
                    />

                    <p className="body-2">
                      {actionItem.label}
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