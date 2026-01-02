import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
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
import { Button } from "@/components/ui/button";

const OTPModal = ({ accountId, email }: OTPModalProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const sessionId = await verifySecret({ accountId, password });

      if (sessionId) router.push("/");
    } catch (error) {
      setErrorMessage("Failed to verify OTP. Please try again.");

      console.log("Failed to verify OTP.", error);
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
        <Image
          src="/assets/icons/close.svg"
          alt="Close"
          width={24}
          height={24}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        <AlertDialogHeader>
          <AlertDialogTitle>Enter OTP</AlertDialogTitle>

          <AlertDialogDescription>
            We&#39;ve sent a code to{" "}

            <span className="text-primary">
              {email}
            </span>
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
            className="p-4"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <p className="button text-primary-foreground">
              Submit
            </p>

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loader"
                width={24}
                height={24}
                className="animate-spin"
              />
            )}
          </AlertDialogAction>

          {errorMessage && (
            <p className="body-2 text-destructive text-center">
              *{errorMessage}
            </p>
          )}

          <div className="flex-center gap-1">
            <p className="body-2">
              Didn&#39;t get a code?
            </p>

            <Button
              type="button"
              variant="link"
              className="sub-2"
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