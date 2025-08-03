"use client";

import { BrakeSchema } from "@/types/brakes";
import dynamic from "next/dynamic";
import React from "react";

const BrakeMap = dynamic(() => import("@/components/brake-map"), {
  ssr: false,
});

type Props = {
  messages?: BrakeSchema[];
};

const DashboardClient: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full flex justify-center gap-5">
      <div className="w-6xl">
        <h2 className="text-2xl font-extrabold ps-2 py-6">Monitoring</h2>
        <BrakeMap message={messages} />
      </div>
    </div>
  );
};

export default DashboardClient;
