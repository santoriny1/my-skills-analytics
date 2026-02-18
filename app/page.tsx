'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/human-capital");
  }, [router]);

  return null;
}
