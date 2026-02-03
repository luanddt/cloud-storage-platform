type FormMode = "login" | "create-account";

interface AuthFormProps {
  mode: FormMode;
};

interface OTPModalProps {
  accountId: string;
  email: string;
};