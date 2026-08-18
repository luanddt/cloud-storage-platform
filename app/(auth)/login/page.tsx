import type { Metadata } from "next";
import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Login - Storage",
  description: "Cloud Storage Platform"
};

const Login = () => {
  return (
    <AuthForm mode="login" />
  );
};

export default Login;