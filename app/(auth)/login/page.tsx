import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { requireUnauth } from "@/modules/auth/actions";
import { SignInForm } from "@/modules/auth/components/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInContent />
    </Suspense>
  );
}

function SignInFallback() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-2 flex justify-center">
            <Logo href="/login" />
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Checking your session...</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

async function SignInContent() {
  await requireUnauth();

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-2 flex justify-center">
            <Logo href="/login" />
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to continue to Agent Builder</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
