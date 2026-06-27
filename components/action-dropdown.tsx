"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Models } from "node-appwrite";
import { EllipsisVertical } from "lucide-react";
import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import { deleteFile, renameFile, shareFile } from "@/lib/actions/file.actions";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FileDetails, FileShare } from "@/components/actions-modal-content";

const ActionDropdown = ({ file }: {
  file: Models.Document & {
    name: string;
    bucketFileId: string;
    extension: string;
    url: string;
    type: string;
    size: number;
    users: string[];
  };
}) => {
  const path = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;

    setIsLoading(true);

    let success = false;

    const actions = {
      rename: () => renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => shareFile({ fileId: file.$id, emails, path }),
      delete: () => deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path })
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await shareFile({
      fileId: file.$id,
      emails: updatedEmails,
      path
    });

    if (success) setEmails(updatedEmails);

    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { label, value } = action;

    return (
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>

        {value === "rename" && (
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {value === "details" && (
          <FileDetails file={file} />
        )}

        {value === "share" && (
          <FileShare file={file} onChange={setEmails} onRemove={handleRemoveUser} />
        )}

        {value === "delete" && (
          <p className="body-2 text-center">
            Are you sure you want to delete{" "}
            <span className="subtitle-2">{file.name}</span>?
          </p>
        )}

        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter>
            <Button type="button" className="flex-1" variant="outline" onClick={closeAllModals}>
              Cancel
            </Button>

            <Button type="button" className="flex-1" onClick={handleAction} disabled={isLoading}>
              {isLoading && (
                <Spinner />
              )}

              <p>{label}</p>
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