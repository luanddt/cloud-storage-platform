type FormMode = "login" | "create-account";

type HandleErrorOptions = {
  code?: string;
  showDetails?: boolean;
};

interface AuthFormProps {
  mode: FormMode;
};

interface CreateAccountProps {
  fullName: string;
  email: string;
};

interface OTPModalProps {
  accountId: string;
  email: string;
};