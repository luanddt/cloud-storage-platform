type FormMode = "login" | "create-account";

interface AuthFormProps {
  mode: FormMode;
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

type FileType = "document" | "image" | "video" | "audio" | "other";

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

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  onClose?: () => void;
};