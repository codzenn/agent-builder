import { signIn } from "@/modules/auth/actions";
import { Button } from "@/components/ui/button";
import { GithubLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function SignInForm() {
  return (
    <form action={signIn} className="mt-8 w-full">
      <Button
        type="submit"
        className="h-12 w-full rounded-xl"
        size="lg"
      >
        <GithubLogo weight="fill" /> Continue with GitHub <ArrowRight className="ml-auto" />
      </Button>
    </form>
  );
}
