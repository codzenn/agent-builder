import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bot,
  Calculator,
  Cloud,
  Code,
  File,
  Flag,
  Github,
  Globe,
  MemoryStick,
  Play,
  Search,
  Wrench,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

const icons: Record<string, IconSvgElement> = {
  bot: Bot,
  calculator: Calculator,
  weather: Cloud,
  web_search: Globe,
  read_webpage: File,
  github_read_file: File,
  github_search_code: Search,
  github_get_pr: Github,
  github_get_diff: Code,
  custom: Wrench,
  memory: MemoryStick,
  play: Play,
  flag: Flag,
};

export function AppIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icons[name] ?? Bot}
      className={className}
      strokeWidth={1.75}
    />
  );
}
