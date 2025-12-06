"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";

const MobileNavigation = ({
  fullName,
  email,
  avatar
}: MobileNavigationProps) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <header className="p-5 sm:hidden flex-between">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={120}
          height={52}
        />
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
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

            <div className="flex flex-col gap-1">
              <SheetTitle>{fullName}</SheetTitle>

              <SheetDescription>
                {email}
              </SheetDescription>
            </div>
          </SheetHeader>

          <Separator />

          <ul className="flex flex-col gap-5">
            {navItems.map(({ name, icon, url }) => (
              <li key={name}>
                <Link
                  href={url}
                  className={cn(
                    "hover:bg-primary px-[30px] py-3.5 shadow-drop-2 rounded-full group flex items-center gap-4",
                    pathname === url && "bg-primary hover:bg-primary/90"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className={cn(
                      "invert group-hover:invert-0 opacity-25 group-hover:opacity-100",
                      pathname === url && "invert-0 opacity-100"
                    )}
                  />

                  <h5 className={cn("h5 group-hover:text-primary-foreground", pathname === url && "text-primary-foreground")}>
                    {name}
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
            className="p-3.5 bg-primary/10 hover:bg-primary/20"
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