type AuthMode = "login" | "create-account";

interface AuthFormProps {
  auth: AuthMode;
};

interface CreateAccountProps {
  fullName: string;
  email: string;
};