import Image from "next/image";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";

const Header = () => {
  return (
    <header className="p-5 lg:py-7 sm:flex-between hidden">
      <Search />

      <div className="flex-center gap-4">
        <FileUploader />

        <form>
          <Button
            type="submit"
            className="bg-primary/10 hover:bg-primary/20 p-3.5 shadow-none"
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
    </header>
  );
};

export default Header;