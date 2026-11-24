"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { AppIcon } from "@/components/app-icon";
import { isCustomToolConfig } from "@/modules/builder/lib/custom-tool";
import { getToolIcon, getToolLabel } from "@/modules/builder/lib/tools-catalog";
import { useCanvasStore } from "@/modules/builder/store/canvas-store";

type ToolEntry = { toolId: string; config?: unknown };

export function AgentNode({ id, data, selected }: NodeProps) {
  const selectNode = useCanvasStore((s) => s.selectNode);
  const selectTool = useCanvasStore((s) => s.selectTool);
  const tools = (data.tools as ToolEntry[] | undefined) ?? [];

  return (
    <div
      className={`min-w-52 max-w-64 rounded-2xl border bg-card p-4 shadow-[0_12px_30px_-18px_rgba(27,43,33,0.3)] transition ${
        selected
          ? "border-primary ring-2 ring-primary/15"
          : "border-border"
      }`}
    >
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <AppIcon name="bot" className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-primary uppercase">Agent</p>
          <p className="mt-0.5 truncate text-xs font-medium text-foreground">
            {(data.label as string) ?? "Main agent"}
          </p>
        </div>
      </div>
      {tools.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
          {tools.map((tool, index) => (
            <button
              key={`${tool.toolId}-${index}`}
              type="button"
              className="nodrag nopan inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-[10px] leading-tight text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                if (isCustomToolConfig(tool.config)) {
                  selectTool(index);
                  return;
                }
                selectNode(id);
              }}
            >
              <AppIcon name={getToolIcon(tool.toolId, tool.config)} className="size-3" />
              {getToolLabel(tool.toolId, tool.config)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
