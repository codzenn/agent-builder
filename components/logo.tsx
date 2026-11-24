import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href: string;
  showLabel?: boolean;
};

export function Logo({ href, showLabel = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={showLabel ? undefined : "Agent Builder"}
      className="inline-flex items-center gap-3 font-semibold tracking-tight"
    >
      <Image
        src="/agent-builder-logo.svg"
        alt=""
        width={40}
        height={40}
        className="size-10"
      />
      {showLabel && <span className="text-base">Agent Builder</span>}
    </Link>
  );
}
