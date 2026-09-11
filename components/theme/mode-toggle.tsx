"use client"

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="icon" size="icon" />}>
        <Sun className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <h5 className="h5 sm:hidden">Mode Toggle</h5>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="size-6" />

          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="size-6" />

          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <SunMoon className="size-6" />

          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};