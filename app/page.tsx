"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirects the client to the "/human-capital" route on mount and renders nothing.
 *
 * Performs a client-side navigation to "/human-capital" when the component mounts.
 *
 * @returns `null` — no UI is rendered by this component
 */
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/human-capital");
  }, [router]);

  return null;
}