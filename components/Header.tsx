import Image from "next/image";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";

const Header = () => {
  return (
    <header className="bg-background p-5 lg:py-7 sm:flex-between hidden">
      <Search />

      <div className="flex-center gap-6">
        <FileUploader />

        <form>
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
              className="object-contain"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;