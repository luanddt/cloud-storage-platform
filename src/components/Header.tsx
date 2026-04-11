import Image from "next/image";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";

const Header = () => {
  return (
    <div className="py-7 sm:mr-7 sm:flex-between hidden">
      <Search />

      <div className="flex items-center gap-4">
        <FileUploader />

        <form>
          <Button
            type="submit"
            className="bg-primary/10 hover:bg-primary/20 p-3.5"
          >
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              width={24}
              height={24}
            />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Header;