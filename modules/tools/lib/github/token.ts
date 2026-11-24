import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { account } from "@/db/schema";

export async function getGithubToken(userId: string) {
  const [result] = await db
    .select({ accessToken: account.accessToken })
    .from(account)
    .where(and(eq(account.userId, userId), eq(account.providerId, "github")));

  return result?.accessToken ?? null;
}
