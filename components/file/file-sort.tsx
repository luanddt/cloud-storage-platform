"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { sortTypes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const FileSort = () => {
  const path = usePathname();
  const router = useRouter();

  const handleSort = (value: string | null) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger>
        <SelectValue placeholder={sortTypes[0].label} />
      </SelectTrigger>

      <SelectContent>
        {sortTypes.map((sort) => (
          <SelectItem key={sort.label} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FileSort;