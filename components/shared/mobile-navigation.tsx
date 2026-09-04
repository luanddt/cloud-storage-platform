"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import FileSearch from "@/components/file/file-search";
import { MobileNavigationProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import FileUpload from "../file/file-upload";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/user.actions";
import { useState } from "react";

const MobileNavigation = ({ $id, accountId, fullName, email, avatar }: MobileNavigationProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-5 sm:hidden flex-between">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="Storage"
          width={52}
          height={52}
        />
      </Link>

      <FileSearch />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger><Menu className="hover:opacity-80 cursor-pointer" /></SheetTrigger>

        <SheetContent showCloseButton={false}>
          <div className="flex items-center gap-3">
            <Image
              src={avatar}
              alt={fullName}
              width={52}
              height={52}
              className="object-cover object-center rounded-full"
            />

            <SheetHeader>
              <SheetTitle>{fullName}</SheetTitle>
              <SheetDescription>{email}</SheetDescription>
            </SheetHeader>
          </div>

          <Separator />

          <ul className="flex-1 flex flex-col gap-5">
            {navItems.map((nav) => (
              <li key={nav.name}>
                <Link
                  href={nav.url}
                  className={cn("hover:bg-primary px-7.5 py-3.5 rounded-full shadow-drop-2 group flex items-center gap-4", pathname === nav.url && "bg-primary hover:bg-primary/80")}
                >
                  <Image
                    src={nav.icon}
                    alt={nav.name}
                    width={24}
                    height={24}
                    className={cn("invert dark:invert-0 group-hover:invert-0 opacity-80 group-hover:opacity-100", pathname === nav.url && "invert-0 opacity-100")}
                  />

                  <h5 className={cn("h5 group-hover:text-primary-foreground", pathname === nav.url && "text-primary-foreground")}>
                    {nav.name}
                  </h5>
                </Link>
              </li>
            ))}
          </ul>

          <Separator />

          <div className="flex flex-col gap-5">
            <FileUpload
              ownerId={$id}
              accountId={accountId}
              onClose={() => setIsOpen(false)}
            />

            <ModeToggle />

            <Button
              type="button"
              variant="icon"
              size="icon"
              onClick={async () => await logout()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
              />

              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;