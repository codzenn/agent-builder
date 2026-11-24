"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { AppIcon } from "@/components/app-icon";

export function StartNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-40 rounded-2xl border bg-card px-4 py-3.5 shadow-[0_12px_30px_-18px_rgba(27,43,33,0.25)] transition ${
        selected
          ? "border-emerald-500 ring-2 ring-emerald-500/15"
          : "border-emerald-500/30 dark:border-emerald-500/40"
      }`}
    >
      <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10">
          <AppIcon name="play" className="size-3.5" />
        </span>
        <span>
          <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase">Start</span>
          <span className="mt-0.5 block text-xs font-normal text-foreground">
            {(data.label as string) ?? "User message in"}
          </span>
        </span>
      </p>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
