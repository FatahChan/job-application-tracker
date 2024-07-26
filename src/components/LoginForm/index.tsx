import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInputField from "../TextInputField";
import OtpField from "../OtpField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwrite";
import { useNavigate } from "@tanstack/react-router";
import { ID } from "appwrite";
import { useState } from "react";
import { toast } from "sonner";

function LoginForm() {
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <RequestOtpForm setUserId={setUserId} />
      {userId === null ? null : <VerifyOtpForm userId={userId} />}
    </div>
  );
}

function VerifyOtpForm({ userId }: { userId: string }) {
  const verifyOtpForm = useForm<{ otp: string }>({
    resolver: zodResolver(z.object({ otp: z.string().length(6) })),
  });
  const navigate = useNavigate();
  const verifyOtpFormOnSubmit = async (values: { otp: string }) => {
    const { success, data, error } = await z
      .object({ otp: z.string().length(6) })
      .safeParseAsync(values);
    if (!success) {
      throw new Error(error?.message);
    } else {
      try {
        await account.createSession(userId, data.otp);
        toast.success("Logged in");
        navigate({ to: "/" });
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <Form {...verifyOtpForm}>
      <form
        onSubmit={verifyOtpForm.handleSubmit(verifyOtpFormOnSubmit)}
        className="grid grid-cols-1 gap-8"
      >
        <OtpField formControl={verifyOtpForm.control} name="otp" />
        <Button type="submit" disabled={verifyOtpForm.formState.isSubmitting}>
          Verify
        </Button>
      </form>
    </Form>
  );
}
function RequestOtpForm({
  setUserId,
}: {
  setUserId: (userId: string) => void;
}) {
  const requestOtpForm = useForm<{ email: string }>({
    resolver: zodResolver(z.object({ email: z.string().email() })),
  });
  const requestOtpFormOnSubmit = async (values: { email: string }) => {
    const { success, data, error } = await z
      .object({ email: z.string().email() })
      .safeParseAsync(values);
    if (!success) {
      throw new Error(error?.message);
    }
    try {
      const sessionToken = await account.createEmailToken(
        ID.unique(),
        data.email,
      );
      const userId = sessionToken.userId;
      setUserId(userId);
      toast.success(`OTP sent to your email ${data.email}`);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  };
  return (
    <Form {...requestOtpForm}>
      <form
        onSubmit={requestOtpForm.handleSubmit(requestOtpFormOnSubmit)}
        className="grid grid-cols-1 gap-8"
      >
        <TextInputField formControl={requestOtpForm.control} name="email" />
        <Button type="submit" disabled={requestOtpForm.formState.isSubmitting}>
          Request OTP
        </Button>
      </form>
    </Form>
  );
}
export { LoginForm };
