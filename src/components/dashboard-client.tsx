"use client";

import { DataGeospasial } from "@/components/data-geospasial";
import { Label } from "@/components/ui/label";
import { TableHistory } from "@/components/table-history";
import { useEffect, useState } from "react";
import { BrakeType } from "@/types/brakes";
import { useMQTT } from "@/app/context/mqtt-context";

import dynamic from "next/dynamic";

const BrakeMap = dynamic(() => import("@/components/brake-map"), {
  ssr: false,
});

export function DashboardClient({ historyData }: { historyData: BrakeType[] }) {
  const { messages } = useMQTT();
  const [latest, setLatest] = useState(messages);

  useEffect(() => {
    if (messages) {
      setLatest(messages);
    }
  }, [messages]);

  return (
    <>
      <DataGeospasial data={latest} />
      <BrakeMap message={messages} />
      <div className="w-full px-2">
        <Label className="text-2xl font-extrabold py-3">History</Label>
        <TableHistory brakes={historyData} />
      </div>
    </>
  );
}
