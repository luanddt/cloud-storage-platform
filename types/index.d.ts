type FormType = "sign-in" | "sign-up";

type FileType = "document" | "image" | "video" | "audio" | "other";

interface AuthFormProps {
  type: FormType;
};

interface OTPModalProps {
  accountId: string;
  email: string;
};

interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
};

interface MobileNavigationProps {
  $id: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
};

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
};

interface ThumbnailProps {
  name: string;
  type: string;
  extension: string;
  url?: string;
  className?: string;
  imageClassName?: string;
};

interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
};

interface HeaderProps {
  userId: string;
  accountId: string;
};