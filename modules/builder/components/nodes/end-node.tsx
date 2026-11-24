"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { AppIcon } from "@/components/app-icon";

export function EndNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-40 rounded-2xl border bg-card px-4 py-3.5 shadow-[0_12px_30px_-18px_rgba(27,43,33,0.25)] transition ${
        selected
          ? "border-orange-500 ring-2 ring-orange-500/15"
          : "border-orange-500/30 dark:border-orange-500/40"
      }`}
    >
      <Handle type="target" position={Position.Top} id="top" />
      <p className="flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-400">
        <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500/10">
          <AppIcon name="flag" className="size-3.5" />
        </span>
        <span>
          <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase">End</span>
          <span className="mt-0.5 block text-xs font-normal text-foreground">
            {(data.label as string) ?? "Response out"}
          </span>
        </span>
      </p>
    </div>
  );
}
