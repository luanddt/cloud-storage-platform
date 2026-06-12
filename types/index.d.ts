type AuthMode = "login" | "create-account";

interface AuthFormProps {
  mode: AuthMode;
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
  fullName: string;
  email: string;
  avatar: string;
};

interface HomeProps {
  params: Promise<{ slug: string }>;
};