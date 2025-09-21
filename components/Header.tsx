import Image from "next/image";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className="bg-background p-5 lg:py-7 sm:flex-between hidden">
      <Search />

      <div className="flex-center gap-6">
        <FileUploader ownerId={userId} accountId={accountId} />

        <form action={async () => {
          "use server";

          await signOutUser();
        }}>
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