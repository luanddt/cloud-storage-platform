import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { OTPModalProps } from "@/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { sendEmailOTP, verifyEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({ accountId, email }: OTPModalProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const sessionId = await verifyEmailOTP({ accountId, password });

      if (sessionId) router.push("/");
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    };
  };

  const handleResendOTP = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter OTP</AlertDialogTitle>
          <AlertDialogDescription>
            We've sent a code to{" "}

            <span className="text-primary">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP
          maxLength={6}
          value={password}
          onChange={setPassword}
          pattern={REGEXP_ONLY_DIGITS}
          inputMode="numeric"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <AlertDialogAction
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading && <Spinner />}

            Submit
          </AlertDialogAction>

          {errorMessage && (
            <p className="caption text-destructive text-center">
              *{errorMessage}
            </p>
          )}

          <div className="flex-center gap-1">
            <p className="body-2">
              Didn't get a code?
            </p>

            <Button
              type="button"
              variant="link"
              size="link"
              onClick={handleResendOTP}
            >
              Click to resend.
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;