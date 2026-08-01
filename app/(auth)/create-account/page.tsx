import type { Metadata } from "next";

import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create Account - Storage",
  description: "Cloud Storage Platform"
};

const CreateAccount = () => {
  return (
    <AuthForm mode="create-account" />
  );
};

export default CreateAccount;