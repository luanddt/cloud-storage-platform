"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = ({ $id, accountId, fullName, email, avatar }: MobileNavigationProps) => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="p-5 flex-between sm:hidden">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="StoreIt"
          width={120}
          height={42}
          className="h-10.5"
        />
      </Link>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <Image
              src={avatar}
              alt={fullName}
              width={52}
              height={52}
              className="object-cover object-center rounded-full"
            />

            <div className="flex flex-col gap-0.5 overflow-auto">
              <SheetTitle>{fullName}</SheetTitle>

              <SheetDescription>{email}</SheetDescription>
            </div>
          </SheetHeader>

          <Separator />

          <ul className="flex flex-col gap-5">
            {navItems.map(({ name, icon, url }) => (
              <li key={name}>
                <Link
                  href={url}
                  className={cn(
                    "hover:bg-primary px-8.5 py-3.5 rounded-full shadow-drop-2 group flex items-center gap-4.5",
                    pathname === url && "bg-primary hover:bg-primary/90"
                  )}
                  onClick={() => setIsOpen(false)}
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

          <FileUploader ownerId={$id} accountId={accountId} />

          <Separator />

          <Button
            type="submit"
            variant="logout"
            className="p-3.5"
            onClick={async () => await signOutUser()}
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