import { Suspense } from "react";
import { BuilderPageContent } from "@/modules/agents/components/builder-page-content";

export default function BuilderPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <div
            role="status"
            aria-label="Loading"
            className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
        </div>
      }
    >
      <BuilderPageWithParams params={params} />
    </Suspense>
  );
}

async function BuilderPageWithParams({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  return <BuilderPageContent agentId={agentId} />;
}
