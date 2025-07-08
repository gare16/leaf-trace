"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  error?: string;
}

export default function HistoryClientWrapper({ error }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      alert(error);
      router.back();
    }
  }, [error, router]);

  return null;
}
