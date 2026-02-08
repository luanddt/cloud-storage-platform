"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import FileUploader from "@/components/file-uploader";
import { Button } from "./ui/button";

const MobileNavigation = ({
  fullName,
  email,
  avatar
}: MobileNavigationProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-5 sm:hidden flex-between">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={120}
          height={52}
          className="h-13"
        />
      </Link>

      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={24}
            height={24}
            className="cursor-pointer hover:opacity-90"
          />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <Image
              src={avatar}
              alt={fullName}
              width={52}
              height={52}
              className="object-cover rounded-full"
            />

            <div className="flex flex-col gap-1 overflow-auto">
              <SheetTitle>{fullName}</SheetTitle>

              <SheetDescription>{email}</SheetDescription>
            </div>
          </SheetHeader>

          <Separator />

          <ul className="flex flex-col gap-5">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  className={cn(
                    "hover:bg-primary px-7.5 py-3.5 rounded-full shadow-drop-2 group flex items-center gap-4",
                    pathname === item.url && "bg-primary hover:bg-primary/90"
                  )}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                    className={cn(
                      "invert group-hover:invert-0 opacity-25 group-hover:opacity-100",
                      pathname === item.url && "invert-0 opacity-100"
                    )}
                  />

                  <h5 className={cn("h5 group-hover:text-primary-foreground", pathname === item.url && "text-primary-foreground")}>
                    {item.name}
                  </h5>
                </Link>
              </li>
            ))}
          </ul>

          <Separator />

          <FileUploader />

          <Separator />

          <Button
            type="submit"
            variant="logout"
            size="logout"
          >
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              width={24}
              height={24}
            />

            <p className="button text-primary">
              Logout
            </p>
          </Button>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;