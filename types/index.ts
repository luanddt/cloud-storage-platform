export type AuthMode = "login" | "create-account";

export interface AuthFormProps {
  mode: AuthMode;
};

export interface CreateAccountProps {
  fullName: string;
  email: string;
};

export interface OTPModalProps {
  accountId: string;
  email: string;
};

export interface SidebarProps {
  fullName: string;
  email: string;
  avatar: string;
};

export interface MobileNavigationProps {
  $id: string;
  accountId: string;
  fullName: string;
  email: string;
  avatar: string;
};

export interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
};

export interface FileThumbnailProps {
  name: string;
  type: string;
  extension: string;
  size: number;
  url?: string;
  className?: string;
  iconClassName?: string;
};

export type FileType = "document" | "image" | "video" | "audio" | "other";

export interface FileUploadProps {
  ownerId: string;
  accountId: string;
  onClose?: () => void;
};

export interface HeaderProps {
  ownerId: string;
  accountId: string;
};

export interface HomeProps {
  params: Promise<{ type: string }>;
};

export interface ActionType {
  label: string;
  icon: string;
  value: string;
};

export interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
};