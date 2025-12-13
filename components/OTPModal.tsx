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
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

      console.log("Failed to verify OTP", error);
    } finally {
      setIsLoading(false);
    };
  };

  const handleResendOTP = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="md:px-8 px-4 py-10 sm:rounded-[20px] rounded-[12px]">
        <Image
          src="/assets/icons/close.svg"
          alt="Close"
          width={24}
          height={24}
          className="absolute top-2 right-2 cursor-pointer hover:opacity-90"
          onClick={() => setIsOpen(false)}
        />

        <AlertDialogHeader className="flex flex-col gap-2 text-center">
          <AlertDialogTitle className="h2">
            Enter OTP
          </AlertDialogTitle>

          <AlertDialogDescription className="body-2">
            We&#39;ve sent a code to{" "}

            <span className="text-primary">
              {email}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP
          maxLength={6}
          value={password}
          onChange={(value) => {
            if (/^\d*$/.test(value)) {
              setPassword(value);
            };
          }}
          pattern="[0-9]*"
          inputMode="numeric"
        >
          <InputOTPGroup className="w-full flex-between">
            <InputOTPSlot index={0} className="md:size-16 size-12 border-2 rounded-[12px] shadow-drop-1 font-medium text-[40px] leading-12 text-primary" />
            <InputOTPSlot index={1} className="md:size-16 size-12 border-2 rounded-[12px] shadow-drop-1 font-medium text-[40px] leading-12 text-primary" />
            <InputOTPSlot index={2} className="md:size-16 size-12 border-2 rounded-[12px] shadow-drop-1 font-medium text-[40px] leading-12 text-primary" />
            <InputOTPSlot index={3} className="md:size-16 size-12 border-2 rounded-[12px] shadow-drop-1 font-medium text-[40px] leading-12 text-primary" />
            <InputOTPSlot index={4} className="md:size-16 size-12 border-2 rounded-[12px] shadow-drop-1 font-medium text-[40px] leading-12 text-primary" />
            <InputOTPSlot index={5} className="md:size-16 size-12 border-2 rounded-[12px] shadow-drop-1 font-medium text-[40px] leading-12 text-primary" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter className="flex flex-col gap-5">
          <AlertDialogAction
            type="button"
            className="p-4 button rounded-full shadow-drop-2 cursor-pointer"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit

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
              className="sub-2 cursor-pointer"
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